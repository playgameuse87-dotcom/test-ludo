import React from "react";
import { MAIN_PATH, SAFE_POSITIONS, PLAYER_COLORS, HOME_BASES, CELL_SIZE, BOARD_GRID } from "./constants";
import { Text } from "@react-three/drei";

const renderMainPath = () =>
  MAIN_PATH.map((coord, index) => {
    const x = coord.x * CELL_SIZE;
    const z = coord.z * CELL_SIZE;
    const isSafe = SAFE_POSITIONS.includes(index);

    return (
      <group key={index} position={[x, 0.06, z]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.9 * CELL_SIZE, 0.08, 0.9 * CELL_SIZE]} />
          <meshStandardMaterial
            color={isSafe ? "#fbbf24" : "#f5f5f5"}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[0.95 * CELL_SIZE, 0.01, 0.95 * CELL_SIZE]} />
          <meshStandardMaterial
            color={isSafe ? "#facc15" : "#e5e7eb"}
            metalness={0.95}
            roughness={0.08}
          />
        </mesh>
        {isSafe && (
          <mesh position={[0, 0.12, 0]} castShadow>
            <circleGeometry args={[0.28 * CELL_SIZE, 6]} />
            <meshStandardMaterial
              color="#f97316"
              metalness={0.95}
              roughness={0.1}
              emissive="#f97316"
              emissiveIntensity={0.4}
            />
          </mesh>
        )}
      </group>
    );
  });

const renderHomeBases = () =>
  HOME_BASES.map((base) => {
    const color = PLAYER_COLORS[base.colorKey];

    return (
      <group key={base.colorKey} position={base.pos}>
        <mesh receiveShadow>
          <boxGeometry args={[4 * CELL_SIZE, 0.09, 4 * CELL_SIZE]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[3.2 * CELL_SIZE, 0.02, 3.2 * CELL_SIZE]} />
          <meshStandardMaterial color="#f9fafb" metalness={0.2} roughness={0.6} />
        </mesh>
        {[-0.8, 0.8].flatMap((x) =>
          [-0.8, 0.8].map((z, idx) => (
            <mesh
              key={`${base.colorKey}-slot-${idx}-${x}-${z}`}
              position={[x * CELL_SIZE, 0.09, z * CELL_SIZE]}
            >
              <cylinderGeometry
                args={[0.35 * CELL_SIZE, 0.35 * CELL_SIZE, 0.08, 24]}
              />
              <meshStandardMaterial
                color="#e5e7eb"
                metalness={0.4}
                roughness={0.4}
              />
            </mesh>
          ))
        )}
      </group>
    );
  });

const renderCenter = () => (
  <group>
    <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.07, 0]}>
      <boxGeometry args={[3.5 * CELL_SIZE, 0.04, 3.5 * CELL_SIZE]} />
      <meshStandardMaterial color="#020617" metalness={0.85} roughness={0.18} />
    </mesh>
    {[
      { color: PLAYER_COLORS.red, rot: 0 },
      { color: PLAYER_COLORS.yellow, rot: Math.PI / 2 },
      { color: PLAYER_COLORS.blue, rot: Math.PI },
      { color: PLAYER_COLORS.green, rot: -Math.PI / 2 },
    ].map((t, i) => (
      <mesh
        key={i}
        rotation={[-Math.PI / 2, 0, t.rot]}
        position={[0, 0.1, 0]}
      >
        <coneGeometry args={[1.7 * CELL_SIZE, 0.02, 3]} />
        <meshStandardMaterial
          color={t.color}
          metalness={0.8}
          roughness={0.25}
          emissive={t.color}
          emissiveIntensity={0.2}
        />
      </mesh>
    ))}
  </group>
);

export const Board3D = () => {
  return (
    <group>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry
          args={[
            BOARD_GRID * CELL_SIZE,
            0.22,
            BOARD_GRID * CELL_SIZE,
          ]}
        />
        <meshStandardMaterial
          color="#020617"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry
          args={[
            (BOARD_GRID - 0.5) * CELL_SIZE,
            0.02,
            (BOARD_GRID - 0.5) * CELL_SIZE,
          ]}
        />
        <meshStandardMaterial
          color="#111827"
          metalness={1}
          roughness={0.06}
        />
      </mesh>
      {renderMainPath()}
      {renderHomeBases()}
      {renderCenter()}
      <Text
        position={[0, 0.2, BOARD_GRID * CELL_SIZE * 0.4]}
        fontSize={1.1}
        color="#facc15"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#0f172a"
      >
        LUDO ROYALE
      </Text>
    </group>
  );
};
