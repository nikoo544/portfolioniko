import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';


// Simple Close Icon if lucide is not installed
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default function Gallery({ items }) {
    const [selectedImage, setSelectedImage] = useState(null);

    // Disable right click globally when modal is open
    useEffect(() => {
        const handleContext = (e) => {
            if (selectedImage) e.preventDefault();
        };
        window.addEventListener('contextmenu', handleContext);
        return () => window.removeEventListener('contextmenu', handleContext);
    }, [selectedImage]);

    return (
        <>
            <div className="gallery-grid">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className="gallery-item"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedImage(item)}
                        onContextMenu={(e) => e.preventDefault()} // Prevent right click
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'zoom-in'
                        }}
                    >
                        {/* Transparent overlay to prevent drag/drop */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} />

                        <div className="item-info">
                            <h3>{item.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-button" onClick={() => setSelectedImage(null)}>
                                <CloseIcon />
                            </button>

                            <div className="image-container" onContextMenu={(e) => e.preventDefault()}>
                                <img
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    style={{ pointerEvents: 'none', userSelect: 'none' }} // Disable drag and select
                                />
                                {/* Overlay for extra protection */}
                                <div className="protection-overlay" />
                            </div>

                            <div className="modal-info">
                                <h2>{selectedImage.title}</h2>
                                <p>{selectedImage.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
