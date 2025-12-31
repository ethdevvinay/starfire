import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PresentationControls,
  Stage,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion } from "framer-motion";

function Model() {
  const modelRef = useRef<any>(null);
  const { scene } = useGLTF("/fire_extinguisher.glb");

  // Auto-rotation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.5}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

const LoadingFallback = () => (
  <mesh position={[0, 0, 0]}>
    <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
    <meshStandardMaterial
      color="#dc2626"
      metalness={0.8}
      roughness={0.2}
      wireframe
    />
  </mesh>
);

const ModelViewer3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<LoadingFallback />}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Stage environment="city" intensity={0.6} shadows="contact">
              <Model />
            </Stage>
          </PresentationControls>
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </motion.div>
  );
};

export default ModelViewer3D;
