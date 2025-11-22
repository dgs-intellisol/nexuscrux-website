import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NexusCruxLogo } from './NexusCruxLogo';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#0A1A2F]/98 backdrop-blur-md border-b border-[#2AD1C8]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <NexusCruxLogo variant="inverse" size="sm" className="transition-transform duration-200 group-hover:scale-105" />
            <span className="text-white tracking-tight text-lg">Nexus Crux</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/platform"
              className={`text-sm transition-colors ${
                isActive('/platform') ? 'text-[#A6F750]' : 'text-white/80 hover:text-white'
              }`}
            >
              Platform
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-[#0A1A2F] border border-[#2AD1C8]/20 rounded-lg shadow-xl p-2 min-w-[200px]">
                  <Link
                    to="/solutions/brands"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-[#2AD1C8]/10 rounded transition-colors"
                  >
                    For Tenant Brands
                  </Link>
                  <Link
                    to="/solutions/contractors"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-[#2AD1C8]/10 rounded transition-colors"
                  >
                    For Contractors
                  </Link>
                  <Link
                    to="/solutions/enterprise"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-[#2AD1C8]/10 rounded transition-colors"
                  >
                    For Enterprises
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/reclova"
              className={`text-sm transition-colors ${
                isActive('/reclova') ? 'text-[#A6F750]' : 'text-white/80 hover:text-white'
              }`}
            >
              ReClova™
            </Link>
            <Link
              to="/features"
              className={`text-sm transition-colors ${
                isActive('/features') ? 'text-[#A6F750]' : 'text-white/80 hover:text-white'
              }`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`text-sm transition-colors ${
                isActive('/pricing') ? 'text-[#A6F750]' : 'text-white/80 hover:text-white'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/documentation"
              className={`text-sm transition-colors ${
                isActive('/documentation') ? 'text-[#A6F750]' : 'text-white/80 hover:text-white'
              }`}
            >
              Docs
            </Link>
            <Link
              to="/about"
              className={`text-sm transition-colors ${
                isActive('/about') ? 'text-[#A6F750]' : 'text-white/80 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1A2F] border-t border-[#2AD1C8]/20"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/platform"
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Platform
              </Link>
              
              <div>
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className="flex items-center gap-1 text-white/80 hover:text-white transition-colors w-full"
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {solutionsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/solutions/brands"
                      className="block text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      For Tenant Brands
                    </Link>
                    <Link
                      to="/solutions/contractors"
                      className="block text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      For Contractors
                    </Link>
                    <Link
                      to="/solutions/enterprise"
                      className="block text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      For Enterprises
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/reclova"
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ReClova™
              </Link>
              <Link
                to="/features"
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/documentation"
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                to="/about"
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}