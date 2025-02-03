// -*- coding: utf-8, tab-width: 2 -*-

import loMapValues from 'lodash.mapvalues';

const numFin = Number.isFinite;

const EX = function parseRgbColor(obj) {
  if (!obj) { return false; }
  const clr = obj['Clr '];
  if (!clr) { return false; }
  let hex = '';
  const rgb = loMapValues({
    r: 'Rd  ',
    g: 'Grn ',
    b: 'Bl  ',
  }, function parseColorChannel(c, k) {
    let v = clr[c];
    if (!numFin(v)) { throw new Error('Non-number for color component ' + k); }
    v = Math.round(v);
    v = Math.min(v, 255);
    v = Math.max(v, 0);
    hex += ('00' + v.toString(16)).slice(-2);
    return v;
  });
  rgb.hex = '#' + hex.toUpperCase();
  return rgb;
};


export default EX;
