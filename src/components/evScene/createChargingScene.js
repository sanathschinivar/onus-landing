import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const CONNECTOR_LATCH_PROGRESS = 0.72;
const smootherstep = (value) => {
  const t = clamp01(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/** Builds the fixed inlet and scroll-driven robotic arm that seats its EV connector. */
export function createChargingScene({ scene, isMobile }) {
  const geometries = new Set();
  const materials = new Set();
  const paletteMaterials = new Map();
  const trackGeometry = (geometry) => (geometries.add(geometry), geometry);
  const trackMaterial = (material, role) => {
    materials.add(material);
    if (role) {
      material.userData.paletteRole = role;
      const list = paletteMaterials.get(role) ?? [];
      list.push(material);
      paletteMaterials.set(role, list);
    }
    return material;
  };
  const physical = (role, color, options = {}) => trackMaterial(new THREE.MeshPhysicalMaterial({
    color,
    roughness: options.roughness ?? 0.4,
    metalness: options.metalness ?? 0.14,
    clearcoat: options.clearcoat ?? 0.38,
    clearcoatRoughness: 0.32,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    depthWrite: options.depthWrite ?? true
  }), role);

  const mat = {
    shell: physical('shell', 0xe0e8dc, { metalness: 0.24, roughness: 0.3, clearcoat: 0.78 }),
    shellEdge: physical('shellEdge', 0xa6bab2, { metalness: 0.54, roughness: 0.26 }),
    chassis: physical('chassis', 0x1b353a, { metalness: 0.34, roughness: 0.35, clearcoat: 0.58 }),
    glass: physical('glass', 0x102329, { metalness: 0.26, roughness: 0.19, clearcoat: 0.9 }),
    metal: physical('metal', 0x9bb7b3, { metalness: 0.78, roughness: 0.24 }),
    ceramic: physical('ceramic', 0xe8eee2, { metalness: 0.15, roughness: 0.25, clearcoat: 0.68 }),
    rubber: physical('rubber', 0x1b272c, { metalness: 0.07, roughness: 0.69 }),
    recess: physical('recess', 0x101b20, { metalness: 0.16, roughness: 0.43 }),
    coral: physical('coral', 0xef7063, { metalness: 0.1, roughness: 0.31, emissive: 0x641711, emissiveIntensity: 0.16 }),
    amber: physical('amber', 0xffc54e, { roughness: 0.26, emissive: 0x744000, emissiveIntensity: 0.3 }),
    signal: physical('signal', 0x58e6c1, { roughness: 0.25, emissive: 0x157460, emissiveIntensity: 0.58 }),
  };
  const socketRevealMaterials = new Set();
  const socketMaterialCache = new Map();
  const socketMaterial = (source) => {
    if (socketMaterialCache.has(source)) return socketMaterialCache.get(source);
    const copy = trackMaterial(source.clone(), source.userData.paletteRole);
    copy.transparent = true;
    copy.opacity = 0;
    copy.depthWrite = false;
    socketRevealMaterials.add(copy);
    socketMaterialCache.set(source, copy);
    return copy;
  };
  const glowMaterial = (role = 'glow', color = 0x54e8c0) => trackMaterial(new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  }), role);

  const hemisphere = new THREE.HemisphereLight(0xf0faf5, 0x26363b, 2.05);
  const keyLight = new THREE.DirectionalLight(0xfff0d8, 3.1);
  keyLight.position.set(-3.8, 4.7, 7);
  const rimLight = new THREE.DirectionalLight(0x68d9c4, 1.8);
  rimLight.position.set(4, 1.4, -4);
  scene.add(hemisphere, keyLight, rimLight);

  const root = new THREE.Group();
  scene.add(root);

  const mesh = (parent, geometry, material, position = [0, 0, 0]) => {
    const object = new THREE.Mesh(trackGeometry(geometry), material);
    object.position.set(...position);
    parent.add(object);
    return object;
  };
  const roundedBox = (parent, size, material, position, radius = 0.05, segments = 3) =>
    mesh(parent, new RoundedBoxGeometry(...size, segments, radius), material, position);
  const faceCylinder = (parent, radius, depth, material, position, segments = 32) => {
    const object = mesh(parent, new THREE.CylinderGeometry(radius, radius, depth, segments), material, position);
    object.rotation.x = Math.PI / 2;
    return object;
  };
  const torus = (parent, radius, tube, material, position = [0, 0, 0], segments = 40) =>
    mesh(parent, new THREE.TorusGeometry(radius, tube, 7, segments), material, position);
  const createArmLink = () => {
    const link = new THREE.Group();
    roundedBox(link, [0.4, 1, 0.31], mat.chassis, [0, 0, 0], 0.14, 5);
    roundedBox(link, [0.25, 0.7, 0.045], mat.shell, [0, 0, 0.17], 0.09, 4);
    roundedBox(link, [0.045, 0.48, 0.025], mat.signal, [0, 0, 0.205], 0.018, 2);
    mesh(link, new THREE.CylinderGeometry(0.026, 0.026, 0.68, 10), mat.metal, [0.29, 0, 0.09]);
    [-0.34, 0.34].forEach((y) => faceCylinder(link, 0.022, 0.025, mat.shellEdge, [0, y, 0.205], 10));
    root.add(link);
    return link;
  };
  const createServoJoint = (radius) => {
    const joint = new THREE.Group();
    faceCylinder(joint, radius, 0.14, mat.chassis, [0, 0, 0], 24);
    faceCylinder(joint, radius * 0.78, 0.075, mat.shellEdge, [0, 0, 0.085], 24);
    torus(joint, radius * 0.59, 0.014, mat.metal, [0, 0, 0.13], 28);
    faceCylinder(joint, radius * 0.35, 0.035, mat.glass, [0, 0, 0.12], 20);
    faceCylinder(joint, radius * 0.13, 0.04, mat.signal, [0, 0, 0.15], 12);
    root.add(joint);
    return joint;
  };
  const portX = -0.55;
  const portY = -0.72;

  // The inlet sits on a small backing plate; no charger housing competes with the plug.
  const mount = new THREE.Group();
  root.add(mount);
  roundedBox(mount, [1.48, 1.62, 0.15], socketMaterial(mat.chassis), [portX, portY, -0.72], 0.3, 5);
  roundedBox(mount, [1.36, 1.5, 0.1], socketMaterial(mat.shellEdge), [portX, portY, -0.6], 0.27, 5);
  roundedBox(mount, [1.26, 1.4, 0.11], socketMaterial(mat.shell), [portX, portY, -0.49], 0.24, 5);
  [-0.49, 0.49].forEach((x) => {
    [-0.53, 0.53].forEach((y) => {
      faceCylinder(mount, 0.025, 0.028, socketMaterial(mat.metal), [portX + x, portY + y, -0.405], 10);
    });
  });

  // Exposed CCS inlet: a stepped collar, contact well and two distinct DC pins.
  const inlet = new THREE.Group();
  inlet.position.set(portX, portY, 0.18);
  root.add(inlet);
  faceCylinder(inlet, 0.39, 0.08, socketMaterial(mat.shellEdge), [0, 0, 0]);
  faceCylinder(inlet, 0.335, 0.09, socketMaterial(mat.recess), [0, 0, 0.055]);
  torus(inlet, 0.292, 0.027, socketMaterial(mat.ceramic), [0, 0, 0.108], 48);
  const contactCore = new THREE.Group();
  inlet.add(contactCore);
  const ccsContactPositions = [[-0.055, 0.057], [0.055, 0.057], [-0.075, -0.072], [0.075, -0.072]];
  faceCylinder(contactCore, 0.244, 0.06, socketMaterial(mat.rubber), [0, 0, 0.13]);
  torus(contactCore, 0.2, 0.015, socketMaterial(mat.metal), [0, 0, 0.169], 40);
  faceCylinder(contactCore, 0.144, 0.026, socketMaterial(mat.glass), [0, 0, 0.17], 32);
  ccsContactPositions.forEach(([x, y], index) => {
    faceCylinder(contactCore, index < 2 ? 0.027 : 0.046, 0.034,
      socketMaterial(index < 2 ? mat.metal : mat.ceramic), [x, y, 0.196], 18);
    faceCylinder(contactCore, index < 2 ? 0.012 : 0.02, 0.038, socketMaterial(mat.recess), [x, y, 0.223], 14);
  });
  const portHalo = torus(inlet, 0.43, 0.018, glowMaterial(), [0, 0, 0.14], 48);
  const portEcho = torus(inlet, 0.52, 0.009, glowMaterial(), [0, 0, 0.18], 48);
  [portHalo, portEcho].forEach((ring) => {
    // The waves sit in front of the latched plug so the effect stays readable
    // instead of disappearing behind the connector face.
    ring.position.z = 0.48;
    ring.renderOrder = 8;
    ring.material.depthTest = false;
  });
  const portLight = new THREE.PointLight(0x54e8c0, 0, 2.5, 2);
  portLight.position.set(portX, portY, 0.6);
  root.add(portLight);
  for (let i = 0; i < 4; i += 1) {
    const angle = Math.PI * 0.25 + (i * Math.PI) / 2;
    faceCylinder(inlet, 0.022, 0.025, socketMaterial(mat.amber),
      [Math.cos(angle) * 0.355, Math.sin(angle) * 0.355, 0.135], 10);
  }
  const socketReveal = new THREE.Group();
  socketReveal.position.set(portX, portY, 0);
  root.add(socketReveal);
  mount.position.set(-portX, -portY, 0);
  inlet.position.set(0, 0, 0.18);
  portLight.position.set(0, 0, 0.6);
  socketReveal.add(mount, inlet, portLight);
  socketReveal.visible = true;

  // The cable comes from above the frame, keeping the inlet and plug as the only actors.

  // Rounded plug shell, tactile grip ribs, latch, strain relief and CCS nose.
  const plug = new THREE.Group();
  root.add(plug);
  roundedBox(plug, [0.62, 0.48, 0.5], mat.chassis, [0, 0, -0.12], 0.15, 5);
  roundedBox(plug, [0.51, 0.38, 0.055], mat.shell, [0, 0, 0.157], 0.12, 5);
  roundedBox(plug, [0.4, 0.07, 0.03], mat.shellEdge, [0, -0.045, 0.194], 0.03, 3);
  roundedBox(plug, [0.44, 0.34, 0.045], mat.shell, [0, 0, -0.387], 0.11, 4);
  roundedBox(plug, [0.28, 0.035, 0.022], mat.signal, [0, 0.12, -0.421], 0.014, 2);
  roundedBox(plug, [0.2, 0.022, 0.02], mat.shellEdge, [0, -0.105, -0.42], 0.009, 2);
  for (let rib = 0; rib < 6; rib += 1) {
    roundedBox(plug, [0.37, 0.019, 0.022], rib === 2 ? mat.coral : mat.metal,
      [0, -0.15 + rib * 0.055, 0.197], 0.009, 2);
  }
  roundedBox(plug, [0.34, 0.38, 0.3], mat.rubber, [0, -0.35, -0.13], 0.12, 5);
  roundedBox(plug, [0.28, 0.29, 0.045], mat.shellEdge, [0, -0.34, 0.038], 0.09, 4);
  for (let grip = 0; grip < 3; grip += 1) {
    roundedBox(plug, [0.2, 0.018, 0.018], mat.metal,
      [0, -0.27 - grip * 0.07, 0.068], 0.008, 2);
  }
  roundedBox(plug, [0.19, 0.29, 0.09], mat.shellEdge, [0.31, 0.02, -0.12], 0.075, 4);
  roundedBox(plug, [0.13, 0.055, 0.08], mat.amber, [0.32, 0.17, -0.11], 0.025, 3);
  roundedBox(plug, [0.29, 0.04, 0.12], mat.ceramic, [0.12, 0.43, -0.12], 0.02, 3);
  roundedBox(plug, [0.12, 0.028, 0.035], mat.signal, [0.12, 0.46, -0.055], 0.013, 2);
  faceCylinder(plug, 0.176, 0.13, mat.rubber, [0, 0, -0.39], 32);
  faceCylinder(plug, 0.275, 0.1, mat.metal, [0, 0, 0.205], 32);
  faceCylinder(plug, 0.255, 0.38, mat.ceramic, [0, 0, 0.43], 28);
  faceCylinder(plug, 0.274, 0.085, mat.shellEdge, [0, 0, 0.66], 32);
  torus(plug, 0.265, 0.014, mat.amber, [0, 0, 0.71], 32);
  faceCylinder(plug, 0.235, 0.026, mat.recess, [0, 0, 0.71], 28);
  ccsContactPositions.forEach(([x, y], index) => {
    faceCylinder(plug, index < 2 ? 0.022 : 0.038, 0.05, mat.amber, [x, y, 0.735], 10);
  });
  faceCylinder(plug, 0.107, 0.15, mat.rubber, [0, 0.17, -0.42], 24);
  for (let rib = 0; rib < 4; rib += 1) {
    torus(plug, 0.104 - rib * 0.004, 0.009, mat.shellEdge, [0, 0.17, -0.51 + rib * 0.035], 20);
  }
  // A compact wrist yoke makes the connector read as a robotic end effector.
  roundedBox(plug, [0.36, 0.1, 0.34], mat.chassis, [0, 0.31, 0], 0.045, 3);
  [-0.19, 0.19].forEach((x) => {
    roundedBox(plug, [0.07, 0.22, 0.13], mat.metal, [x, 0.34, 0.015], 0.028, 3);
  });
  const tetherPoint = new THREE.Vector3(0, 0.23, -0.25);

  const armBase = new THREE.Vector3(portX - 0.62, 2.55, 0.14);
  const upperArmLength = 1.95;
  const lowerArmLength = 1.8;
  const upperArm = createArmLink();
  const lowerArm = createArmLink();
  roundedBox(root, [0.46, 0.95, 0.32], mat.chassis,
    [armBase.x, armBase.y + 0.58, -0.08], 0.14, 4);
  roundedBox(root, [0.24, 0.62, 0.04], mat.shellEdge,
    [armBase.x, armBase.y + 0.63, 0.1], 0.085, 3);
  const shoulderJoint = createServoJoint(0.24);
  const elbowJoint = createServoJoint(0.21);
  const wristJoint = createServoJoint(0.18);
  shoulderJoint.position.copy(armBase);
  const wristLocalPoint = new THREE.Vector3(0, 0.34, 0.015);
  const elbowPoint = new THREE.Vector3();
  const wristPoint = new THREE.Vector3();
  const armDirection = new THREE.Vector3();
  const linkXAxis = new THREE.Vector3();
  const linkYAxis = new THREE.Vector3();
  const linkZAxis = new THREE.Vector3();
  const linkBasis = new THREE.Matrix4();
  const setArmLink = (link, start, end) => {
    armDirection.copy(end).sub(start);
    const length = armDirection.length();
    link.position.copy(start).add(end).multiplyScalar(0.5);
    link.scale.y = length;
    linkYAxis.copy(armDirection).normalize();
    linkZAxis.set(0, 0, 1).addScaledVector(linkYAxis, -linkYAxis.z).normalize();
    if (linkZAxis.lengthSq() < 0.000001) linkZAxis.set(0, 1, 0);
    linkXAxis.crossVectors(linkYAxis, linkZAxis).normalize();
    linkZAxis.crossVectors(linkXAxis, linkYAxis).normalize();
    linkBasis.makeBasis(linkXAxis, linkYAxis, linkZAxis);
    link.quaternion.setFromRotationMatrix(linkBasis);
  };
  const solveElbow = (end) => {
    const dx = end.x - armBase.x;
    const dy = end.y - armBase.y;
    const rawDistance = Math.hypot(dx, dy);
    const distance = Math.min(upperArmLength + lowerArmLength - 0.001,
      Math.max(Math.abs(upperArmLength - lowerArmLength) + 0.001, rawDistance));
    const along = (upperArmLength ** 2 - lowerArmLength ** 2 + distance ** 2) / (2 * distance);
    const height = Math.sqrt(Math.max(0, upperArmLength ** 2 - along ** 2));
    const ux = dx / rawDistance;
    const uy = dy / rawDistance;
    elbowPoint.set(
      armBase.x + along * ux - height * uy,
      armBase.y + along * uy + height * ux,
      THREE.MathUtils.lerp(armBase.z, end.z, along / upperArmLength)
    );
    return elbowPoint;
  };

  // A segmented tether follows the plug without rebuilding its geometry.
  const cableMaterial = physical('cable', 0x2a3a3e, { metalness: 0.08, roughness: 0.65, clearcoat: 0.18 });
  const cableCount = isMobile ? 14 : 20;
  const cableGeometry = trackGeometry(new THREE.CylinderGeometry(0.043, 0.043, 1, 8, 1));
  const cableSegments = [];
  const cablePoints = Array.from({ length: cableCount + 1 }, () => new THREE.Vector3());
  const cableDirection = new THREE.Vector3();
  for (let i = 0; i < cableCount; i += 1) {
    const segment = new THREE.Mesh(cableGeometry, cableMaterial);
    root.add(segment);
    cableSegments.push(segment);
  }
  const cableCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(portX + 0.24, 4.0, 0.28),
    new THREE.Vector3(portX + 0.05, 2.72, 0.48),
    new THREE.Vector3(portX + 0.3, 1.9, 0.6),
    new THREE.Vector3(portX + 0.07, 1.22, 0.38)
  );
  const beads = [];
  const beadGeometry = trackGeometry(new THREE.IcosahedronGeometry(isMobile ? 0.035 : 0.043, 1));
  for (let i = 0; i < 4; i += 1) {
    const bead = new THREE.Mesh(beadGeometry, glowMaterial());
    root.add(bead);
    beads.push(bead);
  }

  // Keep the connector fully in-frame from the first render, already held by the arm.
  const startPose = new THREE.Vector3(portX + 0.16, 1.05, 1.65);
  const dockPose = new THREE.Vector3(portX, portY, 1.11);
  const connectorPath = new THREE.CubicBezierCurve3(
    startPose,
    new THREE.Vector3(startPose.x + 0.72, startPose.y + 0.3, startPose.z + 0.42),
    new THREE.Vector3(dockPose.x + 0.1, dockPose.y + 1.15, dockPose.z + 0.86),
    dockPose
  );
  const connectorPosition = new THREE.Vector3();
  const startOrientation = new THREE.Quaternion().setFromEuler(new THREE.Euler(1.35, 0, 0));
  const dockOrientation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0));
  const cableAnchor = new THREE.Vector3(portX + 0.24, 4, 0.28);
  const cableAxis = new THREE.Vector3(0, 1, 0);
  const cableEndpoint = new THREE.Vector3();
  let wasConnected = false;
  let latchStartedAt = null;
  let darkTheme = false;

  const update = (progress, elapsed = 0) => {
    const p = clamp01(progress);
    // Start moving with the first scroll and complete the single coordinated
    // position-and-rotation curve beside the final tagline.
    // Keep the connector moving right up to contact; easing to 100% early makes
    // it look latched before the actual scroll-driven dock event.
    const approach = clamp01(p / CONNECTOR_LATCH_PROGRESS);
    // The fixed inlet fades in with the final tagline, then the seated plug energizes.
    const socketRevealProgress = smootherstep((p - 0.64) / 0.06);
    const connected = approach >= 1;
    if (connected && !wasConnected) latchStartedAt = elapsed;
    if (!connected) latchStartedAt = null;
    wasConnected = connected;
    const latchAge = connected && latchStartedAt !== null ? Math.max(0, elapsed - latchStartedAt) : 0;
    const charging = connected ? smootherstep(latchAge / 0.38) : 0;

    // Keep the socket fixed at its final size and reveal it in place with scroll.
    socketRevealMaterials.forEach((material) => {
      material.opacity = socketRevealProgress;
    });
    plug.visible = true;

    connectorPath.getPoint(approach, connectorPosition);
    plug.position.copy(connectorPosition);
    plug.quaternion.slerpQuaternions(startOrientation, dockOrientation, approach);

    wristPoint.copy(wristLocalPoint).applyQuaternion(plug.quaternion).add(plug.position);
    const elbow = solveElbow(wristPoint);
    setArmLink(upperArm, armBase, elbow);
    setArmLink(lowerArm, elbow, wristPoint);
    elbowJoint.position.copy(elbow);
    wristJoint.position.copy(wristPoint);

    cableEndpoint.copy(tetherPoint).applyQuaternion(plug.quaternion).add(plug.position);
    cableCurve.v0.copy(cableAnchor);
    const cableSway = Math.sin(approach * Math.PI) * 0.08;
    cableCurve.v1.set(cableAnchor.x - 0.1 - cableSway, cableAnchor.y - 1.15, 0.35);
    cableCurve.v2.set(cableEndpoint.x + 0.32 + cableSway, cableEndpoint.y + 0.78, 0.5);
    cableCurve.v3.copy(cableEndpoint);
    for (let i = 0; i < cableCount; i += 1) {
      const from = cableCurve.getPoint(i / cableCount, cablePoints[i]);
      const to = cableCurve.getPoint((i + 1) / cableCount, cablePoints[i + 1]);
      const length = cableDirection.subVectors(to, from).length();
      const segment = cableSegments[i];
      segment.position.copy(from).add(to).multiplyScalar(0.5);
      segment.quaternion.setFromUnitVectors(cableAxis, cableDirection.normalize());
      segment.scale.set(1, length * 1.08, 1);
    }

    const energyPulse = connected ? (latchAge * 0.58) % 1 : 0;
    const rippleDuration = 1.18;
    const rippleOffset = rippleDuration * 0.43;
    const animateRipple = (ring, ageOffset, startScale, endScale) => {
      const ringAge = latchAge - ageOffset;
      if (!connected || ringAge < 0) {
        ring.scale.setScalar(startScale);
        ring.material.opacity = 0;
        return;
      }

      const progress = (ringAge % rippleDuration) / rippleDuration;
      const expansion = 1 - Math.pow(1 - progress, 3);
      ring.scale.setScalar(startScale + (endScale - startScale) * expansion);
      const peakOpacity = darkTheme ? 0.64 : 0.46;
      ring.material.opacity = peakOpacity * Math.pow(1 - progress, 1.35);
    };
    // Each wave begins tight around the inlet, expands, and disappears as the
    // next wave starts. The offset leaves both rings visible during handoff.
    animateRipple(portHalo, 0, 0.9, 1.58);
    animateRipple(portEcho, rippleOffset, 0.76, 1.34);
    portLight.intensity = charging * (0.18 + (Math.sin(elapsed * 2.25) + 1) * 0.24);
    beads.forEach((bead, index) => {
      const t = (energyPulse + index / beads.length) % 1;
      cableCurve.getPoint(1 - t, bead.position);
      bead.position.z += 0.045;
      bead.material.opacity = charging * (0.18 + 0.55 * Math.sin(t * Math.PI));
    });
    return { connected };
  };

  const setTheme = (isDark) => {
    darkTheme = isDark;
    const colors = isDark ? {
      shell: 0x69736c,
      shellEdge: 0x435457,
      chassis: 0x151e23,
      glass: 0x0c1518,
      metal: 0x91a6a1,
      ceramic: 0xb8c0b6,
      rubber: 0x202a2d,
      recess: 0x080d11,
      coral: 0xe57a6d,
      amber: 0xc8a45f,
      signal: 0x55c8a9,
      glow: 0x5bd7b8,
      cable: 0x293538
    } : {
      shell: 0xe9e6de,
      shellEdge: 0xb4b1a8,
      chassis: 0xd3d0c7,
      glass: 0x333e3e,
      metal: 0x8b9188,
      ceramic: 0xf4f1e8,
      rubber: 0x30393b,
      recess: 0x192326,
      coral: 0xd66558,
      amber: 0xc99542,
      signal: 0x2b987f,
      glow: 0x299d84,
      cable: 0x4d595a
    };
    Object.entries(colors).forEach(([role, color]) => {
      (paletteMaterials.get(role) ?? []).forEach((material) => {
        material.color.setHex(color);
        if (role === 'signal' && 'emissive' in material) material.emissive.setHex(isDark ? 0x238c74 : 0x086b59);
      });
    });
    [portHalo, portEcho].forEach((ring) => {
      ring.material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      ring.material.needsUpdate = true;
    });
    portLight.color.setHex(colors.glow);
    hemisphere.color.setHex(isDark ? 0xf0faf5 : 0xfffdf5);
    hemisphere.groundColor.setHex(isDark ? 0x24353a : 0x85918c);
    keyLight.color.setHex(isDark ? 0xfff0d8 : 0xffffff);
    rimLight.color.setHex(isDark ? 0x68d9c4 : 0x477670);
  };

  const dispose = () => {
    scene.remove(root, hemisphere, keyLight, rimLight);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
  };

  update(0, 0);
  setTheme(false);
  return { root, update, setTheme, dispose };
}
