import Demo from './Demo';
import React from 'react';
import styles from './App.module.css';

const App = () => {
  const dbg = { font: '14px sans-serif', height: '20px' };

  return (
    <div className={styles.app}>
      <Demo isFitting={true} style={dbg}>
        A short text that fits
      </Demo>
      <Demo isFitting={false} style={{ font: '14px sans-serif', height: '20px' }}>
        A very loooooong text that does not fit at all
      </Demo>
      <Demo isFitting={false} style={{ font: 'bold 15px sans-serif', height: '40px' }} delay={1000}>
        A very loooooong text that does not fit at all
      </Demo>
      <Demo isFitting={false} style={{ font: '14px monospace', height: '20px' }} delay={1000}>
        <span className={styles.red}>A very loooooong text</span> <span className={styles.green}>split into multiples nodes</span>
      </Demo>
    </div>
  );
};

export default App;
