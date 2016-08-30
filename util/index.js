'use strict';

const Util = {
  isEmptyObject(obj) {
  return obj === undefined || obj === null || typeof obj !== 'object' || Object.keys(obj).length < 1;
}
};

module.exports = Util;