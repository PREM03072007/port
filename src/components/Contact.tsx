import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from 'lucide-react';
import { ConfettiCanvas } from './ConfettiCanvas';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setShowConfetti(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setShowConfetti(false);
  };

  return (
    <section id="contact" style={styles.section}>
      {/* Confetti Explosion Canvas */}
      {showConfetti && <ConfettiCanvas />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={styles.headerContainer}
      >
        <h2 style={styles.sectionTitle} className="gradient-text">Contact Me</h2>
        <div style={styles.titleDivider} />
      </motion.div>

      <div style={styles.grid}>
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={styles.infoColumn}
        >
          <h3 style={styles.infoHeading}>Get in Touch</h3>
          <p style={styles.infoSubtext}>
            Have an internship opening, a project idea, or just want to connect? 
            Feel free to send a message. I'd love to hear from you!
          </p>

          <div style={styles.infoCardGrid}>
            <div className="glass-panel" style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <Mail size={20} color="var(--accent-primary)" />
              </div>
              <div style={styles.infoCardContent}>
                <span style={styles.infoLabel}>Email Me</span>
                <a href="mailto:premprem2702@gmail.com" style={styles.infoValue}>
                  premprem2702@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-panel" style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <Phone size={20} color="var(--accent-primary)" />
              </div>
              <div style={styles.infoCardContent}>
                <span style={styles.infoLabel}>Call Me</span>
                <a href="tel:6381318635" style={styles.infoValue}>
                  +91 6381318635
                </a>
              </div>
            </div>

            <div className="glass-panel" style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <MapPin size={20} color="var(--accent-primary)" />
              </div>
              <div style={styles.infoCardContent}>
                <span style={styles.infoLabel}>Location</span>
                <span style={styles.infoValue}>Pollachi, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.formColumn}
        >
          <form onSubmit={handleSubmit} className="glass-panel" style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    ...styles.input,
                    borderColor: errors.name ? '#ef4444' : 'var(--glass-border)'
                  }}
                  placeholder="John Doe"
                />
                {errors.name && <span style={styles.errorText}>{errors.name}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    ...styles.input,
                    borderColor: errors.email ? '#ef4444' : 'var(--glass-border)'
                  }}
                  placeholder="john@example.com"
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  ...styles.input,
                  borderColor: errors.subject ? '#ef4444' : 'var(--glass-border)'
                }}
                placeholder="Job Opportunity / Inquiry"
              />
              {errors.subject && <span style={styles.errorText}>{errors.subject}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                style={{
                  ...styles.textarea,
                  borderColor: errors.message ? '#ef4444' : 'var(--glass-border)'
                }}
                placeholder="Write your message here..."
              />
              {errors.message && <span style={styles.errorText}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ ...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={16} style={{ marginLeft: 6 }} />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={closeSuccess}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="glass-panel"
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeSuccess} style={styles.modalClose}>
                <X size={20} />
              </button>
              <CheckCircle2 size={54} color="#10b981" style={{ marginBottom: '1.2rem' }} />
              <h4 style={styles.modalTitle}>Message Sent!</h4>
              <p style={styles.modalText}>
                Thank you for reaching out. Prem has received your message and will get back to you shortly.
              </p>
              <button onClick={closeSuccess} className="btn-primary">
                Done
              </button>
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
    gridTemplateColumns: '0.9fr 1.1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  infoHeading: {
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: 0,
  },
  infoSubtext: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  infoCardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '1.2rem 1.5rem',
  },
  infoIconWrapper: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--glass-border)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--glass-border)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'var(--transition-smooth)',
  },
  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--glass-border)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'var(--transition-smooth)',
    resize: 'vertical',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '0.5rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(3, 7, 18, 0.7)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
  },
  modal: {
    position: 'relative',
    maxWidth: '450px',
    width: '100%',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    marginBottom: '0.6rem',
  },
  modalText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
};

// Add CSS media query simulation for contact form
const contactMediaStyle = document.createElement("style");
contactMediaStyle.innerText = `
  @media (max-width: 900px) {
    #contact > div {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
    }
  }
  @media (max-width: 500px) {
    #contact form > div:first-child {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(contactMediaStyle);
