import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I am Prem M's AI Assistant. Ask me anything about his skills, projects, CGPA, or placement availability!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const qaData: Record<string, string> = {
    cgpa: "Prem M holds a current CGPA of 7.5/10.0 in B.Tech Information Technology at Sri Eshwar College of Engineering.",
    skills: "Prem is proficient in Java, Python, C, C++, and JavaScript. On the web stack, he builds with React.js, Spring Boot, and Node.js. For DevOps, he is skilled in Docker, Kubernetes, Linux, Jenkins, CI/CD, and Git.",
    projects: "Prem has built: \n1. Smart Attendance Monitoring (Python, OpenCV, Twilio)\n2. Price Tracker (Spring Boot, MySQL)\n3. Medical Store Management (JS, MySQL)\n4. Kubernetes deployments (WordPress, MongoDB).",
    placement: "Yes, Prem M is actively seeking internships and full-time job opportunities starting in fields like Software Development, Full Stack Dev, DevOps Engineering, and AI/Cloud Engineering.",
    contact: "You can reach Prem at premprem2702@gmail.com or call him at +91 6381318635. He is located in Pollachi, Tamil Nadu, India.",
  };

  const getBotResponse = (userInput: string): string => {
    const clean = userInput.toLowerCase().trim();
    if (clean.includes('cgpa') || clean.includes('marks') || clean.includes('gpa') || clean.includes('grade')) {
      return qaData.cgpa;
    }
    if (clean.includes('skills') || clean.includes('languages') || clean.includes('java') || clean.includes('python') || clean.includes('devops')) {
      return qaData.skills;
    }
    if (clean.includes('projects') || clean.includes('build') || clean.includes('system') || clean.includes('github')) {
      return qaData.projects;
    }
    if (clean.includes('placement') || clean.includes('hiring') || clean.includes('intern') || clean.includes('job') || clean.includes('work') || clean.includes('recruit')) {
      return qaData.placement;
    }
    if (clean.includes('contact') || clean.includes('phone') || clean.includes('email') || clean.includes('call') || clean.includes('reach')) {
      return qaData.contact;
    }
    if (clean.includes('hello') || clean.includes('hi ') || clean.includes('hey')) {
      return "Hello! How can I help you learn more about Prem's software engineering background today?";
    }
    return "That's a great question! Prem has deep experience in that field. I suggest connecting with him directly via email at premprem2702@gmail.com or phone at +91 6381318635 to ask him in detail!";
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsgId = Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: textToSend }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and typing
    setTimeout(() => {
      setIsTyping(false);
      const botResponseText = getBotResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botResponseText },
      ]);
    }, 1200);
  };

  return (
    <div style={styles.chatWrapper}>
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.floatingBtn}
        className="glass-panel"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask AI Assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} color="var(--accent-primary)" />}
        {/* Pulsing indicator badge */}
        {!isOpen && <span style={styles.badgePulse} />}
      </motion.button>

      {/* Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass-panel"
            style={styles.chatPanel}
          >
            {/* Header */}
            <div style={styles.header}>
              <Bot size={22} color="var(--accent-primary)" style={{ marginRight: 8 }} />
              <div>
                <h4 style={styles.title}>Ask Prem AI</h4>
                <span style={styles.onlineStatus}>Online Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                <X size={16} />
              </button>
            </div>

            {/* Message History */}
            <div style={styles.body}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.messageRow,
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.sender === 'bot' && (
                    <div style={{ ...styles.avatar, backgroundColor: 'var(--bg-tertiary)' }}>
                      <Bot size={14} color="var(--accent-primary)" />
                    </div>
                  )}
                  <div
                    style={{
                      ...styles.bubble,
                      backgroundColor: msg.sender === 'user' 
                        ? 'var(--accent-primary)' 
                        : 'var(--bg-tertiary)',
                      color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                      borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '12px',
                      borderBottomRightRadius: msg.sender === 'user' ? '4px' : '12px',
                    }}
                  >
                    <p style={styles.messageText}>{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={styles.messageRow}>
                  <div style={{ ...styles.avatar, backgroundColor: 'var(--bg-tertiary)' }}>
                    <Bot size={14} color="var(--accent-primary)" />
                  </div>
                  <div style={{ ...styles.bubble, backgroundColor: 'var(--bg-tertiary)' }}>
                    <span className="dot-typing" style={styles.typingDot}>AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Prompts Chips */}
            <div style={styles.chipsRow}>
              <button onClick={() => handleSend("What is your CGPA?")} style={styles.chip}>
                🎓 CGPA?
              </button>
              <button onClick={() => handleSend("What projects have you built?")} style={styles.chip}>
                💻 Projects?
              </button>
              <button onClick={() => handleSend("Tell me about your DevOps skills.")} style={styles.chip}>
                🐳 DevOps?
              </button>
              <button onClick={() => handleSend("Are you available for placements?")} style={styles.chip}>
                💼 Placement?
              </button>
            </div>

            {/* Chat Input Footer */}
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask me a question..."
                style={styles.chatInput}
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend(input)}
                style={styles.sendBtn}
                disabled={isTyping}
                aria-label="Send Message"
              >
                <Send size={15} color="#ffffff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatWrapper: {
    position: 'fixed',
    bottom: '2rem',
    right: '5.5rem', // Offset from scroll-to-top button
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  floatingBtn: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: 'var(--glass-shadow)',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    position: 'relative',
  },
  badgePulse: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#06b6d4',
    boxShadow: '0 0 8px #06b6d4',
  },
  chatPanel: {
    position: 'absolute',
    bottom: '60px',
    right: '0',
    width: '320px',
    height: '420px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: 'var(--glass-shadow)',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem 1rem',
    backgroundColor: 'var(--bg-tertiary)',
    borderBottom: '1px solid var(--glass-border)',
  },
  title: {
    fontSize: '0.85rem',
    fontWeight: 800,
    margin: 0,
    color: 'var(--text-primary)',
  },
  onlineStatus: {
    fontSize: '0.65rem',
    color: '#10b981',
    fontWeight: 600,
    display: 'block',
  },
  closeBtn: {
    marginLeft: 'auto',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
  },
  body: {
    flexGrow: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.5rem',
    width: '100%',
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    border: '1px solid var(--glass-border)',
  },
  bubble: {
    padding: '0.6rem 0.8rem',
    borderRadius: '12px',
    maxWidth: '80%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
  },
  messageText: {
    fontSize: '0.8rem',
    margin: 0,
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
  },
  typingDot: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
  },
  chipsRow: {
    display: 'flex',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    overflowX: 'auto',
    borderTop: '1px solid var(--glass-border)',
    backgroundColor: 'var(--bg-secondary)',
    scrollbarWidth: 'none',
  },
  chip: {
    fontSize: '0.7rem',
    padding: '0.25rem 0.6rem',
    borderRadius: '100px',
    border: '1px solid var(--glass-border)',
    background: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'var(--transition-smooth)',
  },
  inputContainer: {
    display: 'flex',
    padding: '0.6rem',
    borderTop: '1px solid var(--glass-border)',
    backgroundColor: 'var(--bg-tertiary)',
    alignItems: 'center',
    gap: '0.5rem',
  },
  chatInput: {
    flexGrow: 1,
    padding: '0.5rem 0.8rem',
    borderRadius: '20px',
    border: '1px solid var(--glass-border)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '0.8rem',
    outline: 'none',
  },
  sendBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-primary)',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};
