import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { Board3D } from "./Board3D";
import { PawnBonhommePKR } from "./PawnBonhommePKR";
import { DiamondDie } from "./DiamondDie";

const App = () => {
  return (
    <div className="app-container">
      <div className="canvas-wrapper">
        <Canvas
          shadows
          camera={{ position: [0, 18, 18], fov: 40 }}
        >
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[12, 22, 8]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight
            position={[-10, 18, -8]}
            angle={0.6}
            penumbra={0.4}
            intensity={0.85}
            castShadow
          />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#facc15" />
          <Stars
            radius={80}
            depth={40}
            count={800}
            factor={4}
            saturation={0}
            fade
          />
          <Environment preset="city" />
          <Board3D />
          <PawnBonhommePKR color="#facc15" position={[0, 0.1, 3]} idle />
          <PawnBonhommePKR color="#3b82f6" position={[-3, 0.1, -3]} idle />
          <PawnBonhommePKR color="#ef4444" position={[3, 0.1, -3]} idle />
          <DiamondDie position={[0, 2.2, 0]} scale={1.1} />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2.05}
            minDistance={12}
            maxDistance={26}
          />
        </Canvas>
      </div>

      <div className="ui-overlay">
        <div className="title">LUDO ROYALE</div>
        <div className="subtitle">3D • ONLINE • PREMIUM EDITION</div>
        <div className="menu-buttons">
          <button className="btn btn-primary">Play</button>
          <button className="btn">Online</button>
          <button className="btn">Quit</button>
        </div>
      </div>

      <div className="badge-loading">
        <span className="dot" />
        <span>Diamond loading</span>
      </div>
    </div>
  );
};

export default App;
