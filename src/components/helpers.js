import styles from './TextScroller.module.css';

const getRecursiveChildText = (node) => {
  if (node === null) {
    return '';
  }

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    const joinedNodes = [];
    node.forEach((n) => {
      if (typeof n === 'object') {
        joinedNodes.push(getRecursiveChildText(n));
      } else if (typeof n === 'string') {
        joinedNodes.push(n);
      }
    });
    return joinedNodes.join('');
  }

  const {
    props: { children },
  } = node;

  if (typeof children === 'object') {
    return getRecursiveChildText(children);
  }

  if (typeof children === 'string') {
    return children;
  }

  return '';
};

const measureTextWidth = (availableWidth, style, text = '') => {
  if (text === '') {
    return 0;
  }

  const div = document.createElement('DIV');
  div.innerHTML = text;
  Object.entries(style).forEach(([key, value]) => {
    div.style[key] = value;
  });
  div.classList.add(styles['elementMeasure']);

  document.body?.appendChild(div);
  const width = div.offsetWidth;
  //document.body?.removeChild(div);

  return width;
};

export { getRecursiveChildText, measureTextWidth };
