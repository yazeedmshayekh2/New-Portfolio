import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import * as THREE from "three";

// ── Neural Network Geometry ──────────────────────────────────────────
function createNeuralNetworkGeometry() {
  const positions = [];
  const layers = [4, 6, 6, 4];
  const layerSpacing = 0.6;
  const neuronSpacing = 0.4;

  layers.forEach((count, layerIndex) => {
    const x = (layerIndex - (layers.length - 1) / 2) * layerSpacing;
    for (let i = 0; i < count; i++) {
      const y = (i - (count - 1) / 2) * neuronSpacing;

      for (let p = 0; p < 40; p++) {
        const r = Math.random() * 0.04;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        positions.push(
          x + r * Math.sin(phi) * Math.cos(theta),
          y + r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
      }

      if (layerIndex < layers.length - 1) {
        const nextCount = layers[layerIndex + 1];
        const nextX = x + layerSpacing;
        for (let j = 0; j < nextCount; j++) {
          const nextY = (j - (nextCount - 1) / 2) * neuronSpacing;
          const segments = 30;
          for (let s = 0; s <= segments; s++) {
            const t = s / segments;
            positions.push(
              x + (nextX - x) * t,
              y + (nextY - y) * t,
              Math.sin(t * Math.PI) * 0.05 * (Math.random() - 0.5),
            );
          }
        }
      }
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

// ── Morph Component ──────────────────────────────────────────────────
function MorphingParticles({
  targetShape,
  mouseRef,
  isDragging,
  dragDeltaRef,
}) {
  const ref = useRef();
  const progressRef = useRef(0);
  const morphingRef = useRef(false);

  // Smooth rotation targets
  const rotationRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });

  // Drag tracking
  const dragRotRef = useRef({ x: 0, y: 0 });

  const COUNT = 8000;

  const shapes = useMemo(
    () => ({
      sphere: new THREE.SphereGeometry(0.95, 64, 64),
      box: new THREE.BoxGeometry(1.35, 1.35, 1.35, 18, 18, 18),
      torus: new THREE.TorusGeometry(0.9, 0.28, 28, 90),
      neural: createNeuralNetworkGeometry(),
    }),
    [],
  );

  const samplePoints = (geo) => {
    const pos = geo.attributes.position;
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const idx = Math.floor(Math.random() * pos.count);
      arr[i * 3] = pos.getX(idx);
      arr[i * 3 + 1] = pos.getY(idx);
      arr[i * 3 + 2] = pos.getZ(idx);
    }
    return arr;
  };

  const currentPositions = useRef(samplePoints(shapes.sphere));
  const targetPositions = useRef(samplePoints(shapes.sphere));
  const prevShape = useRef("sphere");

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(currentPositions.current.slice(), 3),
    );
    return geo;
  }, []);

  useEffect(() => {
    if (targetShape === prevShape.current) return;
    targetPositions.current = samplePoints(shapes[targetShape]);
    currentPositions.current = geometry.attributes.position.array.slice();
    progressRef.current = 0;
    morphingRef.current = true;
    prevShape.current = targetShape;
  }, [targetShape]);

  useFrame((_, delta) => {
    if (isDragging.current) {
      // While dragging: apply drag delta directly
      dragRotRef.current.y += dragDeltaRef.current.x * 0.01;
      dragRotRef.current.x += dragDeltaRef.current.y * 0.01;
      dragDeltaRef.current = { x: 0, y: 0 };

      ref.current.rotation.x = dragRotRef.current.x;
      ref.current.rotation.y = dragRotRef.current.y;
    } else {
      // Hover: tilt toward mouse smoothly
      const targetX = mouseRef.current.y * 0.5;
      const targetY = mouseRef.current.x * 0.5;

      currentRotRef.current.x += (targetX - currentRotRef.current.x) * 0.05;
      currentRotRef.current.y += (targetY - currentRotRef.current.y) * 0.05;

      // Auto-spin offset on top of hover tilt
      rotationRef.current.y += delta * 0.4;

      ref.current.rotation.x = currentRotRef.current.x;
      ref.current.rotation.y = rotationRef.current.y + currentRotRef.current.y;

      // Sync drag rotation to current so dragging starts from here
      dragRotRef.current.x = ref.current.rotation.x;
      dragRotRef.current.y = ref.current.rotation.y;
    }

    // Morphing
    if (morphingRef.current) {
      progressRef.current = Math.min(progressRef.current + delta * 0.8, 1);
      const t =
        progressRef.current < 0.5
          ? 4 * progressRef.current ** 3
          : 1 - Math.pow(-2 * progressRef.current + 2, 3) / 2;

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < COUNT * 3; i++) {
        pos[i] =
          currentPositions.current[i] +
          (targetPositions.current[i] - currentPositions.current[i]) * t;
      }
      geometry.attributes.position.needsUpdate = true;

      if (progressRef.current >= 1) morphingRef.current = false;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#00d4ff"
        size={0.008}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

// ── Shape Cycle Order ────────────────────────────────────────────────
const SHAPES = ["sphere", "box", "torus", "neural"];

// ── App ──────────────────────────────────────────────────────────────
export default function HeroMorphScene() {
  const [shapeIndex, setShapeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragDeltaRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const currentShape = SHAPES[shapeIndex];

  // ── Auto-cycle every 4 seconds ─────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setShapeIndex((i) => (i + 1) % SHAPES.length);
    }, 7000);
    return () => clearInterval(id);
  }, [isPaused]);

  // ── Mouse move: track normalized position ─────────────────────────
  const onMouseMove = useCallback((e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    mouseRef.current = { x: nx, y: -ny };

    if (isDragging.current) {
      dragDeltaRef.current = {
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y,
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  // ── Mouse down: start drag, pause auto-cycle ──────────────────────
  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    setIsPaused(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  // ── Mouse up: stop drag, resume auto-cycle ────────────────────────
  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setIsPaused(false);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        background: "transparent",
        position: "relative",
        cursor: isPaused ? "grabbing" : "grab",
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Canvas camera={{ position: [0, 0, 2.6] }}>
        <MorphingParticles
          targetShape={currentShape}
          mouseRef={mouseRef}
          isDragging={isDragging}
          dragDeltaRef={dragDeltaRef}
        />
      </Canvas>
    </div>
  );
}
