// -*- coding: utf-8, tab-width: 2 -*-

import parseRgbColor from './parseRgbColor.mjs';
import svgCore from './svgCore.mjs';
import unpackUnitProp from './unpackUnitProp.mjs';


const EX = function parseStroke(origStrokeSpec, addAttr) {
  if (!origStrokeSpec) { return false; }
  const { data } = origStrokeSpec;
  if (!data) { return false; }
  const ssVer = data.strokeStyleVersion;
  const impl = EX['parseSsVer' + ssVer];
  if (impl) { return impl(data, addAttr); }
  throw new Error('Unsupported strokeStyleVersion: ' + ssVer);
};


Object.assign(EX, {

  parseSsVer2(data, addAttr) {
    const uup = unpackUnitProp.bind(null, data, 'strokeStyle');

    const stk = {
      // ordered by relevance!
      color: parseRgbColor(data.strokeStyleContent),
      widthPx: uup('#Pxl', 'Pixels', 'LineWidth'),
      opacityPct: uup('#Prc', 'Percent', 'Opacity'),
      filled: data.fillEnabled,
    };

    addAttr(stk.color.hex, 'stroke');
    addAttr(stk.widthPx, 'stroke-width');
    addAttr(stk.opacityPct + '%', 'stroke-opacity');
    addAttr(stk.filled ? stk.color.hex : svgCore.invisibleColor, 'fill');

    return stk;
  },


});


export default EX;
