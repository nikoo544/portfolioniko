import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

function FloatingShape({ position, color, scale = 1 }) {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh position={position} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} wireframe />
            </mesh>
        </Float>
    );
}

export default function Background3D() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={['#0f0f0f']} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <FloatingShape position={[-4, 2, 0]} color="#ff0080" scale={1.5} />
                <FloatingShape position={[4, -2, -2]} color="#00ffff" scale={1.2} />
                <FloatingShape position={[0, 3, -5]} color="#ffffff" scale={0.8} />
                <FloatingShape position={[-2, -3, 2]} color="#ffaa00" scale={0.5} />
            </Canvas>
        </div>
    );
}
