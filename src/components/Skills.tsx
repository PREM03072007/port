import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Layout, Server, Database, Cloud, Terminal, Cpu 
} from 'lucide-react';
import { PipelineSimulator } from './PipelineSimulator';

export const Skills: React.FC = () => {
  const categories = [
    {
      id: 'languages',
      name: 'Programming',
      icon: <Code size={18} />,
      skills: [
        { name: 'Java', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'JavaScript', level: 80 },
        { name: 'C++', level: 75 },
        { name: 'C', level: 70 },
      ]
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: <Layout size={18} />,
      skills: [
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 85 },
        { name: 'React.js', level: 80 },
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: <Server size={18} />,
      skills: [
        { name: 'Spring Boot', level: 75 },
        { name: 'Node.js', level: 70 },
        { name: 'Express.js', level: 70 },
      ]
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: <Database size={18} />,
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 70 },
      ]
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      icon: <Cloud size={18} />,
      skills: [
        { name: 'Linux', level: 80 },
        { name: 'Docker', level: 80 },
        { name: 'Kubernetes', level: 70 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Jenkins', level: 70 },
        { name: 'CI/CD Pipelines', level: 75 },
        { name: 'AWS', level: 50, status: 'Learning' },
      ]
    },
    {
      id: 'core',
      name: 'Core CS',
      icon: <Cpu size={18} />,
      skills: [
        { name: 'Data Structures & Algorithms', level: 85 },
        { name: 'Object-Oriented Programming', level: 80 },
        { name: 'Database Management Systems', level: 80 },
        { name: 'Operating Systems', level: 75 },
        { name: 'Computer Networks', level: 75 },
      ]
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: <Terminal size={18} />,
      skills: [
        { name: 'Postman', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'IntelliJ IDEA', level: 80 },
        { name: 'Eclipse', level: 70 },
        { name: 'Excel / Canva / PowerPoint', level: 85 },
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState('languages');

  const currentCategory = categories.find(cat => cat.id === activeTab) || categories[0];
  const isLanguageTab = activeTab === 'languages';

  return (
    <section id="skills" style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={styles.headerContainer}
      >
        <h2 style={styles.sectionTitle} className="gradient-text">Technical Skills</h2>
        <div style={styles.titleDivider} />
      </motion.div>

      {/* Tabs list */}
      <div style={styles.tabsContainer} className="glass-panel">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === category.id 
                ? 'var(--accent-primary)' 
                : 'transparent',
              color: activeTab === category.id 
                ? '#ffffff' 
                : 'var(--text-secondary)',
              boxShadow: activeTab === category.id 
                ? '0 4px 15px rgba(6, 182, 212, 0.3)' 
                : 'none',
            }}
          >
            {category.icon}
            <span style={styles.tabName}>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Skills display grid */}
      <div style={styles.skillsGridWrapper}>
        <div style={styles.skillsGrid}>
          {currentCategory.skills.map((skill, index) => (
            <motion.div
              key={`${activeTab}-${skill.name}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel"
              style={isLanguageTab ? styles.circularSkillCard : styles.skillCard}
            >
              {isLanguageTab ? (
                <div style={styles.circularBody}>
                  <div style={styles.radialGauge}>
                    <svg width="70" height="70" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                      <path
                        style={styles.circleBg}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        style={styles.circle}
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${skill.level}, 100` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span style={styles.gaugeText}>{skill.level}%</span>
                  </div>
                  <span style={styles.circularSkillName}>{skill.name}</span>
                </div>
              ) : (
                <>
                  <div style={styles.skillInfo}>
                    <span style={styles.skillName}>
                      {skill.name}
                      {skill.status && (
                        <span style={styles.statusBadge}>{skill.status}</span>
                      )}
                    </span>
                    <span style={styles.skillLevel}>{skill.level}%</span>
                  </div>
                  <div style={styles.progressBarBg}>
                    <motion.div
                      style={styles.progressBarFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* DevOps Pipeline Simulator Injection */}
        {activeTab === 'devops' && (
          <PipelineSimulator />
        )}
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
  tabsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0.6rem',
    justifyContent: 'center',
    marginBottom: '2.5rem',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-title)',
    transition: 'var(--transition-smooth)',
  },
  tabName: {
    display: 'inline-block',
  },
  skillsGridWrapper: {
    minHeight: '260px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  skillCard: {
    padding: '1.2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  circularSkillCard: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '160px',
  },
  circularBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
  },
  radialGauge: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  gaugeText: {
    position: 'absolute',
    fontSize: '0.85rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  circularSkillName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  skillInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
  },
  skillName: {
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusBadge: {
    fontSize: '0.7rem',
    fontWeight: 500,
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--accent-primary)',
    padding: '0.1rem 0.4rem',
    borderRadius: '4px',
    border: '1px solid var(--glass-border)',
  },
  skillLevel: {
    fontSize: '0.9rem',
    color: 'var(--accent-primary)',
  },
  progressBarBg: {
    height: '6px',
    width: '100%',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '100px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'var(--accent-gradient)',
    borderRadius: '100px',
  },
};

// Add CSS media query simulation for skills tabs
const skillsStyleSheet = document.createElement("style");
skillsStyleSheet.innerText = `
  @media (max-width: 600px) {
    #skills button span {
      display: none !important;
    }
    #skills button {
      padding: 0.8rem !important;
    }
  }
`;
document.head.appendChild(skillsStyleSheet);
