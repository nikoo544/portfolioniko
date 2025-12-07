import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function Background3D() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <color attach="background" args={['#0f0f0f']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={3} />
            </Canvas>
        </div>
    );
}
