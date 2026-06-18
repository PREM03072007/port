import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Prem_M_Resume.pdf';
    link.download = 'Prem_M_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.overlay}
          onClick={onClose}
          className="no-print"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
            id="resume-modal-container"
          >
            {/* Header controls inside the modal */}
            <div style={styles.modalHeader} className="no-print">
              <div style={styles.headerTitle}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Curriculum Vitae</h3>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Prem M - B.Tech IT</span>
              </div>
              <div style={styles.actions}>
                <button onClick={handlePrint} style={styles.actionBtn} title="Print / Save PDF">
                  <Printer size={15} style={{ marginRight: '5px' }} /> Print/PDF
                </button>
                <button onClick={handleDownloadPDF} style={styles.actionBtn} title="Download PDF Resume">
                  <Download size={15} style={{ marginRight: '5px' }} /> Download PDF
                </button>
                <button onClick={onClose} style={styles.closeBtn} title="Close Modal">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document sheet */}
            <div style={styles.resumePaper} className="resume-sheet" id="resume-print-area">
              {/* Top Banner header */}
              <div style={styles.paperHeader}>
                <div style={styles.leftInfo}>
                  <div style={styles.logoRow}>
                    <svg width="45" height="50" viewBox="0 0 100 120" style={{ marginRight: 10 }}>
                      <polygon points="50,5 95,25 95,80 50,115 5,80 5,25" fill="none" stroke="var(--accent-primary)" strokeWidth="5" />
                      <path d="M50,15 L50,105" stroke="var(--accent-primary)" strokeWidth="3" strokeDasharray="3 3" />
                      <path d="M30,55 C30,45 50,45 50,55 C50,45 70,45 70,55 L70,85 C70,75 50,75 50,85 C50,75 30,75 30,85 Z" fill="var(--accent-primary)" opacity="0.85" />
                      <polygon points="50,23 53,30 60,30 55,35 57,42 50,38 43,42 45,35 40,30 47,30" fill="var(--accent-primary)" />
                    </svg>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>Sri Eshwar</h4>
                      <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>College of Engineering</p>
                    </div>
                  </div>
                </div>

                <div style={styles.rightInfo}>
                  <h1 style={styles.candidateName}>Prem M</h1>
                  <p style={styles.contactDetails}>
                    Contact: 6381318635 | E-mail: <a href="mailto:prem.m2024it@sece.ac.in" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>prem.m2024it@sece.ac.in</a>
                  </p>
                  <p style={styles.contactDetails}>
                    <LinkedinIcon size={12} /> <a href="https://www.linkedin.com/in/prem-m-109134333/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', marginLeft: '4px' }}>Linkedin</a>
                    <span style={{ margin: '0 6px' }}>|</span>
                    <GithubIcon size={12} /> <a href="https://github.com/PREM03072007" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', marginLeft: '4px' }}>Github</a>
                  </p>
                </div>
              </div>

              {/* EDUCATION SECTION */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>EDUCATION</h3>
                <div style={styles.itemRow}>
                  <div>
                    <strong>COLLEGE EDUCATION -- Sri Eshwar College of Engineering</strong>
                    <div style={styles.itemSubText}>B.Tech-IT || 7.48 (III Sem)</div>
                  </div>
                  <div style={styles.dateCol}>2024-2028</div>
                </div>
                <div style={styles.itemRow}>
                  <div>
                    <strong>SCHOOLING -- Viswadeepthi Matric Higher Secondary School</strong>
                    <div style={styles.itemSubText}>HSC || 72.7%</div>
                  </div>
                  <div style={styles.dateCol}>2022-2024</div>
                </div>
                <div style={styles.itemRow}>
                  <div>
                    <strong>SCHOOLING -- Viswadeepthi Matric Higher Secondary School</strong>
                    <div style={styles.itemSubText}>SSLC || 71.4%</div>
                  </div>
                  <div style={styles.dateCol}>2021-2022</div>
                </div>
              </div>

              {/* INTERNSHIP EXPERIENCES SECTION */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>INTERNSHIP EXPERIENCES</h3>
                <div style={styles.itemRow}>
                  <div style={{ flexGrow: 1, paddingRight: '1rem' }}>
                    <strong>MERN Stack Developer Intern</strong>
                    <p style={styles.itemDesc}>
                      Developed and maintained full-stack web applications using the MERN stack, implementing RESTful APIs, 
                      responsive user interfaces, and secure authentication mechanisms, with optimized database operations 
                      and scalable backend architecture.
                    </p>
                  </div>
                  <div style={styles.dateCol}>
                    <a href="https://github.com/PREM03072007" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', textDecoration: 'underline' }}>Github</a>
                    <div style={{ marginTop: '2px' }}>2025</div>
                  </div>
                </div>
              </div>

              {/* PROJECTS SECTION */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>PROJECTS</h3>
                
                <div style={styles.projectBlock}>
                  <div style={styles.itemRow}>
                    <strong>Smart Attendance Monitoring System:</strong>
                    <div style={styles.dateCol}>
                      <a href="https://github.com/PREM03072007" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginRight: '6px', textDecoration: 'underline' }}>Github</a>
                      2025
                    </div>
                  </div>
                  <div style={styles.techStackLabel}>Tech Stack : Python, OpenCV, Face Recognition (Deep Learning), Pandas, OpenPyXL, Twilio API, Excel</div>
                  <p style={styles.itemDesc}>
                    Smart Attendance Monitoring System automatically records attendance using technologies like biometrics, RFID, QR codes, or mobile apps. It replaces manual attendance methods, reducing errors and preventing proxy attendance.
                  </p>
                </div>

                <div style={styles.projectBlock}>
                  <div style={styles.itemRow}>
                    <strong>Medical Store Management System:</strong>
                    <div style={styles.dateCol}>
                      <a href="https://github.com/PREM03072007" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginRight: '6px', textDecoration: 'underline' }}>Github</a>
                      2025
                    </div>
                  </div>
                  <div style={styles.techStackLabel}>Tech Stack : HTML, CSS, JavaScript, MySQL, Git & GitHub, IntelliJ IDEA / Eclipse</div>
                  <p style={styles.itemDesc}>
                    Medical Store Management System is a software application used to manage medicines, sales, inventory, and customer records in a pharmacy. It helps track medicine stock and expiry dates while reducing manual work and billing errors.
                  </p>
                </div>

                <div style={styles.projectBlock}>
                  <div style={styles.itemRow}>
                    <strong>Price Tracker:</strong>
                    <div style={styles.dateCol}>
                      <a href="https://github.com/PREM03072007" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginRight: '6px', textDecoration: 'underline' }}>Github</a>
                      2025
                    </div>
                  </div>
                  <div style={styles.techStackLabel}>Tech Stack : HTML, CSS, JavaScript, Spring Boot, MySQL, Git & GitHub, Postman</div>
                  <p style={styles.itemDesc}>
                    The Price Tracker is a web application that monitors and tracks the price of products from different online sources. The system allows users to enter a product link or product name and track its price changes over time. It helps users know when the price drops so they can purchase the product at the best price.
                  </p>
                </div>
              </div>

              {/* ACHIEVEMENTS SECTION */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>ACHIEVEMENTS</h3>
                <div style={styles.itemRow}>
                  <div>Participated in GenAI (Inter-College Hackathon)</div>
                  <div style={styles.dateCol}>2025</div>
                </div>
                <div style={styles.itemRow}>
                  <div>Participated in Createathon (Web Hackathon)</div>
                  <div style={styles.dateCol}>2024</div>
                </div>
              </div>

              {/* CODING PROFILES SECTION */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>CODING PROFILES</h3>
                <div style={styles.itemRow}>
                  <div>
                    <strong>LeetCode</strong> - Global Rank: 15,06,175 | Problems Solved : 100+
                  </div>
                  <div style={styles.dateCol}>
                    <a href="https://leetcode.com/u/prem_2007/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Link</a>
                  </div>
                </div>
                <div style={styles.itemRow}>
                  <div>
                    <strong>Skillrack</strong> - Problems Solved : 1050+ | Certificate Received : 14
                  </div>
                  <div style={styles.dateCol}>
                    <a href="https://www.skillrack.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Link</a>
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS SECTION */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>CERTIFICATIONS</h3>
                <div style={styles.itemRow}>
                  <div>Mastering Data Structures & Algorithms using C and C++ || Udemy</div>
                  <div style={styles.dateCol}>2025</div>
                </div>
                <div style={styles.itemRow}>
                  <div>SQL - Basics (Standard) || Skillrack</div>
                  <div style={styles.dateCol}>2025</div>
                </div>
                <div style={styles.itemRow}>
                  <div>Python Programming Masterclass || Udemy</div>
                  <div style={styles.dateCol}>2025</div>
                </div>
                <div style={styles.itemRow}>
                  <div>Successfully completed C++ Spoken Tutorial Training || IIT Bombay</div>
                  <div style={styles.dateCol}>2024</div>
                </div>
                <div style={styles.itemRow}>
                  <div>Successfully completed C Spoken tutorial Training || IIT Bombay</div>
                  <div style={styles.dateCol}>2024</div>
                </div>
              </div>

              {/* TECHNICAL SKILLS SECTION */}
              <div style={styles.section} className="no-margin-bottom">
                <h3 style={styles.sectionTitle}>TECHNICAL SKILLS</h3>
                <table style={styles.skillsTable}>
                  <tbody>
                    <tr>
                      <td style={styles.skillsLabel}><strong>Languages</strong></td>
                      <td style={styles.skillsValue}>Java | C++ | Python | Javascript | HTML | CSS</td>
                    </tr>
                    <tr>
                      <td style={styles.skillsLabel}><strong>Technologies/Frameworks</strong></td>
                      <td style={styles.skillsValue}>Spring-Boot | NodeJS | ExpressJS | ReactJS</td>
                    </tr>
                    <tr>
                      <td style={styles.skillsLabel}><strong>Database</strong></td>
                      <td style={styles.skillsValue}>MySQL | PostgreSQL | Mongodb</td>
                    </tr>
                    <tr>
                      <td style={styles.skillsLabel}><strong>Tools</strong></td>
                      <td style={styles.skillsValue}>Git | GitHub | Postman | VSCode | Canva | PowerPoint | Excel</td>
                    </tr>
                    <tr>
                      <td style={styles.skillsLabel}><strong>Core Concepts</strong></td>
                      <td style={styles.skillsValue}>DSA | OOPs | DBMS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(3, 7, 18, 0.75)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto',
    padding: '2rem 1.5rem',
  },
  modal: {
    maxWidth: '820px',
    width: '100%',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--glass-border)',
    boxShadow: 'var(--glass-shadow), 0 20px 40px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid var(--glass-border)',
    backgroundColor: 'var(--bg-tertiary)',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  actions: {
    display: 'flex',
    gap: '0.6rem',
    alignItems: 'center',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    color: 'var(--text-primary)',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  closeBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    transition: 'var(--transition-smooth)',
  },
  resumePaper: {
    padding: '2.5rem 3rem',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    fontFamily: 'var(--font-body)',
  },
  paperHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid var(--accent-primary)',
    paddingBottom: '1rem',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
  },
  leftInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  rightInfo: {
    textAlign: 'right',
  },
  candidateName: {
    fontSize: '1.8rem',
    fontWeight: 800,
    margin: 0,
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
  },
  contactDetails: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    margin: '3px 0 0 0',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
    borderBottom: '1px solid var(--glass-border)',
    paddingBottom: '0.8rem',
  },
  sectionTitle: {
    fontSize: '0.85rem',
    fontWeight: 800,
    color: 'var(--accent-primary)',
    letterSpacing: '1px',
    margin: '0 0 0.25rem 0',
    borderBottom: '1px solid var(--accent-primary)',
    paddingBottom: '2px',
    width: 'fit-content',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
  },
  itemSubText: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  itemDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    margin: '4px 0 0 0',
    lineHeight: 1.4,
  },
  dateCol: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  projectBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginBottom: '0.4rem',
  },
  techStackLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  skillsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.8rem',
  },
  skillsLabel: {
    padding: '4px 8px 4px 0',
    verticalAlign: 'top',
    width: '200px',
    color: 'var(--text-primary)',
  },
  skillsValue: {
    padding: '4px 0',
    verticalAlign: 'top',
    color: 'var(--text-secondary)',
  },
};
