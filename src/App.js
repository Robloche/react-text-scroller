import Demo from './Demo';
import React from 'react';
import styles from './App.module.css';

const App = () => (
  <div className={styles.app}>
    <Demo style={{ font: '14px sans-serif' }}>A short text that fits</Demo>
    <Demo style={{ font: '14px sans-serif' }}>A very loooooong text that does not fit at all</Demo>
    <Demo style={{ font: 'bold 18px sans-serif', textTransform: 'uppercase' }} delay={1000}>
      A very loooooong text that does not fit at all
    </Demo>
    <Demo style={{ font: '14px monospace' }} delay={1000}>
      <span className={styles.red}>A very loooooong text</span> <span className={styles.green}>split into multiples nodes</span>
    </Demo>
    <Demo style={{ font: '32px serif' }} speed={50}>
      Yet another long text
    </Demo>
    <Demo delay={0} speed={10} style={{ font: 'bold 18px sans-serif' }} infinite>
      A very loooooong text that does not fit at all
    </Demo>
  </div>
);

export default App;
