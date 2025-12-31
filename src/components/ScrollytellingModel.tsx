import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";

type ScrollytellingSection = "hero" | "fire-safety" | "cctv" | "none";

function FireExtinguisher({
  activeSection,
}: {
  activeSection: ScrollytellingSection;
}) {
  const modelRef = useRef<any>(null);
  const { scene } = useGLTF("/fire_extinguisher.glb");

  // Transitions for Fire Extinguisher
  // Hero: Fixed Right
  // Fire Safety: Fixed Left

  useFrame((state) => {
    if (modelRef.current) {
      // Visibility logic
      const isVisible =
        activeSection === "hero" || activeSection === "fire-safety";
      modelRef.current.visible = isVisible;

      if (!isVisible) return;

      if (activeSection === "hero") {
        // Hero position: Fixed Right, Grounded
        modelRef.current.position.x = 1.3;
        modelRef.current.position.y = -1.5;
        modelRef.current.scale.setScalar(0.65);
        modelRef.current.rotation.y =
          Math.PI / 6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      } else if (activeSection === "fire-safety") {
        // Fire Safety position: Fixed Left (within bounds)
        modelRef.current.position.x = -1.5;
        modelRef.current.position.y = -1.8;
        modelRef.current.scale.setScalar(0.7);
        modelRef.current.rotation.y = Math.PI / 4;
      }

      modelRef.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      });
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

function CCTVCamera({
  activeSection,
}: {
  activeSection: ScrollytellingSection;
}) {
  const modelRef = useRef<any>(null);
  const { scene } = useGLTF("/surveillance_cctv_camera.glb");

  // Hero: Fixed Bottom-Right
  // CCTV: Fixed Right

  useFrame((state) => {
    if (modelRef.current) {
      const isVisible = activeSection === "hero" || activeSection === "cctv";
      modelRef.current.visible = isVisible;

      if (!isVisible) return;

      if (activeSection === "hero") {
        modelRef.current.position.set(5.5, -16.0, 0.5);
        modelRef.current.scale.setScalar(12.0);
        modelRef.current.rotation.y =
          -Math.PI / 8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
        modelRef.current.rotation.x = -0.2;
      } else if (activeSection === "cctv") {
        // CCTV section: Fixed Right, Large Scale (within section bounds)
        modelRef.current.position.x = 2.8;
        modelRef.current.position.y = -15.6;
        modelRef.current.scale.setScalar(12.0);
        modelRef.current.rotation.y = -Math.PI / 6;
        modelRef.current.rotation.x = -0.2;
      }

      modelRef.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = activeSection === "hero" ? 0.8 : 1.0;
        }
      });
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

const LoadingFallback = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial color="#dc2626" wireframe />
  </mesh>
);

const ScrollytellingModel = ({
  activeSection,
}: {
  activeSection: ScrollytellingSection;
}) => {
  // Only render canvas when models should be visible
  if (activeSection === "none") {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<LoadingFallback />}>
          <Environment preset="city" />
          <FireExtinguisher activeSection={activeSection} />
          <CCTVCamera activeSection={activeSection} />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ScrollytellingModel;
export type { ScrollytellingSection };
