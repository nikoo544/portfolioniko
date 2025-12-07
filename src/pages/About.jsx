import { motion } from 'framer-motion';
import { Coffee, Zap, PenTool, Cpu, Heart, Music, Gamepad2, BookOpen, Monitor, Library } from 'lucide-react';

export default function About() {
    const tools = [
        { name: 'Clip Studio', icon: <PenTool size={18} /> },
        { name: 'Wacom Cintiq', icon: <Monitor size={18} /> },
        { name: 'Photoshop', icon: <Zap size={18} /> },
    ];

    const likes = [
        { name: 'Manga', icon: <BookOpen size={16} /> },
        { name: 'Cyberpunk', icon: <Cpu size={16} /> },
        { name: 'Retro Games', icon: <Gamepad2 size={16} /> },
        { name: 'Lo-Fi', icon: <Music size={16} /> },
    ];

    const books = [
        "Akira",
        "Berserk",
        "Neuromancer",
        "Understanding Comics"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="page-container"
            style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}
        >
            {/* Header Profile */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '4rem',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                    marginBottom: '1.5rem',
                    background: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{ color: '#555' }}>[Avatar]</span>
                </div>
                <h1 style={{ fontSize: '3rem', margin: '0', letterSpacing: '5px', textTransform: 'uppercase' }}>NIKO</h1>
                <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>DIGITAL ARTIST • MANGAKA</p>
            </div>

            {/* Moodboard Grid */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}>

                {/* Bio Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '3rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    maxWidth: '800px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Heart size={24} color="#ff0080" /> About Me
                    </h3>
                    <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
                        Hi, I'm Niko. I create digital worlds and stories. My work is heavily influenced by 90s anime aesthetics and modern cyberpunk themes.
                        I believe in storytelling through atmosphere and detail. When I'm not drawing, I'm usually exploring virtual cities or reading obscure manga.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
