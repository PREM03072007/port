import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, CheckCircle, TrendingUp } from 'lucide-react';
import { GitHubHeatmap } from './GitHubHeatmap';

export const About: React.FC = () => {
  const stats = [
    {
      title: 'LeetCode Profile',
      subtitle: 'Competitive Programming',
      value: '200+',
      label: 'Problems Solved',
      desc: 'Focused on Data Structures & Algorithms',
      link: 'https://leetcode.com/u/prem_2007/',
      icon: <Code size={24} color="var(--accent-primary)" />
    },
    {
      title: 'Skillrack Profile',
      subtitle: 'Daily Challenges',
      value: '1050+',
      label: 'Problems Solved',
      desc: 'Earned 14+ verified certificates',
      link: 'https://www.skillrack.com/', // general profile link, or mock as requested
      icon: <Award size={24} color="#f59e0b" />
    }
  ];

  return (
    <section id="about" style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={styles.headerContainer}
      >
        <h2 style={styles.sectionTitle} className="gradient-text">About Me</h2>
        <div style={styles.titleDivider} />
      </motion.div>

      <div style={styles.gridContainer}>
        {/* Biography Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.bioColumn}
        >
          <h3 style={styles.bioHeading}>Driven by curiosity, fueled by code.</h3>
          <p style={styles.paragraph}>
            I am a passionate and highly motivated Computer Science Engineering student with a strong 
            interest in <strong>Software Development, Full Stack Development, DevOps, Artificial 
            Intelligence, and Cloud Computing</strong>.
          </p>
          <p style={styles.paragraph}>
            I enjoy building innovative solutions, automating workflows, and developing scalable systems 
            that solve real-world problems. Through hands-on projects and continuous learning, I have 
            gained practical experience in web development, backend technologies, databases, containerization, 
            and cloud-native tools.
          </p>
          <p style={styles.paragraph}>
            My journey in programming and competitive coding has strengthened my analytical thinking, 
            problem-solving abilities, and software engineering fundamentals. I continuously strive 
            to learn emerging technologies and contribute effectively to impactful projects.
          </p>
          <div style={styles.seekingBadge}>
            <CheckCircle size={18} color="var(--accent-primary)" style={{ marginRight: 8 }} />
            <span>Actively seeking opportunities in Software Dev, Full Stack, DevOps, AI, and Cloud.</span>
          </div>
        </motion.div>

        {/* Stats Column */}
        <div style={styles.statsColumn}>
          {stats.map((stat, index) => (
            <motion.a
              href={stat.link}
              target="_blank"
              rel="noreferrer"
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass-panel"
              style={styles.statCard}
            >
              <div style={styles.statHeader}>
                <div>
                  <h4 style={styles.statTitle}>{stat.title}</h4>
                  <span style={styles.statSubtitle}>{stat.subtitle}</span>
                </div>
                <div style={styles.iconWrapper}>{stat.icon}</div>
              </div>

              <div style={styles.statBody}>
                <div style={styles.counterContainer}>
                  <div style={styles.number} className="gradient-text">{stat.value}</div>
                  <div style={styles.label}>{stat.label}</div>
                </div>
                <div style={styles.radialGauge}>
                  {/* Styled circle indicator */}
                  <svg width="60" height="60" viewBox="0 0 36 36" style={styles.svg}>
                    <path
                      style={styles.circleBg}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      style={styles.circle}
                      strokeDasharray={index === 0 ? "75, 100" : "85, 100"}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span style={styles.gaugeText}>{index === 0 ? "75%" : "85%"}</span>
                </div>
              </div>

              <p style={styles.desc}>{stat.desc}</p>
            </motion.a>
          ))}
          
          {/* Quick Stats banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel"
            style={styles.miniStats}
          >
            <div style={styles.miniStatItem}>
              <TrendingUp size={20} color="var(--accent-primary)" />
              <div>
                <span style={styles.miniValue}>7.5</span>
                <span style={styles.miniLabel}>Current CGPA</span>
              </div>
            </div>
            <div style={styles.miniStatItem}>
              <Award size={20} color="#10b981" />
              <div>
                <span style={styles.miniValue}>14+</span>
                <span style={styles.miniLabel}>Skillrack Certs</span>
              </div>
            </div>
          </motion.div>

          {/* GitHub Heatmap Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ width: '100%' }}
          >
            <GitHubHeatmap />
          </motion.div>
        </div>
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
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '4rem',
    alignItems: 'center',
  },
  bioColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  bioHeading: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  paragraph: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
  },
  seekingBadge: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem 1.2rem',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginTop: '0.8rem',
  },
  statsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  statCard: {
    display: 'block',
    padding: '1.5rem',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  statTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: 0,
  },
  statSubtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  iconWrapper: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-tertiary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid var(--glass-border)',
  },
  statBody: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.8rem',
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  number: {
    fontSize: '2.4rem',
    fontWeight: 800,
    lineHeight: 1,
  },
  label: {
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    fontWeight: 600,
    marginTop: '0.2rem',
  },
  radialGauge: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    transform: 'rotate(-90deg)',
  },
  circleBg: {
    fill: 'none',
    stroke: 'var(--bg-tertiary)',
    strokeWidth: 2.8,
  },
  circle: {
    fill: 'none',
    stroke: 'var(--accent-primary)',
    strokeWidth: 2.8,
    strokeLinecap: 'round',
    transition: 'stroke-dasharray 1s ease-in-out',
  },
  gaugeText: {
    position: 'absolute',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  desc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  miniStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '1.2rem',
    gap: '1rem',
  },
  miniStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  miniValue: {
    display: 'block',
    fontSize: '1.3rem',
    fontWeight: 700,
    lineHeight: 1.1,
  },
  miniLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
};

// Add CSS media query simulation for about grid
const aboutStyleSheet = document.createElement("style");
aboutStyleSheet.innerText = `
  @media (max-width: 900px) {
    #about > div {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
    }
  }
`;
document.head.appendChild(aboutStyleSheet);
