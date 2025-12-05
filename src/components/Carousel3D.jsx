import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Html } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData } from '../data/projects';

// Collect all images for the showcase
const allImages = [
    ...(portfolioData.manga || []),
    ...(portfolioData.illustration || []),
    ...(portfolioData.digital || [])
].slice(0, 8);

function CarouselItem({ index, total, url, ...props }) {
    const ref = useRef();
    const angle = (index / total) * Math.PI * 2;
    const radius = 3.2;

    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    useFrame((state) => {
        if (ref.current) {
            // Simple floating effect
            ref.current.position.y = Math.sin(state.clock.elapsedTime + index * 0.5) * 0.1;
            // Make sure they face the center/camera somewhat
            ref.current.lookAt(0, 0, 0);
        }
    });

    return (
        <group position={[x, 0, z]} {...props}>
            <Image
                ref={ref}
                url={url}
                scale={[1.5, 2]}
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
            />
        </group>
    );
}

function Carousel() {
    const groupRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [rotationVelocity, setRotationVelocity] = useState(0.001);

    useFrame(() => {
        if (groupRef.current && !isDragging) {
            groupRef.current.rotation.y += rotationVelocity;
            setRotationVelocity(v => v * 0.95 + 0.002 * 0.05);
        }
    });

    const handlePointerDown = (e) => {
        setIsDragging(true);
        setLastX(e.clientX);
        setRotationVelocity(0);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const handlePointerMove = (e) => {
        if (isDragging && groupRef.current) {
            const delta = e.clientX - lastX;
            groupRef.current.rotation.y += delta * 0.005;
            setRotationVelocity(delta * 0.005);
            setLastX(e.clientX);
        }
    };

    if (allImages.length === 0) return null;

    return (
        <group
            ref={groupRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            {allImages.map((item, i) => (
                <CarouselItem
                    key={i}
                    index={i}
                    total={allImages.length}
                    url={item.image}
                />
            ))}
        </group>
    );
}

function Loader() {
    return <Html center><span style={{ color: 'white' }}>Loading 3D...</span></Html>
}

export default function Carousel3D() {
    return (
        <div style={{ width: '100%', height: '400px', position: 'relative', cursor: 'grab', marginTop: '2rem' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <fog attach="fog" args={['#0f0f0f', 5, 15]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Suspense fallback={<Loader />}>
                    <Carousel />
                </Suspense>
            </Canvas>
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.8rem',
                pointerEvents: 'none'
            }}>
                Drag to rotate
            </div>
        </div>
    );
}
