import PropTypes from 'prop-types';
import React from 'react';
import styles from './Timer.module.css';

const Timer = ({ duration, isOn }) => (
  <div className={styles.timerWrapper}>
    <div className={`${styles.timer} ${isOn ? styles.animate : ''}`} style={{ '--duration': `${duration}ms` }} />
  </div>
);

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  isOn: PropTypes.bool.isRequired,
};

export default Timer;
