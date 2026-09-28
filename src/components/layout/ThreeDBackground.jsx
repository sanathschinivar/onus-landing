import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDBackground({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Lightweight Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 9.5 : 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'low-power',
      precision: isMobile ? 'mediump' : 'highp'
    });
    
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const primaryColor = darkMode ? 0x299093 : 0x061A1E;
    const accentColor = darkMode ? 0x00FF9D : 0xEF6156;

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Icosahedron Wireframe Matrix (Compact & Elegant)
    const icoGeom = new THREE.IcosahedronGeometry(isMobile ? 1.1 : 1.45, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: darkMode ? 0.38 : 0.22
    });
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    rootGroup.add(icoMesh);

    // 2. Inner Torus Knot Core (Compact Nexus)
    const knotGeom = new THREE.TorusKnotGeometry(
      isMobile ? 0.55 : 0.72, 
      isMobile ? 0.11 : 0.14, 
      isMobile ? 36 : 60, 
      isMobile ? 8 : 12,
      2, 3
    );
    const knotMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: darkMode ? 0.45 : 0.28
    });
    const knotMesh = new THREE.Mesh(knotGeom, knotMat);
    rootGroup.add(knotMesh);

    // 3. Compact Spatial Trajectory Rings
    const ringGeom1 = new THREE.TorusGeometry(isMobile ? 1.7 : 2.2, 0.012, 6, isMobile ? 32 : 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: primaryColor, transparent: true, opacity: darkMode ? 0.32 : 0.18 });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(isMobile ? 2.0 : 2.6, 0.012, 6, isMobile ? 32 : 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: darkMode ? 0.28 : 0.14 });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    rootGroup.add(ring2);

    // 4. Ambient Point Field (Lightweight)
    const particleCount = isMobile ? 35 : 80;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.07 : 0.045,
      color: primaryColor,
      transparent: true,
      opacity: darkMode ? 0.4 : 0.22
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    let targetX = isMobile ? 0 : 1.6;
    let targetY = 0;
    let targetScale = isMobile ? 0.8 : 1.0;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

          if (isMobile) {
            targetX = Math.sin(progress * Math.PI * 2) * 0.4;
            targetY = -0.2 + progress * 0.4;
            targetScale = 0.75 + Math.sin(progress * Math.PI) * 0.1;
          } else {
            // Elegant background drift without dominating screen
            if (progress < 0.3) {
              targetX = 1.6 - progress * 1.5;
              targetY = -progress * 0.8;
              targetScale = 1.0;
            } else if (progress < 0.65) {
              targetX = -1.2 + (progress - 0.3) * 1.2;
              targetY = 0.2;
              targetScale = 0.92;
            } else {
              targetX = 1.0 - (progress - 0.65) * 1.0;
              targetY = 0;
              targetScale = 0.95;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();

        // Signature sideways wiggle & harmonic breathing
        const wiggleX = Math.sin(elapsedTime * 1.5) * 0.32;
        const wiggleY = Math.cos(elapsedTime * 1.1) * 0.22;
        const wiggleZ = Math.sin(elapsedTime * 0.9) * 0.12;

        rootGroup.position.x += (targetX + wiggleX + mouseX - rootGroup.position.x) * 0.06;
        rootGroup.position.y += (targetY + wiggleY - mouseY - rootGroup.position.y) * 0.06;
        rootGroup.position.z += (wiggleZ - rootGroup.position.z) * 0.06;

        const currentScale = rootGroup.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.06;
        rootGroup.scale.set(newScale, newScale, newScale);

        // Fluid rotational dynamics
        rootGroup.rotation.y += isMobile ? 0.004 : 0.006;
        rootGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.25;
        rootGroup.rotation.z = Math.cos(elapsedTime * 0.5) * 0.18;

        knotMesh.rotation.x = elapsedTime * 0.6;
        knotMesh.rotation.y = elapsedTime * 0.75;

        icoMesh.rotation.x = -elapsedTime * 0.25;
        icoMesh.rotation.y = elapsedTime * 0.3;

        ring1.rotation.z = elapsedTime * 0.25;
        ring1.rotation.x = (Math.PI / 3) + Math.sin(elapsedTime * 0.6) * 0.2;

        ring2.rotation.x = elapsedTime * 0.3;
        ring2.rotation.y = (Math.PI / 4) + Math.cos(elapsedTime * 0.5) * 0.2;

        particleSystem.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      icoGeom.dispose();
      icoMat.dispose();
      knotGeom.dispose();
      knotMat.dispose();
      ringGeom1.dispose();
      ringMat1.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700" 
      style={{ opacity: darkMode ? 0.75 : 0.45 }}
    />
  );
}
