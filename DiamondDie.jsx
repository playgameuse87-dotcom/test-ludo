import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const DiamondDie = ({ position = [0, 1.4, 0], scale = 1 }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.9;
    ref.current.rotation.y = t * 1.2;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          metalness={0.6}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.04}
          transmission={0.45}
          thickness={0.5}
          ior={1.4}
          emissive="#facc15"
          emissiveIntensity={0.35}
        />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const offsets = [
          [0, 0, 0.41],
          [0.41, 0, 0],
          [0, 0, -0.41],
          [-0.41, 0, 0],
          [0, 0.41, 0],
          [0, -0.41, 0],
        ];
        const [x, y, z] = offsets[i];
        return (
          <mesh key={i} position={[x, y, z]}>
            <circleGeometry args={[0.08, 16]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive="#b91c1c"
              emissiveIntensity={0.8}
              metalness={1}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};
