import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Mail, Youtube, Instagram } from 'lucide-react';
import { NexusCruxLogo } from './NexusCruxLogo';
import { TikTokIcon } from './icons/TikTokIcon';
import { socialMediaLinks } from '../config/socialMedia';

export function Footer() {
  return (
    <footer className="bg-[#0A1A2F] text-white border-t border-[#2AD1C8]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <NexusCruxLogo variant="inverse" size="sm" />
              <span className="tracking-tight text-lg">Nexus Crux</span>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Where Connections Become Capability.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Powered by</span>
              <span className="text-xs text-[#A6F750] font-semibold">ReClova™</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/platform" className="text-sm text-white/60 hover:text-white transition-colors">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-white/60 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/reclova" className="text-sm text-white/60 hover:text-white transition-colors">
                  ReClova™
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/solutions/brands" className="text-sm text-white/60 hover:text-white transition-colors">
                  For Tenant Brands
                </Link>
              </li>
              <li>
                <Link to="/solutions/contractors" className="text-sm text-white/60 hover:text-white transition-colors">
                  For Contractors
                </Link>
              </li>
              <li>
                <Link to="/solutions/enterprise" className="text-sm text-white/60 hover:text-white transition-colors">
                  For Enterprises
                </Link>
              </li>
              <li>
                <Link to="/drivers" className="text-sm text-white/60 hover:text-white transition-colors">
                  Driver Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-white/60 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/gdpr" className="text-sm text-white/60 hover:text-white transition-colors">
              GDPR
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={socialMediaLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href={socialMediaLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href={socialMediaLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${socialMediaLinks.email}`}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href={socialMediaLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href={socialMediaLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href={socialMediaLinks.tiktok} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-white/40">
            © 2025 Nexus Crux Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}