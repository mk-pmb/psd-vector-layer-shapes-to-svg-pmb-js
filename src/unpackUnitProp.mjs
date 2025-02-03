// -*- coding: utf-8, tab-width: 2 -*-

import assert from 'assert/strict';

const expectExactValue = assert.strictEqual;


function orf(x) { return x || false; }


const EX = function unpackUnitProp(obj, keyPfx, wantId, wantUnit, keySuf) {
  const key = keyPfx + keySuf;
  const { id, unit, value } = orf(orf(obj)[key]);
  expectExactValue(id, wantId, key + ' id');
  expectExactValue(unit, wantUnit, key + ' unit');
  return value;
};


export default EX;
