import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleField from "./ParticleField.jsx";
import FloatingShapes from "./FloatingShapes.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";

const HeroScene = () => {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      frameloop="always"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6d5ef7" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#00c9a7" />
      <Suspense fallback={null}>
        <ParticleField count={isMobile ? 150 : 400} />
        {!isMobile && <FloatingShapes />}
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
