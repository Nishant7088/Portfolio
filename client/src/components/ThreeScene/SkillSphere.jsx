import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useIsMobile } from "../../hooks/useMediaQuery.js";

const fibonacciSphere = (samples) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push([x, y, z]);
  }
  return points;
};

const SkillNode = ({ position, label }) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color="#6d5ef7" emissive="#6d5ef7" emissiveIntensity={0.5} />
    </mesh>
    <Html distanceFactor={8} center zIndexRange={[1, 0]}>
      <span className="skill-node-label">{label}</span>
    </Html>
  </group>
);

const RotatingGroup = ({ skills }) => {
  const groupRef = useRef();
  const positions = useMemo(() => fibonacciSphere(skills.length), [skills.length]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill}
          position={positions[i].map((v) => v * 2.4)}
          label={skill}
        />
      ))}
    </group>
  );
};

const SkillSphere = ({ skills }) => {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, isMobile ? 1.25 : 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#5bc0eb" />
      <RotatingGroup skills={skills} />
    </Canvas>
  );
};

export default SkillSphere;