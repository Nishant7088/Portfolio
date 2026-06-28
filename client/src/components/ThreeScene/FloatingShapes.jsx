import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const FloatingShape = ({ position, geometry = "icosahedron", color = "#5bc0eb", scale = 1, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.8, 0.3, 8, 16]} />}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} transparent opacity={0.85} />
    </mesh>
  );
};

const FloatingShapes = () => {
  return (
    <>
      <FloatingShape position={[-3, 1, -2]} geometry="icosahedron" color="#6d5ef7" scale={0.7} speed={0.8} />
      <FloatingShape position={[3, -1, -3]} geometry="octahedron" color="#5bc0eb" scale={0.9} speed={1.1} />
      <FloatingShape position={[2, 2, -4]} geometry="torus" color="#00c9a7" scale={0.6} speed={0.6} />
      <FloatingShape position={[-2.5, -1.5, -1]} geometry="icosahedron" color="#00c9a7" scale={0.4} speed={1.3} />
    </>
  );
};

export default FloatingShapes;
