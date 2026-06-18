import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Info, Search, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  category: 'fullstack' | 'devops' | 'aipython';
  tech: string[];
  description: string;
  features: string[];
  github?: string;
  demo?: string;
  challenges?: string;
}

const GithubIcon = ({ size = 18, style }: { size?: number, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const Projects: React.FC = () => {
  const projectsData: Project[] = [
    {
      title: 'Smart Attendance Monitoring System',
      category: 'aipython',
      tech: ['Python', 'OpenCV', 'Deep Learning', 'Pandas', 'OpenPyXL', 'Twilio API', 'Excel'],
      description: 'An AI-powered attendance system that automates attendance tracking using facial recognition technology. The system records attendance automatically, generates reports, and sends notifications.',
      features: [
        'Real-time face recognition and matches',
        'Automated attendance Excel logging',
        'Direct automated reports generation',
        'Instant SMS alerts using Twilio API',
        'Proxy attendance prevention & alerts'
      ],
      challenges: 'Optimizing facial recognition frames on low-resource machines. Solved by scaling down frames during detection and implementing a threaded pipeline to process detection and SMS notifications asynchronously.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'Medical Store Management System',
      category: 'fullstack',
      tech: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Git', 'GitHub'],
      description: 'Developed a pharmacy management system to manage medicines, inventory, billing, and customer records efficiently.',
      features: [
        'Interactive inventory tracking & search',
        'Low-stock and expiry notifications',
        'Real-time billing & invoice calculation',
        'Customer database management',
        'Secure admin credentials system'
      ],
      challenges: 'Handling real-time transaction updates in inventory without database locking. Solved by setting up proper indexing and using transactions inside MySQL queries.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'Price Tracker',
      category: 'fullstack',
      tech: ['HTML', 'CSS', 'JavaScript', 'Spring Boot', 'MySQL', 'Postman'],
      description: 'Built a web application that monitors product prices and tracks historical price changes to help users purchase products at the best price.',
      features: [
        'Scheduled background scraping triggers',
        'Historical price graph rendering APIs',
        'Email notification drop alerts',
        'Product search & custom tracking dashboard',
        'Robust REST APIs verified via Postman'
      ],
      challenges: 'Bypassing bot-detection when scraping product pages. Solved by setting custom user-agents and throttling request rates inside the Java backend scheduler.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'AI Tutor / Chatbot Platform',
      category: 'aipython',
      tech: ['React.js', 'JavaScript', 'AI APIs', 'Spring Boot'],
      description: 'Developed an AI-powered learning platform that provides tutoring and chatbot-based assistance with real-time responses.',
      features: [
        'Chatbot answering general engineering queries',
        'Personalized study plans recommendations',
        'Dynamic React markdown rendering outputs',
        'Secure Spring Boot API tokens gateway',
        'Low-latency streaming responses UI'
      ],
      challenges: 'Managing token limits and context memory in the chatbot. Solved by implementing a summarizing window algorithm in the Java middleware before shipping payloads to AI APIs.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'Kubernetes WordPress Deployment',
      category: 'devops',
      tech: ['Kubernetes', 'Docker', 'MySQL'],
      description: 'Deployed WordPress and MySQL applications using Kubernetes Deployments, Services, and Persistent Volumes.',
      features: [
        'Scalable container deployments setup',
        'Persistent Volume Claims (PVC) bindings',
        'K8s service selector routing network',
        'Secure environment credentials bindings'
      ],
      challenges: 'Ensuring database files persisted when K8s nodes restarted. Solved by introducing Local Storage Persistent Volumes and setting mount paths on the Docker host.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'MongoDB & Mongo Express Deployment',
      category: 'devops',
      tech: ['Kubernetes', 'Docker', 'MongoDB', 'YAML'],
      description: 'Configured MongoDB and Mongo Express on Kubernetes and established service communication.',
      features: [
        'Multi-pod communication routing setup',
        'Mongo Express Web UI container mounting',
        'K8s config maps for environment vars',
        'Internal DNS resolution verification'
      ],
      challenges: 'Handling pod-to-pod authentication without exposing plaintext passwords. Solved by configuring Kubernetes Secrets and passing credentials safely.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'CI/CD Pipeline using Jenkins',
      category: 'devops',
      tech: ['Jenkins', 'Docker', 'GitHub', 'CI/CD'],
      description: 'Implemented automated CI/CD pipelines for build, testing, and deployment workflows.',
      features: [
        'GitHub webhook pipeline auto-triggering',
        'Multi-stage Docker builds orchestration',
        'Pipeline scripts syntax checking',
        'Automatic container cleanup and pruning'
      ],
      challenges: 'Orchestrating concurrent builds on a single runner without memory leaks. Solved by implementing Docker volume caches and clean scripts post-build.',
      github: 'https://github.com/PREM03072007'
    },
    {
      title: 'Dockerized Web Application',
      category: 'devops',
      tech: ['Docker', 'Linux', 'Shell scripting'],
      description: 'Containerized web applications and managed deployments across environments.',
      features: [
        'Custom Dockerfiles creation',
        'Image footprint optimization',
        'Multi-container setup with Compose',
        'Container log monitoring & environment management'
      ],
      challenges: 'Minimizing Docker image sizes for quick deployment transfers. Solved by implementing Alpine Linux base images and stripping devDependencies inside node layers.',
      github: 'https://github.com/PREM03072007'
    }
  ];

  const [filter, setFilter] = useState<'all' | 'fullstack' | 'devops' | 'aipython'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [matchmaker, setMatchmaker] = useState<'all' | 'devops' | 'fullstack' | 'aipython'>('all');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Filter projects by both category tab, text search, and role recommendation
  const filteredProjects = projectsData.filter((proj) => {
    const matchesFilter = filter === 'all' || proj.category === filter;
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          proj.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMatchmaker = matchmaker === 'all' || proj.category === matchmaker;
    return matchesFilter && matchesSearch && matchesMatchmaker;
  });

  const handleMatchmakerSelect = (role: 'all' | 'devops' | 'fullstack' | 'aipython') => {
    setMatchmaker(role);
    // Sync category filter automatically
    setFilter(role);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'fullstack': return 'Full Stack';
      case 'devops': return 'DevOps & Cloud';
      case 'aipython': return 'AI & Python';
      default: return '';
    }
  };

  const renderMockScreenshot = (slideIndex: number) => {
    switch (slideIndex) {
      case 0:
        return (
          <svg viewBox="0 0 400 220" width="100%" height="100%" style={styles.svgMockBg}>
            <rect x="10" y="10" width="380" height="20" rx="3" fill="var(--bg-secondary)" />
            <circle cx="20" cy="20" r="4" fill="#ff5f56" />
            <circle cx="30" cy="20" r="4" fill="#ffbd2e" />
            <circle cx="40" cy="20" r="4" fill="#27c93f" />
            <rect x="60" y="16" width="280" height="8" rx="2" fill="var(--bg-primary)" />
            
            <rect x="15" y="45" width="80" height="160" rx="4" fill="var(--bg-secondary)" opacity="0.6" />
            <rect x="110" y="45" width="270" height="45" rx="4" fill="var(--bg-secondary)" />
            <circle cx="135" cy="67" r="10" fill="var(--accent-primary)" opacity="0.4" />
            <rect x="155" y="60" width="150" height="6" rx="2" fill="var(--text-secondary)" />
            <rect x="155" y="70" width="100" height="4" rx="2" fill="var(--text-secondary)" opacity="0.5" />

            <rect x="110" y="105" width="125" height="95" rx="4" fill="var(--bg-secondary)" />
            <rect x="255" y="105" width="125" height="95" rx="4" fill="var(--bg-secondary)" />
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 400 220" width="100%" height="100%" style={styles.svgMockBg}>
            <rect x="25" y="90" width="60" height="35" rx="4" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <text x="55" y="112" textAnchor="middle" fontSize="9" fill="var(--text-primary)" fontWeight="bold">Client</text>
            
            <line x1="85" y1="107" x2="135" y2="107" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3" />
            
            <rect x="135" y="90" width="70" height="35" rx="4" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <text x="170" y="112" textAnchor="middle" fontSize="9" fill="var(--text-primary)" fontWeight="bold">Gateway</text>
            
            <line x1="205" y1="107" x2="255" y2="75" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <line x1="205" y1="107" x2="255" y2="135" stroke="var(--accent-primary)" strokeWidth="1.5" />
            
            <rect x="255" y="55" width="60" height="35" rx="4" fill="var(--bg-secondary)" />
            <text x="285" y="77" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Pod A</text>
            
            <rect x="255" y="115" width="60" height="35" rx="4" fill="var(--bg-secondary)" />
            <text x="285" y="137" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Pod B</text>
            
            <line x1="315" y1="72" x2="345" y2="107" stroke="var(--text-secondary)" strokeWidth="1" />
            <line x1="315" y1="132" x2="345" y2="107" stroke="var(--text-secondary)" strokeWidth="1" />
            
            <rect x="345" y="90" width="45" height="35" rx="4" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <text x="367" y="112" textAnchor="middle" fontSize="9" fill="var(--text-primary)" fontWeight="bold">DB</text>
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 400 220" width="100%" height="100%" style={styles.svgMockBg}>
            <rect x="10" y="10" width="380" height="200" rx="6" fill="#030712" />
            <text x="25" y="35" fontSize="10" fontFamily="monospace" fill="#39d353">prem@dev-node:~$ kubectl get svc</text>
            <text x="25" y="55" fontSize="9" fontFamily="monospace" fill="#f8fafc">NAME            TYPE        PORT(S)   AGE</text>
            <text x="25" y="70" fontSize="9" fontFamily="monospace" fill="#94a3b8">web-service     ClusterIP   80/TCP    2m</text>
            <text x="25" y="85" fontSize="9" fontFamily="monospace" fill="#94a3b8">mysql-service   ClusterIP   3306/TCP  2m</text>
            <text x="25" y="115" fontSize="10" fontFamily="monospace" fill="#39d353">prem@dev-node:~$ curl http://web-service</text>
            <text x="25" y="135" fontSize="9" fontFamily="monospace" fill="#06b6d4">HTTP/1.1 200 OK</text>
            <text x="25" y="150" fontSize="9" fontFamily="monospace" fill="#94a3b8">Content-Length: 42</text>
            <text x="25" y="165" fontSize="9" fontFamily="monospace" fill="#06b6d4">Server: App is online.</text>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % 3);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <section id="projects" style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={styles.headerContainer}
      >
        <h2 style={styles.sectionTitle} className="gradient-text">My Projects</h2>
        <div style={styles.titleDivider} />
      </motion.div>

      {/* Recruiter Placement Matchmaker */}
      <div className="glass-panel" style={styles.matchmakerCard}>
        <div style={styles.matchmakerHeader}>
          <Sparkles size={16} color="var(--accent-primary)" style={{ marginRight: 6 }} />
          <h4 style={styles.matchmakerTitle}>Recruiter Placement Matchmaker</h4>
        </div>
        <p style={styles.matchmakerText}>Select a target hiring role to quickly highlight relevant projects for Prem M's profile.</p>
        <div style={styles.matchmakerGrid}>
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'devops', label: 'DevOps & Cloud' },
            { id: 'fullstack', label: 'Full Stack Dev' },
            { id: 'aipython', label: 'AI & Python' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleMatchmakerSelect(item.id as any)}
              style={{
                ...styles.matchmakerBtn,
                backgroundColor: matchmaker === item.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: matchmaker === item.id ? '#ffffff' : 'var(--text-primary)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div style={styles.searchRow}>
        <div className="glass-panel" style={styles.searchBar}>
          <Search size={18} color="var(--text-secondary)" style={{ marginRight: 8 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title or technology (e.g. OpenCV, Docker, Spring)..."
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout style={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isRec = matchmaker !== 'all' && project.category === matchmaker;
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel"
                style={{
                  ...styles.card,
                  borderColor: isRec ? 'var(--accent-primary)' : 'var(--glass-border)',
                  boxShadow: isRec ? 'var(--glow-effect), var(--glass-shadow)' : 'var(--glass-shadow)',
                }}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveSlide(0);
                }}
              >
                {isRec && (
                  <div style={styles.recBadge}>
                    <Sparkles size={11} style={{ marginRight: 4 }} /> Best Match
                  </div>
                )}
                
                <div style={styles.cardHeader}>
                  <span style={styles.categoryBadge}>
                    {getCategoryLabel(project.category)}
                  </span>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                </div>

                <p style={styles.description}>{project.description}</p>

                {/* Tech Tags */}
                <div style={styles.techContainer}>
                  {project.tech.slice(0, 4).map((tag) => (
                    <span key={tag} style={styles.techTag}>
                      {tag}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span style={{ ...styles.techTag, color: 'var(--accent-primary)' }}>
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div style={styles.cardActions}>
                  <button style={styles.detailLink}>
                    <Info size={14} style={{ marginRight: 6 }} /> View Details
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.cardGithubLink}
                      onClick={(e) => e.stopPropagation()}
                      title="View GitHub Repository"
                      className="github-hover"
                    >
                      <GithubIcon size={15} style={{ marginRight: 5 }} /> Repository
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Glassmorphic Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="glass-panel"
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button onClick={() => setSelectedProject(null)} style={styles.modalClose}>
                <X size={22} />
              </button>

              <span style={styles.modalCategory}>
                {getCategoryLabel(selectedProject.category)}
              </span>
              
              <h3 style={styles.modalTitle}>{selectedProject.title}</h3>

              <div style={styles.modalDivider} />

              {/* Wireframe Screenshot Carousel */}
              <div style={styles.carouselContainer}>
                <div style={styles.carouselFrame}>
                  {renderMockScreenshot(activeSlide)}
                </div>
                <div style={styles.carouselControls}>
                  <button onClick={handlePrevSlide} style={styles.arrowBtn}>
                    <ChevronLeft size={16} />
                  </button>
                  <span style={styles.slideCounter}>
                    Slide {activeSlide + 1} of 3
                  </span>
                  <button onClick={handleNextSlide} style={styles.arrowBtn}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div style={styles.modalContent}>
                <div style={styles.modalSection}>
                  <h4 style={styles.modalSubheading}>Project Overview</h4>
                  <p style={styles.modalText}>{selectedProject.description}</p>
                </div>

                <div style={styles.modalSection}>
                  <h4 style={styles.modalSubheading}>Key Core Features</h4>
                  <ul style={styles.featureList}>
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} style={styles.featureItem}>
                        <span style={styles.checkMark}>✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.challenges && (
                  <div style={styles.modalSection}>
                    <h4 style={styles.modalSubheading}>Engineering Challenges & Workarounds</h4>
                    <p style={styles.modalText}>{selectedProject.challenges}</p>
                  </div>
                )}

                <div style={styles.modalSection}>
                  <h4 style={styles.modalSubheading}>Full Technology Stack</h4>
                  <div style={styles.techContainer}>
                    {selectedProject.tech.map((tag) => (
                      <span key={tag} style={styles.techTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div style={styles.modalFooter}>
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-secondary"
                    style={{ padding: '0.6rem 1.4rem' }}
                  >
                    <GithubIcon size={16} style={{ marginRight: 6 }} /> Code Repository
                  </a>
                )}
                {selectedProject.demo && (
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-primary"
                    style={{ padding: '0.6rem 1.4rem' }}
                  >
                    <ExternalLink size={16} style={{ marginRight: 6 }} /> View Live
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    marginBottom: '3rem',
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
  matchmakerCard: {
    padding: '1.2rem 1.5rem',
    maxWidth: '700px',
    margin: '0 auto 2rem auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  matchmakerHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  matchmakerTitle: {
    fontSize: '1rem',
    fontWeight: 800,
    margin: 0,
  },
  matchmakerText: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  matchmakerGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.2rem',
  },
  matchmakerBtn: {
    fontSize: '0.75rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    border: 'none',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  searchRow: {
    maxWidth: '700px',
    margin: '0 auto 2.5rem auto',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
    fontSize: '0.85rem',
  },
  filterContainer: {
    flexWrap: 'wrap',
    gap: '0.8rem',
    justifyContent: 'center',
    marginBottom: '2.5rem',
    display: 'none', // Hidden since Matchmaker controls filters automatically
  },
  filterButton: {
    padding: '0.5rem 1.2rem',
    borderRadius: '100px',
    border: '1px solid',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    fontFamily: 'var(--font-title)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2.2rem',
    alignItems: 'start',
  },
  card: {
    padding: '1.8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  recBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'var(--accent-primary)',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: 800,
    padding: '0.2rem 0.6rem',
    borderBottomLeftRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'var(--accent-primary)',
    letterSpacing: '1px',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    border: '1px solid var(--glass-border)',
  },
  projectTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    margin: 0,
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    margin: 0,
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  techTag: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    border: '1px solid var(--glass-border)',
  },
  detailLink: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: 'var(--accent-primary)',
    fontSize: '0.85rem',
    fontWeight: 600,
    padding: 0,
    cursor: 'pointer',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.6rem',
    width: '100%',
  },
  cardGithubLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(3, 7, 18, 0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
  },
  modal: {
    position: 'relative',
    maxWidth: '620px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    border: '1px solid var(--glass-border)',
  },
  modalClose: {
    position: 'absolute',
    top: '1.2rem',
    right: '1.2rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  modalCategory: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  modalTitle: {
    fontSize: '1.75rem',
    fontWeight: 800,
    margin: 0,
    paddingRight: '1.5rem',
  },
  modalDivider: {
    height: '1px',
    backgroundColor: 'var(--glass-border)',
    width: '100%',
  },
  carouselContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  carouselFrame: {
    width: '100%',
    height: '200px',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  svgMockBg: {
    background: 'var(--bg-tertiary)',
    width: '100%',
    height: '100%',
  },
  carouselControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  arrowBtn: {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--glass-border)',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'var(--text-primary)',
  },
  slideCounter: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  modalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  modalSubheading: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
  },
  modalText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  featureItem: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'flex-start',
  },
  checkMark: {
    color: 'var(--accent-primary)',
    marginRight: '0.5rem',
    fontWeight: 'bold',
  },
  modalFooter: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    borderTop: '1px solid var(--glass-border)',
    paddingTop: '1.2rem',
  },
};
