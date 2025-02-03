// -*- coding: utf-8, tab-width: 2 -*-

import kisi from './kisi.mjs';


const EX = {

  cleanupNodeDataInplace(origData) {
    const data = origData;
    if (!data) { return false; }
    EX.cleanupClassInplace(data);
    EX.cleanupTransformInplace(data);
    return data;
  },


  cleanupClassInplace(data, defaultIds, defaultNames) {
    if (!data) { return false; }
    const cls = data.class;
    if (!cls) { return data; }
    kisi.delPropIf(cls, 'id', defaultIds || 'null');
    kisi.delPropIf(cls, 'name', defaultNames || '');
    // eslint-disable-next-line no-param-reassign
    if (!kisi.countKeys(cls)) { delete data.class; }
    return data;
  },


  defaultTransformClassNames: [
    'transformieren', // <- might be specific to the German version of PS.
  ],
  defaultTransformMatrixAsJson: '{"xx":1,"xy":0,"yx":0,"yy":1,"tx":0,"ty":0}',


  cleanupTransformInplace(data) {
    const tr = data.Trnf;
    if (!tr) { return data; }
    EX.cleanupClassInplace(tr, 'Trnf', EX.defaultTransformClassNames);
    const j = JSON.stringify(tr);
    if (j === EX.defaultTransformMatrixAsJson) {
      delete data.Trnf; // eslint-disable-line no-param-reassign
    }
    return data;
  },



};


// Object.assign(EX, {});
export default EX;
