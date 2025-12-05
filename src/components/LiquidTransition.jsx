import { motion } from 'framer-motion';

const curve = {
    initial: {
        d: "M0 0 L100 0 L100 100 L0 100",
    },
    enter: {
        d: "M0 0 L100 0 L100 100 L0 100",
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        d: "M0 0 L100 0 L100 100 L0 100",
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    }
}

const slide = {
    initial: {
        top: "-100vh"
    },
    enter: {
        top: "100vh",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        top: "-100vh",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    }
}

export default function LiquidTransition({ children }) {
    return (
        <div className="liquid-transition">
            <motion.div {...slide} className="slide" />
            {children}
        </div>
    )
}
