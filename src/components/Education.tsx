import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, Star } from 'lucide-react';

export const Education: React.FC = () => {
  const educationTimeline = [
    {
      college: 'Sri Eshwar College of Engineering',
      degree: 'B.Tech - Information Technology',
      cgpa: '7.5',
      duration: '2024 - 2028',
      details: 'Focusing on core software engineering principles, containerization, databases, network architecture, and full-stack development frameworks.'
    }
  ];

  const targetRoles = [
    'Software Development',
    'Full Stack Development',
    'DevOps Engineering',
    'AI Engineering',
    'Cloud Computing'
  ];

  return (
    <section id="education" style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={styles.headerContainer}
      >
        <h2 style={styles.sectionTitle} className="gradient-text">Education & Career</h2>
        <div style={styles.titleDivider} />
      </motion.div>

      <div style={styles.grid}>
        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={styles.timelineColumn}
        >
          <div style={styles.columnHeader}>
            <GraduationCap size={24} color="var(--accent-primary)" style={{ marginRight: 10 }} />
            <h3 style={styles.columnTitle}>Education Timeline</h3>
          </div>

          <div style={styles.timeline}>
            {educationTimeline.map((item, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineMarker}>
                  <div style={styles.timelineDot} />
                  <div style={styles.timelineLine} />
                </div>
                
                <div className="glass-panel" style={styles.timelineCard}>
                  <div style={styles.cardHeader}>
                    <h4 style={styles.collegeName}>{item.college}</h4>
                    <span style={styles.dateBadge}>
                      <Calendar size={12} style={{ marginRight: 4 }} /> {item.duration}
                    </span>
                  </div>
                  <h5 style={styles.degreeName}>{item.degree}</h5>
                  <div style={styles.cgpaWrapper}>
                    <Star size={16} color="#f59e0b" fill="#f59e0b" style={{ marginRight: 6 }} />
                    <span style={styles.cgpaText}>CGPA: <strong>{item.cgpa}</strong> / 10.0</span>
                  </div>
                  <p style={styles.detailsText}>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience & Placement Banner */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.experienceColumn}
        >
          <div style={styles.columnHeader}>
            <Briefcase size={24} color="var(--accent-primary)" style={{ marginRight: 10 }} />
            <h3 style={styles.columnTitle}>Career Status</h3>
          </div>

          <div className="glass-panel" style={styles.hiringCard}>
            <div style={styles.hiringHeader}>
              <span style={styles.availablePulse} />
              <h4 style={styles.hiringTitle}>Open to Internships & Placements</h4>
            </div>

            <p style={styles.hiringText}>
              I am actively preparing for professional opportunities. If you are a recruiter 
              seeking a self-driven, detail-oriented engineering student with strong hands-on skills in 
              modern web dev, automation, and DevOps deployments, let's connect!
            </p>

            <div style={styles.rolesSection}>
              <h5 style={styles.rolesTitle}>Target Fields:</h5>
              <div style={styles.rolesContainer}>
                {targetRoles.map((role) => (
                  <span key={role} style={styles.roleTag}>
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <a href="#contact" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
              Connect for Opportunities
            </a>
          </div>
        </motion.div>
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
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '3rem',
    alignItems: 'start',
  },
  timelineColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  columnTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    margin: 0,
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
  },
  timelineItem: {
    display: 'flex',
    gap: '1.5rem',
  },
  timelineMarker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timelineDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-primary)',
    boxShadow: '0 0 10px var(--accent-primary)',
    zIndex: 2,
  },
  timelineLine: {
    width: '2px',
    flexGrow: 1,
    backgroundColor: 'var(--glass-border)',
    marginTop: '4px',
    minHeight: '150px',
  },
  timelineCard: {
    padding: '1.8rem',
    flexGrow: 1,
    marginBottom: '1rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  collegeName: {
    fontSize: '1.15rem',
    fontWeight: 700,
    margin: 0,
  },
  dateBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: 'var(--accent-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.2rem 0.6rem',
    borderRadius: '100px',
    border: '1px solid var(--glass-border)',
    fontWeight: 600,
  },
  degreeName: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    marginTop: '0.3rem',
    marginBottom: '0.8rem',
  },
  cgpaWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    marginBottom: '0.8rem',
  },
  cgpaText: {
    fontSize: '0.9rem',
  },
  detailsText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  experienceColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  hiringCard: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  hiringHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  availablePulse: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 10px #10b981',
  },
  hiringTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: 0,
  },
  hiringText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  rolesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  rolesTitle: {
    fontSize: '0.9rem',
    fontWeight: 700,
    margin: 0,
  },
  rolesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  roleTag: {
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.3rem 0.8rem',
    borderRadius: '100px',
    border: '1px solid var(--glass-border)',
  },
};

// Add CSS media query simulation for education grid
const eduMediaStyle = document.createElement("style");
eduMediaStyle.innerText = `
  @media (max-width: 900px) {
    #education > div {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
    }
  }
`;
document.head.appendChild(eduMediaStyle);
