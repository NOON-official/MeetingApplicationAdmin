import isBrowser from './isBrowser';

/**
 * localStorage 추상화를 통해 안전하게 접근
 */
const browserStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: (key) => (isBrowser ? localStorage.getItem(key) : null),
  setItem: (key, val) => {
    if (isBrowser) {
      localStorage.setItem(key, val);
    }
  },
  removeItem: (key) => {
    if (isBrowser) {
      localStorage.removeItem(key);
    }
  },
};

export default browserStorage;
