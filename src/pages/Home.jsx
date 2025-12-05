import { motion } from 'framer-motion';

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="page-container"
            style={{ textAlign: 'center', marginTop: '15vh' }}
        >
            <h1 style={{ fontSize: '5rem', marginBottom: '1rem' }}>ARTIST</h1>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#aaa' }}>PORTFOLIO</h2>
            <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '600px', margin: '2rem auto', lineHeight: '1.8' }}>
                Welcome to my creative universe. <br />
                Explore my works in <span style={{ color: '#fff' }}>Manga</span>, <span style={{ color: '#fff' }}>Illustration</span>, and <span style={{ color: '#fff' }}>Digital Art</span>.
            </p>
        </motion.div>
    );
}
