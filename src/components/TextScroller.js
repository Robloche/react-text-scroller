import * as React from 'react';
import { getRecursiveChildText, measureTextWidth } from './helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TextScroller.module.css';
import useElementRect from './use-element-rect';

// Delay between mouse hovering the text and start of scrolling (in ms)
export const START_DELAY = 500;

// Interval between 2 scroll steps (in ms)
export const SCROLL_INTERVAL = 20;

const TextScroller = ({ children, delay = START_DELAY, onAbort, onHover, onEnd, onStart, speed = SCROLL_INTERVAL, style }) => {
  const [leftPct, setLeftPct] = useState(0);
  const [elementRect, elementRef] = useElementRect();
  const hoverTimerId = useRef(null);
  const scrollingIntervalId = useRef(null);

  const { isTruncated, requiredWidth } = React.useMemo(() => {
    if (elementRect === null) {
      // Not ready
      return { isTruncated: false, requiredWidth: 1 };
    }

    const { width } = elementRect;
    const text = getRecursiveChildText(children);
    const textWidth = measureTextWidth(width, style, text);
    return { isTruncated: textWidth > width, requiredWidth: textWidth };
  }, [children, elementRect, style]);

  const translate = useCallback(() => {
    setLeftPct((currentLeftPct) => currentLeftPct - 1);
  }, [setLeftPct]);

  const stopScrolling = useCallback(() => {
    clearInterval(scrollingIntervalId.current);
    setLeftPct(0);
  }, [setLeftPct]);

  const startScrolling = useCallback(() => {
    if (typeof onStart !== 'undefined') {
      onStart();
    }
    scrollingIntervalId.current = setInterval(translate, speed);
  }, [translate]);

  useEffect(() => {
    if (leftPct <= -requiredWidth) {
      // Animation finished
      stopScrolling();
      if (typeof onEnd !== 'undefined') {
        onEnd();
      }
    }
  }, [leftPct, requiredWidth, stopScrolling]);

  const handleOnMouseEnter = useCallback(() => {
    if (typeof onHover !== 'undefined') {
      onHover();
    }
    hoverTimerId.current = setTimeout(startScrolling, delay);
  }, [startScrolling]);

  const handleOnMouseLeave = useCallback(() => {
    if (hoverTimerId.current) {
      clearTimeout(hoverTimerId.current);
    }
    stopScrolling();
    if (typeof onAbort !== 'undefined') {
      onAbort();
    }
  }, [stopScrolling]);

  return (
    <div className={styles.wrapper} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} ref={elementRef}>
      {isTruncated ? <div style={{ transform: `translateX(${leftPct}px)` }}>{children}</div> : children}
    </div>
  );
};

TextScroller.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.node]).isRequired,
  delay: PropTypes.number,
  onAbort: PropTypes.func,
  onEnd: PropTypes.func,
  onHover: PropTypes.func,
  onStart: PropTypes.func,
  speed: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default TextScroller;
