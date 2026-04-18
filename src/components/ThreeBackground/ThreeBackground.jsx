import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.scss';

function FloatingShape({ position, color, speed = 0.2, scale = 1 }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed;
    meshRef.current.rotation.y = t * speed * 0.8;
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.22} />
    </mesh>
  );
}

function Stars() {
  const pointsRef = useRef(null);
  const starCount = 800;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={new THREE.Color('#00d4ff')} size={0.035} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="three-background" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 56 }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 5, 6]} color="#00d4ff" intensity={1} />
        <pointLight position={[-6, -5, 3]} color="#7c3aed" intensity={0.75} />
        <FloatingShape position={[-4, 1, -2]} color="#00d4ff" speed={0.18} scale={0.95} />
        <FloatingShape position={[4, -1.5, -1]} color="#7c3aed" speed={0.25} scale={1.2} />
        <Stars />
      </Canvas>
    </div>
  );
}
