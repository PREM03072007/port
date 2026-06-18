import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const logs = [
    'Initializing Developer Portfolio...',
    'Loading styling tokens & assets...',
    'Establishing contact gateway...',
    'Starting DevOps environments...',
    'Running health checks... [OK]',
    'Port 3000 online.',
    'Prem M Portfolio ready.'
  ];

  useEffect(() => {
    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // Wait 500ms before finishing
          return 100;
        }
        const step = Math.floor(Math.random() * 10) + 5;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    // Terminal lines trigger
    const lineIndex = Math.min(
      logs.length - 1,
      Math.floor((progress / 100) * logs.length)
    );

    if (terminalLines.length <= lineIndex) {
      setTerminalLines(logs.slice(0, lineIndex + 1));
    }
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        className="loader-wrapper"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={styles.container}
      >
        <div className="glass-panel" style={styles.terminalContainer}>
          <div style={styles.terminalHeader}>
            <span style={{ ...styles.dot, backgroundColor: '#ff5f56' }} />
            <span style={{ ...styles.dot, backgroundColor: '#ffbd2e' }} />
            <span style={{ ...styles.dot, backgroundColor: '#27c93f' }} />
            <span style={styles.terminalTitle}>bash - prem_portfolio</span>
          </div>

          <div style={styles.terminalContent}>
            {terminalLines.map((line, idx) => (
              <div key={idx} style={styles.line}>
                <span style={styles.prompt}>$</span> {line}
              </div>
            ))}
            {progress < 100 && (
              <div style={styles.loadingLine}>
                <span style={styles.prompt}>$</span> Loading... {progress}%
                <span className="cursor" style={styles.cursor}>_</span>
              </div>
            )}
          </div>

          <div style={styles.progressBarContainer}>
            <motion.div
              style={styles.progressBar}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#030712',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '1.5rem',
  },
  terminalContainer: {
    width: '100%',
    maxWidth: '550px',
    padding: '0',
    overflow: 'hidden',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
  },
  terminalHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem 1rem',
    background: 'rgba(3, 7, 18, 0.8)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '6px',
    display: 'inline-block',
  },
  terminalTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '0.8rem',
    color: '#64748b',
    fontFamily: "'Courier New', Courier, monospace",
  },
  terminalContent: {
    padding: '1.5rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.9rem',
    color: '#06b6d4',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    backgroundColor: 'rgba(3, 7, 18, 0.3)',
  },
  line: {
    color: '#f8fafc',
  },
  loadingLine: {
    color: '#06b6d4',
    fontWeight: 'bold',
  },
  prompt: {
    color: '#3b82f6',
    marginRight: '0.5rem',
  },
  cursor: {
    animation: 'blink 1s infinite',
    color: '#06b6d4',
  },
  progressBarContainer: {
    height: '4px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
  },
};
