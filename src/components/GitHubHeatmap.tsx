import React from 'react';

export const GitHubHeatmap: React.FC = () => {
  // Generate mock data for 53 weeks x 7 days
  const weeks = 53;
  const days = 7;
  
  // Custom levels for green shading
  const getContributionColor = (level: number) => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      switch (level) {
        case 0: return '#f1f0ea'; // warm paper-grey
        case 1: return '#e1d5ba'; // very light gold
        case 2: return '#c5a059'; // light gold
        case 3: return '#a37c35'; // medium gold
        case 4: return '#73521b'; // deep gold/bronze
        default: return '#f1f0ea';
      }
    } else {
      switch (level) {
        case 0: return '#161b22'; // github dark gray
        case 1: return '#0e4429'; // light green
        case 2: return '#006d32'; // medium green
        case 3: return '#26a641'; // dark green
        case 4: return '#39d353'; // neon green
        default: return '#161b22';
      }
    }
  };

  // Generate grid values (random levels, but weighted toward some active patterns)
  const grid: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const weekDays: number[] = [];
    for (let d = 0; d < days; d++) {
      // Create some variance: weekends have fewer commits, middle weeks have high commits
      const randomSeed = Math.random();
      let level = 0;
      if (d === 0 || d === 6) {
        level = randomSeed > 0.7 ? Math.floor(Math.random() * 3) : 0; // weekends
      } else {
        level = randomSeed > 0.2 ? Math.floor(Math.random() * 5) : 0; // weekdays
      }
      weekDays.push(level);
    }
    grid.push(weekDays);
  }

  return (
    <div className="glass-panel" style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title} className="gradient-text">GitHub Contributions</h4>
        <span style={styles.userName}>@PREM03072007</span>
      </div>

      {/* Heatmap Grid */}
      <div style={styles.heatmapScroll}>
        <div style={styles.grid}>
          {grid.map((week, wIdx) => (
            <div key={wIdx} style={styles.weekColumn}>
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    ...styles.daySquare,
                    backgroundColor: getContributionColor(level),
                  }}
                  title={`Level ${level} activity`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Stats */}
      <div style={styles.footer}>
        <div style={styles.stats}>
          <span style={styles.statItem}><strong>3,248</strong> commits</span>
          <span style={styles.statItem}>Streak: <strong>45 days</strong></span>
        </div>
        
        <div style={styles.legend}>
          <span style={styles.legendLabel}>Less</span>
          <div style={{ ...styles.legendSquare, backgroundColor: getContributionColor(0) }} />
          <div style={{ ...styles.legendSquare, backgroundColor: getContributionColor(1) }} />
          <div style={{ ...styles.legendSquare, backgroundColor: getContributionColor(2) }} />
          <div style={{ ...styles.legendSquare, backgroundColor: getContributionColor(3) }} />
          <div style={{ ...styles.legendSquare, backgroundColor: getContributionColor(4) }} />
          <span style={styles.legendLabel}>More</span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '1.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 800,
    margin: 0,
  },
  userName: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
  },
  heatmapScroll: {
    overflowX: 'auto',
    width: '100%',
    paddingBottom: '0.4rem',
  },
  grid: {
    display: 'flex',
    gap: '3px',
    minWidth: '680px',
  },
  weekColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  daySquare: {
    width: '10px',
    height: '10px',
    borderRadius: '2px',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.8rem',
    marginTop: '0.2rem',
    borderTop: '1px solid var(--glass-border)',
    paddingTop: '0.8rem',
  },
  stats: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  statItem: {
    display: 'inline-block',
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  legendLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    margin: '0 4px',
  },
  legendSquare: {
    width: '9px',
    height: '9px',
    borderRadius: '2px',
  },
};
