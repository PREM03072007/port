import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Code2, ChevronDown } from 'lucide-react';
import avatarImg from '../assets/developer_avatar.png';
import { TerminalWidget } from './TerminalWidget';
import { RecruiterHub } from './RecruiterHub';

interface HeroProps {
  toggleTheme?: () => void;
}

const GithubIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Hero: React.FC<HeroProps> = ({ toggleTheme }) => {
  const titles = [
    'DevOps Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
    'Kubernetes Learner',
    'Cloud Enthusiast'
  ];

  const [currentText, setCurrentText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const fullText = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }
      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);



  return (
    <section id="home" style={styles.heroSection}>
      <div style={styles.containerGrid}>
        
        {/* Left Info Column */}
        <motion.div 
          style={styles.infoColumn}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div style={styles.badge}>
            <span style={styles.badgePulse} />
            Available for Internships & Opportunities
          </div>
          
          <h1 style={styles.greeting}>Hi, I am</h1>
          <h2 style={styles.name} className="gradient-text">Prem M</h2>
          
          <div style={styles.typingContainer}>
            <span style={styles.titlePrefix}>Aspiring </span>
            <span style={styles.typingText}>{currentText}</span>
            <span style={styles.cursor}>|</span>
          </div>

          <p style={styles.summary}>
            Passionate Computer Science Engineering student with expertise in software development, 
            full stack development, DevOps, and cloud-native technologies. Experienced in building 
            scalable applications, AI-powered solutions, and containerized deployments using modern 
            tools and frameworks. Enthusiastic about solving real-world problems through technology 
            and continuous learning.
          </p>

          {/* CTA Buttons */}
          <div style={styles.ctaContainer}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))} className="btn-primary">
              View Resume
            </button>
            <a href="#projects" className="btn-secondary">
              View Projects
            </a>
            <a href="#contact" style={styles.contactLink} className="gradient-text">
              Contact Me <ExternalLink size={14} style={{ marginLeft: 4 }} />
            </a>
          </div>

          {/* Social Icons */}
          <div style={styles.socials}>
            <a 
              href="https://github.com/PREM03072007" 
              target="_blank" 
              rel="noreferrer" 
              style={styles.socialIcon}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <GithubIcon size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/in/prem-m-109134333/" 
              target="_blank" 
              rel="noreferrer" 
              style={styles.socialIcon}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <LinkedinIcon size={22} />
            </a>
            <a 
              href="https://leetcode.com/u/prem_2007/" 
              target="_blank" 
              rel="noreferrer" 
              style={styles.socialIcon}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Code2 size={22} />
            </a>
            <a 
              href="mailto:premprem2702@gmail.com" 
              style={styles.socialIcon}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        {/* Right Illustration Column */}
        <motion.div 
          style={styles.imageColumn}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div style={styles.imageFrame} className="glass-panel">
            <img 
              src={avatarImg} 
              alt="Prem M - Developer Illustration" 
              style={styles.avatar} 
            />
            {/* Floating Tags */}
            <motion.div 
              style={{ ...styles.floatingBadge, top: '10%', left: '-5%' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              🐳 Docker
            </motion.div>
            <motion.div 
              style={{ ...styles.floatingBadge, bottom: '15%', right: '-5%' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
            >
              ☸️ Kubernetes
            </motion.div>
            <motion.div 
              style={{ ...styles.floatingBadge, top: '50%', left: '-15%' }}
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.2 }}
            >
              ⚛️ React
            </motion.div>
            <motion.div 
              style={{ ...styles.floatingBadge, top: '70%', right: '-10%' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              ☁️ Cloud
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* DevOps Sandbox and Recruiter Dashboard Row */}
      <motion.div 
        style={styles.dashboardRow}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        <TerminalWidget toggleTheme={toggleTheme} />
        <RecruiterHub />
      </motion.div>

      {/* Scroll Down Bouncing Arrow Indicator */}
      <motion.div
        style={styles.scrollDownIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={styles.scrollDownContent}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          <span style={styles.scrollText}>SCROLL DOWN</span>
          <ChevronDown size={18} color="var(--accent-primary)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '8rem',
    paddingBottom: '3rem',
  },
  containerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '3rem',
    alignItems: 'center',
    width: '100%',
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.2rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 1rem',
    borderRadius: '100px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--glass-border)',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  badgePulse: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 8px #10b981',
    animation: 'pulse-glow 1.5s infinite',
  },
  greeting: {
    fontSize: '1.2rem',
    fontWeight: 500,
    color: 'var(--accent-primary)',
    fontFamily: 'var(--font-title)',
    marginBottom: '0',
  },
  name: {
    fontSize: '3.8rem',
    fontWeight: 800,
    lineHeight: 1.1,
    margin: '0',
  },
  typingContainer: {
    fontSize: '1.8rem',
    fontWeight: 600,
    fontFamily: 'var(--font-title)',
    minHeight: '45px',
    display: 'flex',
    alignItems: 'center',
  },
  titlePrefix: {
    color: 'var(--text-primary)',
  },
  typingText: {
    color: 'var(--accent-primary)',
    marginLeft: '0.5rem',
  },
  cursor: {
    color: 'var(--accent-primary)',
    animation: 'blink 0.8s infinite',
    fontWeight: 300,
  },
  summary: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    lineHeight: 1.7,
  },
  ctaContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.2rem',
    marginTop: '1rem',
  },
  contactLink: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '1rem',
  },
  socials: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  socialIcon: {
    color: 'var(--text-secondary)',
    transition: 'var(--transition-smooth)',
    cursor: 'pointer',
  },
  imageColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFrame: {
    position: 'relative',
    width: '340px',
    height: '400px',
    borderRadius: '16px',
    padding: '8px',
    background: 'var(--glass-bg)',
    boxShadow: 'var(--glow-effect), 0 10px 40px var(--glass-shadow)',
    border: '2px solid var(--glass-border)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '12px',
  },
  floatingBadge: {
    position: 'absolute',
    padding: '0.4rem 0.8rem',
    borderRadius: '100px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--glass-border)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  dashboardRow: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '2.5rem',
    marginTop: '4rem',
    width: '100%',
    alignItems: 'start',
  },
  scrollDownIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3.5rem',
    width: '100%',
  },
  scrollDownContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'var(--transition-smooth)',
  },
  scrollText: {
    fontFamily: 'var(--font-title)',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '2px',
    color: 'var(--text-secondary)',
  },
};

// Add CSS media query simulation for hero grid and dashboard row
const heroStyleSheet = document.createElement("style");
heroStyleSheet.innerText = `
  @media (max-width: 900px) {
    #home > div {
      grid-template-columns: 1fr !important;
      text-align: center;
      gap: 3rem !important;
    }
    #home div {
      align-items: center !important;
      justify-content: center !important;
    }
    #home h2 {
      font-size: 2.8rem !important;
    }
    #home .typingContainer {
      font-size: 1.4rem !important;
    }
    #home .dashboardRow {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
      margin-top: 3rem !important;
    }
  }
`;
document.head.appendChild(heroStyleSheet);
