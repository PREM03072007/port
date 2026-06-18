import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';

interface AccentColor {
  id: string;
  name: string;
  primary: string;
  gradient: string;
  glow: string;
}

export const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccent, setActiveAccent] = useState('cyan');

  const accents: AccentColor[] = [
    {
      id: 'cyan',
      name: 'Cyber Cyan',
      primary: '#06b6d4',
      gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
      glow: '0 0 20px rgba(6, 182, 212, 0.25)',
    },
    {
      id: 'purple',
      name: 'Neon Purple',
      primary: '#a855f7',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      glow: '0 0 20px rgba(168, 85, 247, 0.25)',
    },
    {
      id: 'emerald',
      name: 'DevOps Emerald',
      primary: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      glow: '0 0 20px rgba(16, 185, 129, 0.25)',
    },
    {
      id: 'gold',
      name: 'Amber Gold',
      primary: '#c5a059',
      gradient: 'linear-gradient(135deg, #c5a059 0%, #906e2f 100%)',
      glow: '0 0 20px rgba(197, 160, 89, 0.2)',
    },
    {
      id: 'crimson',
      name: 'Crimson Red',
      primary: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      glow: '0 0 20px rgba(239, 68, 68, 0.25)',
    },
  ];

  const changeAccent = (accentId: string) => {
    const selected = accents.find((a) => a.id === accentId);
    if (!selected) return;

    setActiveAccent(accentId);
    const root = document.documentElement;
    
    // Set root style custom properties
    root.style.setProperty('--accent-primary', selected.primary);
    root.style.setProperty('--accent-gradient', selected.gradient);
    root.style.setProperty('--accent-gradient-text', selected.gradient);
    root.style.setProperty('--glow-effect', selected.glow);
    
    // Custom overrides if light mode is selected
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'light') {
      root.style.setProperty('--glass-border', `rgba(${hexToRgb(selected.primary)}, 0.25)`);
      root.style.setProperty('--glass-shadow', `0 6px 18px rgba(${hexToRgb(selected.primary)}, 0.04)`);
    } else {
      root.style.setProperty('--glass-border', `rgba(${hexToRgb(selected.primary)}, 0.15)`);
    }
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string): string => {
    let c = hex.substring(1);
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const num = parseInt(c, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  };

  return (
    <div style={styles.wrapper}>
      {/* Floating Gear Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.floatingBtn}
        className="glass-panel"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Customize Theme"
      >
        <motion.div
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Settings size={20} color="var(--accent-primary)" />
        </motion.div>
      </motion.button>

      {/* Customize Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            transition={{ duration: 0.25 }}
            className="glass-panel"
            style={styles.panel}
          >
            <div style={styles.panelHeader}>
              <h4 style={styles.panelTitle}>Accent Customizer</h4>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                <X size={16} />
              </button>
            </div>
            
            <p style={styles.panelText}>Choose a primary accent for buttons, dials, icons, and glows.</p>

            <div style={styles.colorsGrid}>
              {accents.map((accent) => (
                <button
                  key={accent.id}
                  onClick={() => changeAccent(accent.id)}
                  style={{
                    ...styles.colorBubble,
                    backgroundColor: accent.primary,
                    borderColor: activeAccent === accent.id 
                      ? 'var(--text-primary)' 
                      : 'transparent',
                    boxShadow: activeAccent === accent.id 
                      ? '0 0 10px rgba(0,0,0,0.3)' 
                      : 'none',
                  }}
                  title={accent.name}
                  aria-label={accent.name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'fixed',
    top: '30%',
    right: '1.5rem',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.8rem',
  },
  floatingBtn: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: 'var(--glass-shadow)',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
  },
  panel: {
    width: '200px',
    padding: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    boxShadow: 'var(--glass-shadow)',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: '0.85rem',
    fontWeight: 800,
    margin: 0,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  panelText: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 1.4,
  },
  colorsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.4rem',
  },
  colorBubble: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    border: '2px solid',
    cursor: 'pointer',
    outline: 'none',
    transition: 'var(--transition-smooth)',
  },
};
