import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function Stars(props) {
  const ref = useRef();
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(5000), { radius: 1.5 })], []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef();
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(1500), { radius: 2 })], []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 20;
    ref.current.rotation.y += delta / 25;
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4f46e5"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function MovingDust() {
  const ref = useRef();
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(3000), { radius: 3 })], []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 30;
    ref.current.rotation.y -= delta / 40;
    ref.current.rotation.z += delta / 50;
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function DistantStars() {
  const ref = useRef();
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(2000), { radius: 4 })], []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 60;
    ref.current.rotation.y += delta / 80;
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const SpaceParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <FloatingParticles />
        <MovingDust />
        <DistantStars />
      </Canvas>
      
      {/* Additional CSS-based particles for extra depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Twinkling stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
        
        {/* Floating orbs */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpaceParticleBackground;

