import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const PawnBonhommePKR = ({
  color = "#facc15",
  accent = "#ffffff",
  position = [0, 0, 0],
  scale = 1,
  idle = true,
}) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!idle || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y =
      position[1] + Math.sin(t * 2) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.15;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial
          color="#000000"
          opacity={0.45}
          transparent
          roughness={1}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 48]} />
        <meshPhysicalMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </mesh>
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 48]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh castShadow position={[0, 0.75, 0]}>
        <capsuleGeometry args={[0.32, 0.9, 18, 28]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0}
          roughness={0.1}
          transmission={0.8}
          thickness={0.35}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0.03}
        />
      </mesh>
      <mesh castShadow position={[0, 0.75, 0]} scale={[0.9, 0.9, 0.9]}>
        <capsuleGeometry args={[0.28, 0.75, 18, 28]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh castShadow position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.34, 40, 40]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0}
          roughness={0.08}
          transmission={0.85}
          thickness={0.4}
          ior={1.35}
          clearcoat={1}
          clearcoatRoughness={0.02}
        />
      </mesh>
      <mesh castShadow position={[0, 1.45, 0]} scale={[0.72, 0.72, 0.72]}>
        <sphereGeometry args={[0.34, 40, 40]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.16}
          emissive={accent}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh castShadow position={[0, 1.45, 0.2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 32, 1, true]} />
        <meshPhysicalMaterial
          color={accent}
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={`arm-${side}`}
          castShadow
          position={[0.45 * side, 0.85, 0]}
          rotation={[0, 0, side * -Math.PI / 6]}
        >
          <capsuleGeometry args={[0.11, 0.55, 16, 20]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.95}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh
          key={`leg-${side}`}
          castShadow
          position={[0.18 * side, 0.25, 0]}
        >
          <capsuleGeometry args={[0.14, 0.48, 16, 20]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
};
