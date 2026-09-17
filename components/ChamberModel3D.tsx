"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

/**
 * Default path to the Chamber GLB model served from the public folder.
 * Used as fallback when no Sanity CDN URL is provided.
 */
const DEFAULT_MODEL_PATH = "/assets/Chamber.glb";

/**
 * Inner component that loads and renders the GLB model within the Canvas context.
 * Applies a slow rotation animation and centers the model in the scene.
 */
function ChamberScene({ modelUrl, autoRotate = true }: { modelUrl: string; autoRotate?: boolean }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(modelUrl);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive
        object={scene}
        scale={1.5}
        position={[0, -1, 0]}
      />
    </group>
  );
}

/**
 * Loading placeholder shown while the 3D model is being downloaded.
 */
function ModelLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" data-testid="model-loader">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-secondary">Loading 3D Model...</p>
      </div>
    </div>
  );
}

export interface ChamberModel3DProps {
  /** CSS class name for the container */
  className?: string;
  /** Whether the model should auto-rotate. Default: true */
  autoRotate?: boolean;
  /** Height of the canvas container. Default: "400px" */
  height?: string;
  /**
   * URL to the 3D model file. Can be:
   * - A Sanity CDN URL (e.g., https://cdn.sanity.io/files/...)
   * - A local path (e.g., /assets/Chamber.glb)
   * - If not provided, defaults to /assets/Chamber.glb
   */
  modelUrl?: string;
}

/**
 * ChamberModel3D renders the MASH IoT chamber as an interactive 3D model.
 * Supports loading models from Sanity CMS CDN or local public folder.
 *
 * Uses @react-three/fiber + @react-three/drei for GLB rendering with:
 * - OrbitControls for mouse/touch interaction
 * - Environment lighting for realistic materials
 * - Contact shadows for grounding
 * - Auto-rotation animation
 * - Loading fallback spinner
 *
 * Sanity CMS Integration:
 * - The 3D model can be managed through Sanity Studio
 * - Upload via scripts/upload-3d-model.js
 * - Model URL fetched from iotDeviceModel field in landingPage document
 * - Falls back to local /assets/Chamber.glb if no Sanity URL provided
 */
export default function ChamberModel3D({
  className = "",
  autoRotate = true,
  height = "400px",
  modelUrl,
}: ChamberModel3DProps) {
  const resolvedUrl = modelUrl || DEFAULT_MODEL_PATH;

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height }}
      data-testid="chamber-model-container"
    >
      <Suspense fallback={<ModelLoader />}>
        <Canvas
          camera={{ position: [3, 2, 5], fov: 45 }}
          style={{ width: "100%", height: "100%" }}
          data-testid="chamber-canvas"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 3, -5]} intensity={0.4} color="#22c55e" />

          <ChamberScene autoRotate={autoRotate} modelUrl={resolvedUrl} />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
          />

          <Environment preset="city" />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

// Preload the default model for faster initial rendering
useGLTF.preload(DEFAULT_MODEL_PATH);
