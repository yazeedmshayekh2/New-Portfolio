import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import * as THREE from "three";

// ── GPU Geometry (ROG Astral RTX 5090 Dhahab) ────────────────────────
function createGPUGeometry(isLight) {
  const positions = [];
  const colors = [];
  const width = 2.8;
  const height = 1.1;
  const depth = 0.4;

  const cGold = new THREE.Color(isLight ? "#b45309" : "#f5a623"); // Amber/Gold
  const cTurq = new THREE.Color(isLight ? "#047857" : "#22d3a7"); // Emerald accents
  const cDark = new THREE.Color("#222222"); // Dark metal

  const addSurface = (x1, x2, y1, y2, z1, z2, density, color) => {
    const area = Math.max(
      Math.abs((x2 - x1) * (y2 - y1)),
      Math.abs((x2 - x1) * (z2 - z1)),
      Math.abs((y2 - y1) * (z2 - z1)),
    );
    const points = Math.floor(area * density);
    for (let i = 0; i < points; i++) {
      const px = x1 + Math.random() * (x2 - x1);
      const py = y1 + Math.random() * (y2 - y1);
      const pz = z1 + Math.random() * (z2 - z1);
      positions.push(px, py, pz);
      colors.push(color.r, color.g, color.b);
    }
  };

  const d = 2000;

  // Backplate (Gold)
  addSurface(
    -width / 2,
    width / 2,
    -height / 2,
    height / 2,
    -depth / 2,
    -depth / 2,
    d,
    cGold,
  );

  // Top & Bottom edges (Gold with Turquoise accents)
  addSurface(
    -width / 2,
    width / 2,
    height / 2,
    height / 2,
    -depth / 2,
    depth / 2,
    d * 0.5,
    cGold,
  );
  addSurface(
    -width / 2,
    width / 2,
    -height / 2,
    -height / 2,
    -depth / 2,
    depth / 2,
    d * 0.5,
    cGold,
  );

  // Side edges (Turquoise accents)
  addSurface(
    -width / 2,
    -width / 2,
    -height / 2,
    height / 2,
    -depth / 2,
    depth / 2,
    d * 0.5,
    cTurq,
  );
  addSurface(
    width / 2,
    width / 2,
    -height / 2,
    height / 2,
    -depth / 2,
    depth / 2,
    d * 0.5,
    cTurq,
  );

  // PCIe connector
  addSurface(
    -0.8,
    0.2,
    -height / 2 - 0.15,
    -height / 2,
    -0.02,
    0.02,
    d * 1.5,
    cGold,
  );

  // Front shroud frame (Gold)
  addSurface(
    -width / 2,
    width / 2,
    -height / 2,
    height / 2,
    depth / 2,
    depth / 2,
    d * 0.4,
    cGold,
  );

  // Heatsink fins inside (Dark / Silver)
  for (let x = -width / 2 + 0.05; x < width / 2 - 0.05; x += 0.08) {
    for (let i = 0; i < 60; i++) {
      positions.push(
        x,
        (Math.random() - 0.5) * height * 0.9,
        (Math.random() - 0.5) * depth * 0.8,
      );
      colors.push(0.5, 0.5, 0.5); // Silver
    }
  }

  // 3 Fans on the front
  const fanCenters = [-0.85, 0, 0.85];
  const fanRadius = 0.45;

  fanCenters.forEach((cx, index) => {
    // Fan ring (Turquoise)
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = fanRadius * (0.95 + Math.random() * 0.05);
      positions.push(
        cx + Math.cos(theta) * r,
        Math.sin(theta) * r,
        depth / 2 + 0.02,
      );
      colors.push(cTurq.r, cTurq.g, cTurq.b);
    }

    // Fan blades (Dark)
    const numBlades = 11;
    for (let b = 0; b < numBlades; b++) {
      const baseAngle = (b / numBlades) * Math.PI * 2;
      for (let i = 0; i < 120; i++) {
        const r = Math.random() * fanRadius * 0.9;
        const angle = baseAngle + r * 0.6 + (Math.random() - 0.5) * 0.1;
        positions.push(
          cx + Math.cos(angle) * r,
          Math.sin(angle) * r,
          depth / 2 + 0.01 - r * 0.05,
        );
        colors.push(cDark.r, cDark.g, cDark.b);
      }
    }

    // Fan hub (Gold)
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.12;
      positions.push(
        cx + Math.cos(theta) * r,
        Math.sin(theta) * r,
        depth / 2 + 0.03,
      );
      colors.push(cGold.r, cGold.g, cGold.b);
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

// ── AI Energy Core Geometry ──────────────────────────────────────────
function createAIEnergyGeometry(isLight) {
  const positions = [];
  const colors = [];

  const cText = new THREE.Color(isLight ? "#047857" : "#22d3a7"); // Cyan -> Emerald
  const cWave1 = new THREE.Color(isLight ? "#b45309" : "#f5a623"); // Violet -> Amber
  const cWave2 = new THREE.Color(isLight ? "#047857" : "#22d3a7"); // Cyan -> Emerald

  const addBlockLine = (x1, y1, x2, y2, density) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.floor(len * density);

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const bx = x1 + dx * t;
      const by = y1 + dy * t;
      for (let p = 0; p < 15; p++) {
        positions.push(
          bx + (Math.random() - 0.5) * 0.08,
          by + (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
        );
        colors.push(cText.r, cText.g, cText.b);
      }
    }
  };

  const density = 100;
  // "A"
  addBlockLine(-0.5, -0.4, -0.5, 0.4, density);
  addBlockLine(-0.5, 0.4, -0.1, 0.4, density);
  addBlockLine(-0.1, 0.4, -0.1, -0.4, density);
  addBlockLine(-0.5, 0.0, -0.1, 0.0, density);
  // "I"
  addBlockLine(0.1, 0.4, 0.5, 0.4, density);
  addBlockLine(0.3, 0.4, 0.3, -0.4, density);
  addBlockLine(0.1, -0.4, 0.5, -0.4, density);

  // Tiny circuit branches
  for (let i = 0; i < 40; i++) {
    const startX = Math.random() > 0.5 ? -0.5 : 0.3;
    const startY = (Math.random() - 0.5) * 0.8;
    let cx = startX;
    let cy = startY;
    const len = Math.floor(Math.random() * 6) + 3;
    for (let j = 0; j < len; j++) {
      if (Math.random() > 0.5) cx += (Math.random() > 0.5 ? 1 : -1) * 0.12;
      else cy += (Math.random() > 0.5 ? 1 : -1) * 0.12;
      for (let p = 0; p < 10; p++) {
        positions.push(
          cx + (Math.random() - 0.5) * 0.02,
          cy + (Math.random() - 0.5) * 0.02,
          0.05,
        );
        colors.push(cText.r, cText.g, cText.b);
      }
    }
  }

  // Energy Wave
  const strands = 12;
  for (let s = 0; s < strands; s++) {
    const strandPhase = Math.random() * Math.PI * 2;
    const strandFreq = 2 + Math.floor(Math.random() * 4);
    const strandZFreq = 1 + Math.floor(Math.random() * 3);
    const strandColor = s % 2 === 0 ? cWave1 : cWave2;

    for (let i = 0; i < 250; i++) {
      const theta = (i / 250) * Math.PI * 2;
      const r = 1.1 + 0.2 * Math.sin(theta * strandFreq + strandPhase);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = 0.5 * Math.sin(theta * strandZFreq + strandPhase);

      for (let p = 0; p < 4; p++) {
        positions.push(
          x + (Math.random() - 0.5) * 0.06,
          y + (Math.random() - 0.5) * 0.06,
          z + (Math.random() - 0.5) * 0.06,
        );
        colors.push(strandColor.r, strandColor.g, strandColor.b);
      }
    }
  }

  // Background Grid
  for (let i = 0; i < 600; i++) {
    const x = (Math.random() - 0.5) * 3.5;
    const y = (Math.random() - 0.5) * 3.5;
    const z = -0.4 + (Math.random() - 0.5) * 0.1;
    positions.push(x, y, z);
    colors.push(0.1, 0.1, 0.3);

    if (Math.random() < 0.08) {
      let tx = x;
      let ty = y;
      for (let j = 0; j < 6; j++) {
        if (Math.random() > 0.5) tx += 0.15;
        else ty += 0.15;
        positions.push(tx, ty, z);
        colors.push(0.2, 0.2, 0.5);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

// ── DNA Helix Geometry ───────────────────────────────────────────────
function createDNAHelixGeometry(isLight) {
  const positions = [];
  const colors = [];
  const c1 = new THREE.Color(isLight ? "#047857" : "#22d3a7");
  const c2 = new THREE.Color(isLight ? "#b45309" : "#f5a623");
  const cRung = new THREE.Color("#ffffff");

  const count = 400;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 8;
    const r = 0.5;
    const x = Math.cos(t) * r;
    const y = (i / count) * 3 - 1.5;
    const z = Math.sin(t) * r;

    for (let p = 0; p < 6; p++) {
      positions.push(
        x + (Math.random() - 0.5) * 0.08,
        y + (Math.random() - 0.5) * 0.08,
        z + (Math.random() - 0.5) * 0.08,
      );
      colors.push(c1.r, c1.g, c1.b);
    }
    for (let p = 0; p < 6; p++) {
      positions.push(
        -x + (Math.random() - 0.5) * 0.08,
        y + (Math.random() - 0.5) * 0.08,
        -z + (Math.random() - 0.5) * 0.08,
      );
      colors.push(c2.r, c2.g, c2.b);
    }

    if (i % 12 === 0) {
      for (let j = 0; j < 15; j++) {
        const tr = j / 15;
        positions.push(
          x + (-x - x) * tr + (Math.random() - 0.5) * 0.04,
          y + (Math.random() - 0.5) * 0.04,
          z + (-z - z) * tr + (Math.random() - 0.5) * 0.04,
        );
        colors.push(cRung.r, cRung.g, cRung.b);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

// ── Morph Component ──────────────────────────────────────────────────
function MorphingParticles({
  targetShape,
  mouseRef,
  isDragging,
  dragDeltaRef,
  isLight,
}) {
  const ref = useRef();
  const progressRef = useRef(0);
  const morphingRef = useRef(false);

  const rotationRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });
  const dragRotRef = useRef({ x: 0, y: 0 });

  const COUNT = 8000;

  const shapes = useMemo(
    () => ({
      gpu: createGPUGeometry(isLight),
      aiCore: createAIEnergyGeometry(isLight),
      helix: createDNAHelixGeometry(isLight),
      torusKnot: new THREE.TorusKnotGeometry(0.65, 0.22, 100, 16),
    }),
    [isLight],
  );

  const samplePointsAndColors = useCallback(
    (geo, defaultColorStr) => {
      const pos = geo.attributes.position;
      const col = geo.attributes.color;

      const defaultColor = new THREE.Color(defaultColorStr);

      const posArr = new Float32Array(COUNT * 3);
      const colArr = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        const idx = Math.floor(Math.random() * pos.count);
        posArr[i * 3] = pos.getX(idx);
        posArr[i * 3 + 1] = pos.getY(idx);
        posArr[i * 3 + 2] = pos.getZ(idx);

        if (col) {
          colArr[i * 3] = col.getX(idx);
          colArr[i * 3 + 1] = col.getY(idx);
          colArr[i * 3 + 2] = col.getZ(idx);
        } else {
          colArr[i * 3] = defaultColor.r;
          colArr[i * 3 + 1] = defaultColor.g;
          colArr[i * 3 + 2] = defaultColor.b;
        }
      }
      return { positions: posArr, colors: colArr };
    },
    [COUNT],
  );

  const defaultColorMap = {
    gpu: isLight ? "#b45309" : "#f5a623",
    aiCore: isLight ? "#047857" : "#22d3a7",
    helix: isLight ? "#047857" : "#22d3a7",
    torusKnot: isLight ? "#b45309" : "#f5a623",
  };

  const currentData = useRef(
    samplePointsAndColors(shapes.aiCore, defaultColorMap.aiCore),
  );
  const targetData = useRef(
    samplePointsAndColors(shapes.aiCore, defaultColorMap.aiCore),
  );
  const prevShape = useRef("aiCore");

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        currentData.current.positions.slice(),
        3,
      ),
    );
    geo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(currentData.current.colors.slice(), 3),
    );
    return geo;
  }, []);

  useEffect(() => {
    if (targetShape === prevShape.current) return;
    targetData.current = samplePointsAndColors(
      shapes[targetShape],
      defaultColorMap[targetShape],
    );
    currentData.current.positions = geometry.attributes.position.array.slice();
    currentData.current.colors = geometry.attributes.color.array.slice();
    progressRef.current = 0;
    morphingRef.current = true;
    prevShape.current = targetShape;
  }, [targetShape, geometry, shapes, samplePointsAndColors, defaultColorMap]);

  useFrame((_, delta) => {
    if (isDragging.current) {
      rotationRef.current.y += dragDeltaRef.current.x * 0.01;
      rotationRef.current.x += dragDeltaRef.current.y * 0.01;
      dragDeltaRef.current = { x: 0, y: 0 };
    } else {
      rotationRef.current.y += delta * 0.4;
    }

    const targetX = mouseRef.current.y * 0.5;
    const targetY = mouseRef.current.x * 0.5;

    currentRotRef.current.x += (targetX - currentRotRef.current.x) * 0.05;
    currentRotRef.current.y += (targetY - currentRotRef.current.y) * 0.05;

    ref.current.rotation.x = rotationRef.current.x + currentRotRef.current.x;
    ref.current.rotation.y = rotationRef.current.y + currentRotRef.current.y;

    if (morphingRef.current) {
      progressRef.current = Math.min(progressRef.current + delta * 0.8, 1);
      const t =
        progressRef.current < 0.5
          ? 4 * progressRef.current ** 3
          : 1 - Math.pow(-2 * progressRef.current + 2, 3) / 2;

      const pos = geometry.attributes.position.array;
      const col = geometry.attributes.color.array;

      const currP = currentData.current.positions;
      const targP = targetData.current.positions;
      const currC = currentData.current.colors;
      const targC = targetData.current.colors;

      for (let i = 0; i < COUNT * 3; i++) {
        pos[i] = currP[i] + (targP[i] - currP[i]) * t;
        col[i] = currC[i] + (targC[i] - currC[i]) * t;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      if (progressRef.current >= 1) morphingRef.current = false;
    }
  });

  // ── Create Neutral Glow Texture for Vertex Colors ──────────────────
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    // Neutral gradient so vertex colors can tint it perfectly
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={glowTexture}
        color="#ffffff"
        vertexColors={true}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Shape Cycle Order ────────────────────────────────────────────────
const SHAPES = ["aiCore", "gpu", "helix", "torusKnot"];

const SHAPE_CODE_LABELS = {
  aiCore: { class: "AIEnergyCore", args: "status='active'" },
  gpu: { class: "ROGAstralDhahab", args: "gpu='RTX 5090', memory='32GB'" },
  helix: { class: "GeneticAlgorithm", args: "population=1000" },
  torusKnot: { class: "QuantumCircuit", args: "qubits=128" },
};

// ── App ──────────────────────────────────────────────────────────────
export default function HeroMorphScene() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cyanColor = isLight ? "#047857" : "#22d3a7";
  const violetColor = isLight ? "#b45309" : "#f5a623";
  const [shapeIndex, setShapeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragDeltaRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const currentShape = SHAPES[shapeIndex];
  const shapeLabel = SHAPE_CODE_LABELS[currentShape];

  const [dpr, setDpr] = useState(1.5);

  // ── Auto-cycle every 7 seconds ─────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setShapeIndex((i) => (i + 1) % SHAPES.length);
    }, 7000);
    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      const cap = w <= 768 ? 1.35 : 2;
      setDpr(Math.min(window.devicePixelRatio || 1, cap));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

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

  const onTouchMove = useCallback((e) => {
    const t = e.touches[0];
    if (!t) return;
    const nx = (t.clientX / window.innerWidth) * 2 - 1;
    const ny = (t.clientY / window.innerHeight) * 2 - 1;
    mouseRef.current = { x: nx, y: -ny };

    if (isDragging.current) {
      dragDeltaRef.current = {
        x: t.clientX - lastMousePos.current.x,
        y: t.clientY - lastMousePos.current.y,
      };
      lastMousePos.current = { x: t.clientX, y: t.clientY };
    }
  }, []);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    setIsPaused(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    if (!t) return;
    isDragging.current = true;
    setIsPaused(true);
    lastMousePos.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setIsPaused(false);
  }, []);

  const overlayStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    pointerEvents: "none",
    zIndex: 10,
    fontFamily: "'Fira Code', 'Roboto Mono', 'Courier New', monospace",
  };

  const labelStyle = {
    fontSize: "0.75rem",
    letterSpacing: "0.04em",
    background: "rgba(var(--text-primary-rgb), 0.05)",
    backdropFilter: "blur(8px)",
    padding: "6px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(var(--text-primary-rgb), 0.5)",
    transition: "all 0.4s ease",
  };

  const dotsStyle = {
    display: "flex",
    gap: "8px",
    pointerEvents: "auto",
  };

  return (
    <div
      className="hero-morph-scene"
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
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
      onTouchCancel={onMouseUp}
    >
      <Canvas dpr={dpr} camera={{ position: [0, 0, 2.6] }}>
        <MorphingParticles
          isLight={isLight}
          targetShape={currentShape}
          mouseRef={mouseRef}
          isDragging={isDragging}
          dragDeltaRef={dragDeltaRef}
        />
      </Canvas>

      {/* Coding-style shape label overlay */}
      <div className="hero-morph-overlay" style={overlayStyle}>
        <div className="hero-morph-label" style={labelStyle}>
          <span style={{ color: violetColor }}>new </span>
          <span style={{ color: cyanColor }}>{shapeLabel.class}</span>
          <span style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}>(</span>
          <span style={{ color: isLight ? "#059669" : "#10b981" }}>
            {shapeLabel.args}
          </span>
          <span style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}>)</span>
          <span style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}>;</span>
        </div>

        <div className="hero-morph-dots" style={dotsStyle}>
          {SHAPES.map((s, i) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                setShapeIndex(i);
                setIsPaused(false);
              }}
              style={{
                width: "28px",
                height: "28px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
              aria-label={`Switch to ${s}`}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border:
                    i === shapeIndex
                      ? `2px solid ${cyanColor}`
                      : "1px solid rgba(var(--text-primary-rgb), 0.5)",
                  background:
                    i === shapeIndex
                      ? cyanColor
                      : "rgba(var(--text-primary-rgb), 0.5)",
                  transition: "all 0.3s ease",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
