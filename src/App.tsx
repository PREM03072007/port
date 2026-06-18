import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { AIChatbot } from './components/AIChatbot';
import { ResumeModal } from './components/ResumeModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mouseCoords, setMouseCoords] = useState({ x: -1000, y: -1000 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync theme with document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen for global open-resume event
  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  // Track cursor position for the spotlight hover aura
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll progress percent
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="page-container" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Scroll Progress Bar at the top */}
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              height: '3.5px', 
              width: `${scrollProgress}%`, 
              background: 'var(--accent-gradient)', 
              zIndex: 2000, 
              transition: 'width 0.15s ease-out' 
            }} 
          />
          {/* Static Ambient Blobs */}
          <div className="bg-blob blob-cyan" />
          <div className="bg-blob blob-purple" />

          {/* Mouse Follow Light Aura */}
          <div 
            className="spotlight-aura" 
            style={{ 
              left: `${mouseCoords.x}px`, 
              top: `${mouseCoords.y}px` 
            }} 
          />

          <ParticleBackground />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <main style={{ position: 'relative', zIndex: 5 }}>
            <Hero toggleTheme={toggleTheme} />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Education />
            <Contact />
          </main>

          <Footer />
          <ThemeCustomizer />
          <AIChatbot />
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>
      )}
    </>
  );
}

export default App;
