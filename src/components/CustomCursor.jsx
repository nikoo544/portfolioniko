import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseenter', onMouseEnter);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mouseover', onMouseOver);
            document.addEventListener('mouseout', onMouseOut);
        };

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onMouseEnter = () => {
            setIsVisible(true);
        };

        const onMouseLeave = () => {
            setIsVisible(false);
        };

        const onMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.gallery-item') || e.target.closest('.nav-link')) {
                setIsHovered(true);
            }
        };

        const onMouseOut = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.gallery-item') || e.target.closest('.nav-link')) {
                setIsHovered(false);
            }
        };

        // Only enable on non-touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            addEventListeners();
        }

        return () => removeEventListeners();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
            <div
                className="cursor-dot"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
        </>
    );
}
