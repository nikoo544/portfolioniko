import { motion } from 'framer-motion';
import { portfolioData } from '../data/projects';
import Gallery from '../components/Gallery';

export default function Digital() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="page-container"
        >
            <h1>Digital Art</h1>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Digital paintings and sketches.</p>
            <Gallery items={portfolioData.digital} />
        </motion.div>
    );
}
