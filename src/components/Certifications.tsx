import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  badgeColor: string;
}

export const Certifications: React.FC = () => {
  const certs: Certification[] = [
    {
      title: 'Mastering Data Structures & Algorithms using C and C++',
      issuer: 'Udemy',
      badgeColor: '#A435F0' // Udemy Purple
    },
    {
      title: 'SQL Basics (Standard)',
      issuer: 'Skillrack',
      badgeColor: '#E94A47' // Skillrack Orange
    },
    {
      title: 'Python Programming Masterclass',
      issuer: 'Udemy',
      badgeColor: '#A435F0'
    },
    {
      title: 'C++ Spoken Tutorial',
      issuer: 'IIT Bombay',
      badgeColor: '#003366' // IIT Deep Navy
    },
    {
      title: 'C Spoken Tutorial',
      issuer: 'IIT Bombay',
      badgeColor: '#003366'
    }
  ];

  return (
    <section id="certifications" style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={styles.headerContainer}
      >
        <h2 style={styles.sectionTitle} className="gradient-text">Certifications</h2>
        <div style={styles.titleDivider} />
      </motion.div>

      <div style={styles.grid}>
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel"
            style={styles.card}
            whileHover={{ scale: 1.03 }}
          >
            <div style={styles.iconContainer}>
              <Award size={28} color="var(--accent-primary)" />
            </div>

            <div style={styles.content}>
              <span 
                style={{ 
                  ...styles.issuerBadge, 
                  backgroundColor: cert.badgeColor + '20', // Add opacity to hex
                  color: cert.badgeColor,
                  borderColor: cert.badgeColor + '40',
                }}
              >
                {cert.issuer}
              </span>
              <h3 style={styles.certTitle}>{cert.title}</h3>
            </div>

            <div style={styles.footer}>
              <div style={styles.status}>
                <ShieldCheck size={16} color="#10b981" style={{ marginRight: 6 }} />
                <span>Verified Credential</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: 'relative',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '3.5rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
  },
  titleDivider: {
    width: '60px',
    height: '4px',
    background: 'var(--accent-gradient)',
    borderRadius: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '220px',
    border: '1px solid var(--glass-border)',
    cursor: 'pointer',
  },
  iconContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--glass-border)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.2rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.6rem',
    flexGrow: 1,
  },
  issuerBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '0.2rem 0.6rem',
    borderRadius: '100px',
    border: '1px solid',
  },
  certTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    lineHeight: 1.4,
    margin: 0,
    color: 'var(--text-primary)',
  },
  footer: {
    marginTop: '1.5rem',
    paddingTop: '0.8rem',
    borderTop: '1px solid var(--glass-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
};
