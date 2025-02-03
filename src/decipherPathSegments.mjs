// -*- coding: utf-8, tab-width: 2 -*-
/*

This decipher module is laser-focussed on the paths that this here module
reconstructs from PSD vector layers, which aims to imitate what PhotoShop
would save when you ask it to export the paths of your vector layer.

If instead you want a more general decipher function that tries to make
sense of arbitrary paths, try `svg-path-to-shape-pmb`.

*/

import getOwn from 'getown';
import mustBe from 'typechecks-pmb/must-be.js';
import objPop from 'objpop';

import kisi from './kisi.mjs';
import psdDefs from './psdDefs.mjs';
import psdNodeUtil from './psdNodeUtil.mjs';


const EX = function decipherPathSegments(origKeyDescr, origRawPaths) {
  const keyDescr = psdNodeUtil.cleanupNodeDataInplace(origKeyDescr);
  kisi.delPropIf(keyDescr, 'keyOriginIndex', 0);
  kisi.delPropIf(keyDescr, 'keyOriginResolution', 72);

  const hiddenApi = {
    getKeyDescr() { return keyDescr; },
    getOrigRawPaths() { return origRawPaths; },
  };
  const svgPath = Object.create(hiddenApi);

  const kdPop = objPop.d(keyDescr, { mustBe });
  const kdMustPop = kdPop.mustBe;

  const typeName = getOwn.voc(psdDefs.keyOriginTypeEnum,
    kdMustPop('undef | pos num', 'keyOriginType'));

  const unusedKeys = kdPop.remainingKeys().join(' ');
  Object.assign(svgPath, {
    typeName,
    ...(unusedKeys.length && { unusedKeys }),
    ...keyDescr,
  });
  return svgPath || kisi;
};


Object.assign(EX, {
});


export default EX;
