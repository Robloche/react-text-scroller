import TextScroller, { SCROLL_INTERVAL, START_DELAY } from './components/TextScroller';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styles from './Demo.module.css';

const Demo = ({ children, delay = START_DELAY, isFitting, speed = SCROLL_INTERVAL, style }) => {
  const styleStr = React.useMemo(
    () =>
      Object.entries(style)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', '),
    [style]
  );

  const handleOnAbort = useCallback(() => {
    console.log('onAbort');
  }, []);

  const handleOnEnd = useCallback(() => {
    console.log('onEnd');
  }, []);

  const handleOnHover = useCallback(() => {
    console.log('onHover');
  }, []);

  const handleOnStart = useCallback(() => {
    console.log('onStart');
  }, []);

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.description}>
        <span className={styles.label}>Text fits?</span>
        <span>
          {isFitting ? 'yes' : 'no'} --&gt; scroll {isFitting ? 'disabled' : 'enabled'}
        </span>
        <span className={styles.label}>Style:</span>
        <span className={styles.code}>
          {`{`} {styleStr} {`}`}
        </span>
        <span className={styles.label}>Props:</span>
        <span>
          delay: {delay}ms {delay === START_DELAY && '(default)'}, speed: {speed}ms {speed === SCROLL_INTERVAL && '(default)'}
        </span>
      </div>
      <div className={styles.demo}>
        <TextScroller delay={delay} onAbort={handleOnAbort} onEnd={handleOnEnd} onHover={handleOnHover} onStart={handleOnStart} speed={speed} style={style}>
          <span style={style}>{children}</span>
        </TextScroller>
      </div>
    </div>
  );
};

Demo.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.node]).isRequired,
  delay: PropTypes.number,
  isFitting: PropTypes.bool.isRequired,
  speed: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Demo;
