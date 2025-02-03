// -*- coding: utf-8, tab-width: 2 -*-

const kisi = {

  delPropIf(o, k, x) {
    if (!o) { return o; }
    const v = o[k];
    // eslint-disable-next-line no-param-reassign
    if ((v === x) || (Array.isArray(x) && v.includes(x))) { delete o[k]; }
    return o;
  },

  countKeys(x) { return +Object.keys(x || false).length || 0; },


};


// Object.assign(kisi, {});
export default kisi;
