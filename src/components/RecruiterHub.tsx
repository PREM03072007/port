import React, { useState } from 'react';

import { Copy, Check, FileDown, Smartphone, Mail, Send } from 'lucide-react';

export const RecruiterHub: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'premprem2702@gmail.com';
  const phone = '6381318635';

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };



  return (
    <div className="glass-panel" style={styles.container}>
      <h4 style={styles.title} className="gradient-text">Recruiter Hub</h4>
      <p style={styles.subtitle}>Quick actions to coordinate and fast-track interviews.</p>

      <div style={styles.actionGrid}>
        {/* Email Copy */}
        <div style={styles.actionRow}>
          <div style={styles.infoCol}>
            <Mail size={16} color="var(--text-secondary)" />
            <span style={styles.label}>{email}</span>
          </div>
          <button 
            onClick={() => copyToClipboard(email, 'email')}
            style={styles.actionBtn}
            aria-label="Copy Email"
          >
            {copiedEmail ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
          </button>
        </div>

        {/* Phone Copy */}
        <div style={styles.actionRow}>
          <div style={styles.infoCol}>
            <Smartphone size={16} color="var(--text-secondary)" />
            <span style={styles.label}>+91 {phone}</span>
          </div>
          <button 
            onClick={() => copyToClipboard(phone, 'phone')}
            style={styles.actionBtn}
            aria-label="Copy Phone"
          >
            {copiedPhone ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
          </button>
        </div>

        {/* Direct Connect Options */}
        <div style={styles.buttonRow}>
          <a 
            href={`https://wa.me/91${phone}?text=Hi%20Prem,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.`}
            target="_blank"
            rel="noreferrer"
            style={{ ...styles.linkBtn, backgroundColor: '#25D366', color: '#ffffff' }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
          >
            <Send size={15} style={{ marginRight: 6 }} /> WhatsApp Chat
          </a>

          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
            style={styles.downloadBtn}
          >
            <FileDown size={15} style={{ marginRight: 6 }} /> View CV
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    border: '1px solid var(--glass-border)',
    boxShadow: '0 8px 32px 0 var(--glass-shadow)',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 800,
    margin: 0,
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  actionGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '0.4rem',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--glass-border)',
  },
  infoCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  actionBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
  },
  buttonRow: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '0.75rem',
    marginTop: '0.4rem',
  },
  linkBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.65rem',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.8rem',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'var(--transition-smooth)',
  },
  downloadBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.65rem',
    borderRadius: 'var(--border-radius-sm)',
    border: '2px solid var(--accent-primary)',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
};
