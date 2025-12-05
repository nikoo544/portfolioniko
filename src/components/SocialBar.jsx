import { Instagram, Twitter, Mail, Globe } from 'lucide-react';
import './SocialBar.css';

export default function SocialBar() {
    return (
        <div className="social-bar">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <Instagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <Twitter size={24} />
            </a>
            <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="ArtStation">
                <Globe size={24} />
            </a>
            <a href="mailto:contact@example.com" className="social-link" aria-label="Email">
                <Mail size={24} />
            </a>
        </div>
    );
}
