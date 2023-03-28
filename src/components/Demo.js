import React, { useCallback, useState } from 'react';
import TextScroller, { SCROLL_INTERVAL, START_DELAY } from './TextScroller';
import PropTypes from 'prop-types';
import Timer from './Timer';
import styles from './Demo.module.css';

const Demo = ({ children, className, delay = START_DELAY, infinite = false, speed = SCROLL_INTERVAL, style }) => {
  const [isFitting, setIsFitting] = useState(true);
  const [isTimerOn, setIsTimerOn] = useState(false);

  const handleOnAbort = useCallback(() => {
    setIsTimerOn(false);
  }, []);

  const handleOnEnd = useCallback(() => {
    setIsTimerOn(false);
  }, []);

  const handleOnHover = useCallback(() => {
    if (!isFitting) {
      setIsTimerOn(true);
    }
  }, [isFitting]);

  const handleOnInitialized = useCallback((isFitting) => {
    setIsFitting(isFitting);
  }, []);

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.description}>
        <span className={styles.label}>Text fits?</span>
        <span>
          {isFitting ? 'yes' : 'no'} &rarr; {isFitting ? '❌' : '✅'} scroll
        </span>
        <span className={styles.label}>Style:</span>
        <div className={`${styles.multiline} ${styles.columns2} ${styles.css}`}>
          {Object.entries(style).map(([key, value]) => (
            <React.Fragment key={key}>
              <span>{key}:</span>
              <span>{value}</span>
            </React.Fragment>
          ))}
        </div>
        <span className={styles.label}>Props:</span>
        <div className={`${styles.multiline} ${styles.columns3}`}>
          <span>delay:</span>
          <span className={styles.rightAligned}>{delay}ms</span>
          <span>{delay === START_DELAY && <span className={styles.default}>(default)</span>}</span>
          <span>speed:</span>
          <span className={styles.rightAligned}>{speed}ms</span>
          <span>{speed === SCROLL_INTERVAL && <span className={styles.default}>(default)</span>}</span>
          <span>infinite:</span>
          <span className={styles.rightAligned}>{infinite.toString()}</span>
          <span>{!infinite && <span className={styles.default}>(default)</span>}</span>
        </div>
      </div>
      <Timer duration={delay} isOn={isTimerOn} />
      <div className={`${styles.demo} ${className ?? ''}`}>
        <TextScroller delay={delay} infinite={infinite} onAbort={handleOnAbort} onEnd={handleOnEnd} onHover={handleOnHover} onInitialized={handleOnInitialized} speed={speed} style={style}>
          <span style={style}>{children}</span>
        </TextScroller>
      </div>
    </div>
  );
};

Demo.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  infinite: PropTypes.bool,
  speed: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Demo;
