import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';

interface TerminalWidgetProps {
  toggleTheme?: () => void;
}

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ toggleTheme }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'systeminfo',
      output: (
        <div>
          <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Prem M DevOps Terminal [v1.0.0]</p>
          <p style={{ color: 'var(--text-secondary)' }}>Type "help" to see list of available commands.</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div style={styles.helpGrid}>
            <p><strong>about</strong> - View bio and career goals</p>
            <p><strong>skills</strong> - List technical stack</p>
            <p><strong>projects</strong> - Show featured projects</p>
            <p><strong>contact</strong> - Output contact details</p>
            <p><strong>theme</strong> - Toggle light/dark mode</p>
            <p><strong>clear</strong> - Clear console history</p>
          </div>
        );
        break;
      case 'about':
        output = (
          <div>
            <p><strong>Name:</strong> Prem M</p>
            <p><strong>Education:</strong> B.Tech IT, Sri Eshwar College of Engineering (2024-2028)</p>
            <p><strong>Focus:</strong> DevOps, Cloud Automation, and Full Stack Development.</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              "Passionate about building scalable pipelines, containerized deployments, and robust backend microservices."
            </p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div>
            <p><strong>Languages:</strong> Java, Python, C, C++, JavaScript</p>
            <p><strong>Web Tech:</strong> React.js, Spring Boot, Node.js, Express.js</p>
            <p><strong>DevOps & Cloud:</strong> Linux, Docker, Kubernetes, Jenkins, Git, CI/CD, AWS (Learning)</p>
            <p><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB</p>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div>
            <p><strong>1. Smart Attendance Monitoring System</strong> (Python, OpenCV, Twilio)</p>
            <p><strong>2. Price Tracker</strong> (HTML, CSS, Spring Boot, MySQL)</p>
            <p><strong>3. Kubernetes WordPress Deployment</strong> (Docker, Kubernetes)</p>
            <p style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
              Type "projects" or scroll down the page to read more features.
            </p>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div>
            <p><strong>Email:</strong> premprem2702@gmail.com</p>
            <p><strong>Phone:</strong> +91 6381318635</p>
            <p><strong>Location:</strong> Pollachi, Tamil Nadu, India</p>
            <p><strong>LinkedIn:</strong> linkedin.com/in/prem-m-109134333/</p>
          </div>
        );
        break;
      case 'theme':
        if (toggleTheme) {
          toggleTheme();
          output = <p style={{ color: '#10b981' }}>System theme toggled successfully.</p>;
        } else {
          output = <p style={{ color: '#ef4444' }}>Theme toggler not connected.</p>;
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo rm -rf /':
        output = (
          <p style={{ color: '#ef4444', fontWeight: 'bold' }}>
            Warning: Attempting to delete root directory... Access Denied! Nice try. 😉
          </p>
        );
        break;
      case 'hack':
        output = (
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>
            Establishing server connection... Bypass firewall... Access Granted. Recruiter Token: [PREM_HERO_2026]
          </p>
        );
        break;
      case '':
        output = '';
        break;
      default:
        output = (
          <p style={{ color: '#ef4444' }}>
            Command not found: "{cmdText}". Type "help" to see available options.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="glass-panel" style={styles.container} onClick={focusInput}>
      {/* Terminal Title Bar */}
      <div style={styles.header}>
        <div style={styles.buttons}>
          <span style={{ ...styles.dot, backgroundColor: '#ff5f56' }} />
          <span style={{ ...styles.dot, backgroundColor: '#ffbd2e' }} />
          <span style={{ ...styles.dot, backgroundColor: '#27c93f' }} />
        </div>
        <div style={styles.title}>
          <Terminal size={14} style={{ marginRight: 6 }} />
          <span>prem@devops-sandbox:~</span>
        </div>
      </div>

      {/* Terminal Console Output */}
      <div style={styles.body}>
        {history.map((item, idx) => (
          <div key={idx} style={styles.historyRow}>
            {item.command && (
              <p style={styles.commandLine}>
                <span style={styles.prompt}>prem@sandbox:~$</span> {item.command}
              </p>
            )}
            <div style={styles.outputLine}>{item.output}</div>
          </div>
        ))}
        
        {/* Input prompt */}
        <div style={styles.inputRow}>
          <span style={styles.prompt}>prem@sandbox:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.terminalInput}
            aria-label="Terminal Command"
            autoComplete="off"
            autoCapitalize="off"
          />
          <CornerDownLeft size={14} style={styles.enterKey} />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    backgroundColor: 'var(--terminal-bg)',
    border: '1px solid var(--glass-border)',
    padding: '0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--glass-shadow)',
    minHeight: '280px',
    maxHeight: '350px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.6rem 1rem',
    background: 'var(--terminal-header)',
    borderBottom: '1px solid var(--glass-border)',
  },
  buttons: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontFamily: "'Courier New', Courier, monospace",
  },
  body: {
    padding: '1.2rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.85rem',
    color: 'var(--terminal-text)',
    overflowY: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  historyRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  commandLine: {
    color: 'var(--terminal-input-text)',
    margin: 0,
  },
  prompt: {
    color: 'var(--terminal-prompt)',
    fontWeight: 'bold',
    marginRight: '0.5rem',
  },
  outputLine: {
    paddingLeft: '1rem',
    lineHeight: 1.4,
    color: 'var(--terminal-text)',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  terminalInput: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--terminal-input-text)',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.85rem',
    flexGrow: 1,
  },
  enterKey: {
    color: 'var(--text-secondary)',
    opacity: 0.6,
  },
  helpGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '0.2rem 1rem',
  },
};
