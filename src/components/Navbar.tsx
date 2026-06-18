import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Header background switch
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200; // Offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      ...styles.header,
      backgroundColor: scrolled 
        ? 'var(--glass-bg)' 
        : 'transparent',
      borderBottom: scrolled 
        ? '1px solid var(--glass-border)' 
        : '1px solid transparent',
      boxShadow: scrolled 
        ? 'var(--glass-shadow)' 
        : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <div style={styles.navContainer}>
        {/* Logo */}
        <a href="#home" style={styles.logo}>
          <span className="gradient-text">Prem</span> M
        </a>

        {/* Desktop Links */}
        <nav style={styles.desktopNav}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.name} 
                href={link.href} 
                style={{
                  ...styles.navLink,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={styles.activeIndicator}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions (Toggle Theme + Mobile Menu Button) */}
        <div style={styles.actions}>
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
            style={styles.resumeNavBtn}
            className="resume-nav-btn"
            whileHover={{ scale: 1.05, backgroundColor: 'var(--bg-tertiary)' }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.button>

          <motion.button 
            onClick={toggleTheme} 
            style={styles.themeToggle}
            aria-label="Toggle Theme"
            whileHover={{ scale: 1.1, backgroundColor: 'var(--bg-tertiary)' }}
            whileTap={{ scale: 0.9, rotate: 180 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {theme === 'dark' ? (
                  <Sun size={20} color="var(--accent-primary)" />
                ) : (
                  <Moon size={20} color="var(--accent-primary)" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            style={styles.mobileMenuBtn}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.mobileNav}
          >
            <div style={styles.mobileNavLinks}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      ...styles.mobileNavLink,
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)'
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('open-resume'));
                }}
                style={{
                  ...styles.mobileNavLink,
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  textAlign: 'left',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                View Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    transition: 'var(--transition-smooth)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.2rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'var(--font-title)',
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  },
  desktopNav: {
    display: 'flex',
    gap: '2.2rem',
    alignItems: 'center',
  },
  navLink: {
    position: 'relative',
    fontFamily: 'var(--font-title)',
    fontSize: '0.95rem',
    padding: '0.4rem 0',
    cursor: 'pointer',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2.5px',
    borderRadius: '100px',
    background: 'var(--accent-gradient)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  themeToggle: {
    background: 'transparent',
    border: '1px solid var(--glass-border)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    overflow: 'hidden',
  },
  resumeNavBtn: {
    padding: '0.4rem 1rem',
    borderRadius: '100px',
    border: '1px solid var(--accent-primary)',
    background: 'transparent',
    color: 'var(--accent-primary)',
    fontFamily: 'var(--font-title)',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  mobileNav: {
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--glass-border)',
    overflow: 'hidden',
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 2rem',
    gap: '1.2rem',
  },
  mobileNavLink: {
    fontFamily: 'var(--font-title)',
    fontSize: '1.1rem',
    fontWeight: 600,
  },
};

// Add CSS media query simulation for mobile menu button toggle
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 768px) {
    header nav {
      display: none !important;
    }
    header button[aria-label="Menu"] {
      display: flex !important;
    }
    .resume-nav-btn {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);
