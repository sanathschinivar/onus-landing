import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createChargingScene } from '../evScene/createChargingScene';
import ChargingSceneFallback from '../evScene/ChargingSceneFallback';

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const getSceneLayout = (width, height, progress = 0) => {
  if (width < 1280) {
    // Keep the arm base pinned just below the navbar while the connector travels
    // downward through the scene's existing eased IK path.
    const widthProgress = THREE.MathUtils.smoothstep(width, 360, 1024);
    const phoneAspect = width / Math.max(height, 1);
    const cameraZ = Math.min(22, 14 * Math.max(1, (642 / 400) / phoneAspect));
    const scale = THREE.MathUtils.lerp(0.8, 1.08, widthProgress);
    const cameraTop = cameraZ * Math.tan(THREE.MathUtils.degToRad(19));
    const navbarHeight = width < 640 ? 65 : 81;
    const navbarGap = 14;
    const navbarWorldY = cameraTop * (1 - (2 * (navbarHeight + navbarGap)) / Math.max(height, 1));
    const armBaseY = 2.55;
    return {
      cameraZ,
      x: THREE.MathUtils.lerp(1.7, 3.2, widthProgress),
      y: navbarWorldY - armBaseY * scale,
      scale
    };
  }

  const widthProgress = THREE.MathUtils.smoothstep(width, 1280, 1600);
  const restY = THREE.MathUtils.lerp(-0.55, -0.15, widthProgress);
  const heroEntrance = THREE.MathUtils.smoothstep(progress, 0.02, 0.72);
  return {
    cameraZ: THREE.MathUtils.lerp(14, 11.5, widthProgress),
    x: THREE.MathUtils.lerp(2, 4.1, widthProgress),
    y: THREE.MathUtils.lerp(restY - 2.6 * (1 - widthProgress), restY, heroEntrance),
    scale: THREE.MathUtils.lerp(0.84, 1.55, widthProgress)
  };
};

export default function ThreeDBackground({ darkMode }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(darkMode);
  const sceneControlsRef = useRef(null);
  const requestRenderRef = useRef(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    themeRef.current = darkMode;
    sceneControlsRef.current?.setTheme(darkMode);
    requestRenderRef.current?.();
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
        precision: 'mediump',
        stencil: false,
        depth: true
      });
    } catch {
      queueMicrotask(() => setWebglUnavailable(true));
      return undefined;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let mobile = window.matchMedia('(max-width: 767px)').matches;
    let heroVisible = false;
    let frameTimer = null;
    let resizeTimer = null;
    let running = false;
    let hasPresentedFrame = false;
    let elapsed = 0;
    let previousTime = 0;
    let scrollProgress = 0;
    const hero = canvas.closest('#overview') ?? document.getElementById('overview');
    const sceneViewport = canvas.closest('.charging-scene-viewport') ?? hero;
    let measuredViewportWidth = sceneViewport?.clientWidth ?? window.innerWidth;
    let measuredStageHeight = sceneViewport?.clientHeight ?? window.innerHeight;
    let measuredHeroHeight = hero?.clientHeight ?? window.innerHeight;
    let travelDistance = 1;
    let heroStart = 0;
    let renderWidth = 0;
    let renderHeight = 0;
    let renderPixelRatio = 0;

    const chargingScene = createChargingScene({ scene, isMobile: mobile });
    sceneControlsRef.current = chargingScene;

    const measureScrollRange = () => {
      const heroRect = hero?.getBoundingClientRect();
      const heroHeight = Math.max(hero?.clientHeight ?? window.innerHeight, 1);
      heroStart = heroRect ? heroRect.top + window.scrollY : 0;
      // The connector seats during the second tagline while the hero itself keeps scrolling.
      travelDistance = Math.max(heroHeight * 0.91, 1);
    };
    const readScrollProgress = () => clamp01((window.scrollY - heroStart) / Math.max(travelDistance, 1));
    const updateSceneParallax = () => {
      if (!hero || !sceneViewport) return;
      const heroHeight = Math.max(hero.clientHeight, 1);
      const stageHeight = Math.max(sceneViewport.clientHeight, 1);
      const maxOffset = Math.max(heroHeight - stageHeight, 0);
      const scrollIntoHero = Math.min(Math.max(window.scrollY - heroStart, 0), maxOffset);
      // Follow the page for the first two beats. At the final tagline the scene
      // reaches the end of its track and scrolls away with the hero content.
      sceneViewport.style.transform = `translate3d(0, ${scrollIntoHero}px, 0)`;
      const progress = readScrollProgress();
      const layout = getSceneLayout(sceneViewport.clientWidth, stageHeight, progress);
      chargingScene.root.position.set(layout.x, layout.y, 0);
      chargingScene.root.scale.setScalar(layout.scale);
    };

    const frameDelay = () => (mobile ? 33 : 17);
    const stop = () => {
      running = false;
      if (frameTimer !== null) {
        clearTimeout(frameTimer);
        frameTimer = null;
      }
    };

    const positionScene = () => {
      const width = Math.max(sceneViewport?.clientWidth ?? window.innerWidth, 1);
      const height = Math.max(sceneViewport?.clientHeight ?? window.innerHeight, 1);
      mobile = window.matchMedia('(max-width: 767px)').matches;
      const layout = getSceneLayout(width, height, readScrollProgress());
      camera.aspect = width / height;
      camera.position.set(0, 0, layout.cameraZ);
      camera.updateProjectionMatrix();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.35);
      if (width !== renderWidth || height !== renderHeight || pixelRatio !== renderPixelRatio) {
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(width, height, false);
        renderWidth = width;
        renderHeight = height;
        renderPixelRatio = pixelRatio;
      }
      // Keep the complete arm and inlet in frame across phone, tablet, and desktop widths.
      chargingScene.root.position.set(layout.x, layout.y, 0);
      chargingScene.root.scale.setScalar(layout.scale);
    };

    const renderFrame = () => {
      frameTimer = null;
      if (!heroVisible || document.hidden) {
        stop();
        return;
      }
      const now = performance.now();
      elapsed += previousTime ? Math.min((now - previousTime) / 1000, 0.1) : 0;
      previousTime = now;
      scrollProgress = readScrollProgress();
      const sceneState = chargingScene.update(scrollProgress, reducedMotion ? 0 : elapsed);
      renderer.render(scene, camera);
      if (!hasPresentedFrame) {
        hasPresentedFrame = true;
        setSceneReady(true);
      }

      // Keep the latch rings and energy pulse animated from contact while the hero is visible.
      if (!reducedMotion && sceneState.connected) {
        running = true;
        frameTimer = setTimeout(renderFrame, frameDelay());
      } else {
        running = false;
        previousTime = 0;
      }
    };

    const scheduleRender = () => {
      if (!heroVisible || document.hidden || running || frameTimer !== null) return;
      frameTimer = setTimeout(renderFrame, frameDelay());
    };
    requestRenderRef.current = scheduleRender;
    const handleScroll = () => {
      scrollProgress = readScrollProgress();
      updateSceneParallax();
      if (heroVisible) scheduleRender();
    };
    const handleResize = () => {
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        positionScene();
        const stageWidth = sceneViewport?.clientWidth ?? window.innerWidth;
        const stageHeight = sceneViewport?.clientHeight ?? window.innerHeight;
        const heroHeight = hero?.clientHeight ?? window.innerHeight;
        if (stageWidth !== measuredViewportWidth || stageHeight !== measuredStageHeight || heroHeight !== measuredHeroHeight) {
          measuredViewportWidth = stageWidth;
          measuredStageHeight = stageHeight;
          measuredHeroHeight = heroHeight;
          measureScrollRange();
        }
        updateSceneParallax();
        handleScroll();
      }, 100);
    };
    const handleVisibility = () => {
      if (document.hidden) stop();
      else scheduleRender();
    };
    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      stop();
      previousTime = 0;
      if (heroVisible) scheduleRender();
    };
    const handleContextLost = (event) => {
      event.preventDefault();
      stop();
      setWebglUnavailable(true);
    };

    positionScene();
    measureScrollRange();
    updateSceneParallax();
    scrollProgress = readScrollProgress();
    chargingScene.setTheme(themeRef.current);
    chargingScene.update(scrollProgress, 0);

    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
        heroVisible = Boolean(entry?.isIntersecting);
        if (heroVisible) scheduleRender();
        else stop();
      }, { rootMargin: '80px 0px' })
      : null;
    const observedScene = sceneViewport ?? hero;
    if (observedScene && intersectionObserver) intersectionObserver.observe(observedScene);
    else {
      heroVisible = true;
      scheduleRender();
    }

    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotionQuery.addEventListener?.('change', handleMotionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    return () => {
      stop();
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotionQuery.removeEventListener?.('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost, false);
      if (sceneControlsRef.current === chargingScene) sceneControlsRef.current = null;
      requestRenderRef.current = null;
      chargingScene.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglUnavailable) return <ChargingSceneFallback />;

  return (
    <div className="charging-scene-layer absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <ChargingSceneFallback style={{ opacity: sceneReady ? 0 : 1 }} />
      <canvas
        ref={canvasRef}
        className="charging-scene-canvas absolute inset-0 h-full w-full"
        style={{ opacity: sceneReady ? (darkMode ? 0.93 : 0.9) : 0 }}
      />
    </div>
  );
}
