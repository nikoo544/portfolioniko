import { Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import arrowIcon from '../assets/up-arrow.svg';
import './SocialBar.css';

export default function SocialBar() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="social-bar">
            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="social-link"
                aria-label="Scroll to top"
                style={{ cursor: 'pointer', border: 'none' }} // Ensure button looks like the links
            >
                <img src={arrowIcon} alt="Scroll to top" style={{ width: '24px', height: '24px' }} />
            </button>

            {/* Instagram Link */}
            <a href="https://instagram.com/elrohann" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <Instagram size={24} />
            </a>
        </div>
    );
}
