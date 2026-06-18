import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Box, CloudLightning, CheckCircle2, RotateCcw } from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export const PipelineSimulator: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const stages: Stage[] = [
    { id: 1, name: 'Source', desc: 'Git Pull', icon: <Code size={20} /> },
    { id: 2, name: 'Build', desc: 'Docker Build', icon: <Box size={20} /> },
    { id: 3, name: 'Registry', desc: 'Push Image', icon: <CloudLightning size={20} /> },
    { id: 4, name: 'Deploy', desc: 'Kubernetes', icon: <CheckCircle2 size={20} /> },
  ];

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLogWithDelay = (message: string, delay: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, message]);
        resolve();
      }, delay);
    });
  };

  const runPipeline = async () => {
    if (status === 'running') return;
    
    setStatus('running');
    setLogs([]);

    // --- STAGE 1: Git Checkout ---
    setCurrentStage(1);
    await addLogWithDelay('>>> Pipeline Triggered: commit [b7f4a8e] - "feat: premium interactive features"', 0);
    await addLogWithDelay('$ git clone https://github.com/PREM03072007/devops-app.git', 400);
    await addLogWithDelay('Cloning into \'devops-app\'...', 800);
    await addLogWithDelay('remote: Enumerating objects: 45, done.', 1200);
    await addLogWithDelay('remote: Compressing objects: 100% (32/32), done.', 1600);
    await addLogWithDelay('Receiving objects: 100% (45/45), 18.4 KiB, done.', 2000);
    await addLogWithDelay('SUCCESS: Repository checked out successfully.', 2300);

    // --- STAGE 2: Docker Build ---
    setCurrentStage(2);
    await addLogWithDelay('$ docker build -t prem03072007/portfolio-web:v1.0.0 .', 400);
    await addLogWithDelay('Sending build context to Docker daemon... 25.5MB', 800);
    await addLogWithDelay('Step 1/5 : FROM node:alpine AS build', 1200);
    await addLogWithDelay(' ---> 3c92cf8710fa', 1500);
    await addLogWithDelay('Step 2/5 : WORKDIR /app', 1800);
    await addLogWithDelay('Step 3/5 : COPY package*.json ./ && RUN npm ci', 2200);
    await addLogWithDelay('added 159 packages in 4.32s', 2800);
    await addLogWithDelay('Step 4/5 : COPY . . && RUN npm run build', 3200);
    await addLogWithDelay('vite v8.0.16 building client environment...', 3600);
    await addLogWithDelay('✓ built in 528ms (400.18 kB)', 4000);
    await addLogWithDelay('Step 5/5 : EXPOSE 80', 4300);
    await addLogWithDelay('Successfully built image prem03072007/portfolio-web:v1.0.0', 4600);
    await addLogWithDelay('SUCCESS: Docker Image compilation completed.', 4900);

    // --- STAGE 3: Registry Push ---
    setCurrentStage(3);
    await addLogWithDelay('$ docker push prem03072007/portfolio-web:v1.0.0', 400);
    await addLogWithDelay('The push refers to repository [docker.io/prem03072007/portfolio-web]', 800);
    await addLogWithDelay('a84e27f05: Preparing...', 1100);
    await addLogWithDelay('3c829e1fa: Pushing... [2.4MB / 18.2MB]', 1500);
    await addLogWithDelay('3c829e1fa: Pushed successfully.', 2200);
    await addLogWithDelay('a84e27f05: Layer already exists', 2500);
    await addLogWithDelay('v1.0.0: digest: sha256:7f4a2e8c9b91fd...', 2800);
    await addLogWithDelay('SUCCESS: Artifact registered in Docker Hub registry.', 3100);

    // --- STAGE 4: Kubernetes Deployment ---
    setCurrentStage(4);
    await addLogWithDelay('$ kubectl apply -f k8s/deployment.yaml', 400);
    await addLogWithDelay('deployment.apps/portfolio-web-deployment configured', 900);
    await addLogWithDelay('service/portfolio-web-service configured', 1300);
    await addLogWithDelay('$ kubectl get pods -l app=portfolio-web', 1700);
    await addLogWithDelay('NAME                                READY   STATUS    RESTARTS   AGE', 2000);
    await addLogWithDelay('portfolio-web-pod-7f4c9c-b1   1/1     Running   0          4s', 2400);
    await addLogWithDelay('portfolio-web-pod-7f4c9c-f9   1/1     Running   0          4s', 2700);
    await addLogWithDelay('$ curl -I http://portfolio-web-service', 3100);
    await addLogWithDelay('HTTP/1.1 200 OK  [Host: K8s Ingress Controller]', 3400);
    await addLogWithDelay('>>> CI/CD PIPELINE DEPLOYMENT: SUCCESSFUL !!!', 3800);

    setCurrentStage(5); // Complete
    setStatus('success');
  };

  const resetPipeline = () => {
    setStatus('idle');
    setCurrentStage(0);
    setLogs([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title} className="gradient-text">Interactive CI/CD Pipeline Simulator</h4>
        <p style={styles.subtitle}>Test Prem's DevOps deployment cycle in real-time.</p>
      </div>

      {/* Visual Timeline Nodes */}
      <div style={styles.nodesWrapper} className="glass-panel">
        <div style={styles.nodesRow}>
          {stages.map((stage, idx) => {
            const isCompleted = currentStage > stage.id;
            const isCurrent = currentStage === stage.id;
            const isActive = isCompleted || isCurrent;

            return (
              <React.Fragment key={stage.id}>
                {/* Node circle */}
                <div style={styles.nodeItem}>
                  <motion.div
                    style={{
                      ...styles.nodeCircle,
                      backgroundColor: isCompleted 
                        ? '#10b981' 
                        : isCurrent 
                          ? 'var(--accent-primary)' 
                          : 'var(--bg-tertiary)',
                      borderColor: isActive ? 'var(--accent-primary)' : 'var(--glass-border)',
                      boxShadow: isCurrent 
                        ? '0 0 15px var(--accent-primary)' 
                        : 'none',
                    }}
                    animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {isCompleted ? (
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>✓</span>
                    ) : (
                      <span style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {stage.icon}
                      </span>
                    )}
                  </motion.div>
                  <span style={{
                    ...styles.nodeName,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500
                  }}>
                    {stage.name}
                  </span>
                  <span style={styles.nodeDesc}>{stage.desc}</span>
                </div>

                {/* Connecting line */}
                {idx < stages.length - 1 && (
                  <div style={styles.connectorLineBg}>
                    <motion.div
                      style={{
                        ...styles.connectorLineFill,
                        background: isCompleted ? '#10b981' : 'var(--accent-gradient)'
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Pipeline Controls & Live Console */}
      <div style={styles.consoleWrapper} className="glass-panel">
        <div style={styles.consoleHeader}>
          <div style={styles.dotRow}>
            <span style={{ ...styles.consoleDot, backgroundColor: '#ff5f56' }} />
            <span style={{ ...styles.consoleDot, backgroundColor: '#ffbd2e' }} />
            <span style={{ ...styles.consoleDot, backgroundColor: '#27c93f' }} />
          </div>
          <span style={styles.consoleTitle}>bash - pipeline_deployment.sh</span>
          
          <div style={{ marginLeft: 'auto' }}>
            {status === 'idle' && (
              <button onClick={runPipeline} style={styles.runBtn}>
                <Play size={12} style={{ marginRight: 4 }} /> Run Pipeline
              </button>
            )}
            {status === 'running' && (
              <span style={styles.runningBadge}>
                Deploying...
              </span>
            )}
            {status === 'success' && (
              <button onClick={resetPipeline} style={styles.resetBtn}>
                <RotateCcw size={12} style={{ marginRight: 4 }} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Live log board */}
        <div style={styles.consoleBody}>
          {logs.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
              Click "Run Pipeline" to start the container deployment process.
            </p>
          ) : (
            logs.map((log, lIdx) => {
              const isSuccess = log.includes('SUCCESS') || log.includes('SUCCESSFUL');
              const isInput = log.startsWith('$');
              const isInfo = log.startsWith('>>>');
              
              let color = 'var(--text-primary)';
              if (isSuccess) color = '#10b981';
              else if (isInput) color = 'var(--accent-primary)';
              else if (isInfo) color = '#eab308'; // Amber info

              return (
                <p key={lIdx} style={{ ...styles.consoleLine, color }}>
                  {log}
                </p>
              );
            })
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '2rem',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.2rem',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 800,
    margin: 0,
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  nodesWrapper: {
    padding: '1.5rem 1rem',
  },
  nodesRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
  },
  nodeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90px',
    textAlign: 'center',
    zIndex: 5,
  },
  nodeCircle: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
  },
  nodeName: {
    fontSize: '0.85rem',
    marginTop: '0.5rem',
    transition: 'var(--transition-smooth)',
  },
  nodeDesc: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
  },
  connectorLineBg: {
    height: '3px',
    flexGrow: 1,
    backgroundColor: 'var(--bg-tertiary)',
    position: 'relative',
    top: '-15px',
    margin: '0 -15px',
    zIndex: 1,
  },
  connectorLineFill: {
    height: '100%',
    width: '0%',
    transition: 'width 0.4s ease',
  },
  consoleWrapper: {
    padding: '0',
    overflow: 'hidden',
    boxShadow: 'var(--glass-shadow)',
  },
  consoleHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.6rem 1rem',
    backgroundColor: 'var(--terminal-header)',
    borderBottom: '1px solid var(--glass-border)',
  },
  dotRow: {
    display: 'flex',
    gap: '5px',
  },
  consoleDot: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
  },
  consoleTitle: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontFamily: "'Courier New', Courier, monospace",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  runBtn: {
    backgroundColor: 'var(--accent-primary)',
    color: '#ffffff',
    border: 'none',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  runningBadge: {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  resetBtn: {
    border: '1px solid var(--glass-border)',
    background: 'transparent',
    color: 'var(--text-primary)',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  consoleBody: {
    height: '160px',
    backgroundColor: 'var(--terminal-bg)',
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.8rem',
  },
  consoleLine: {
    margin: 0,
    lineHeight: 1.4,
  },
};
