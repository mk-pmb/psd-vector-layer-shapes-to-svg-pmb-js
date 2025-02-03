// -*- coding: utf-8, tab-width: 2 -*-

import decipherPathSegments from './decipherPathSegments.mjs';
import parseRgbColor from './parseRgbColor.mjs';
import parseStroke from './parseStroke.mjs';


function orf(x) { return x || false; }


const EX = function describeLayer(node, addAttr) {
  const origination = orf(node.get('vectorOrigination')).data;
  const isVectorLayer = !!origination;
  const layer = { isVectorLayer: !!origination };
  // eslint-disable-next-line no-param-reassign
  addAttr.cls.push((isVectorLayer ? '' : 'not-') + 'vector-layer');
  if (!isVectorLayer) { return layer; }

  const keyDescr = EX.unpackOriginalKeyDescriptor(origination); /*
    Extract early in order to fail early if unsupported. */

  const { origRawPaths, ...mask } = EX.parseMask(
    node.get('vectorMask'), addAttr);
  const { filled, ...stroke } = parseStroke(
    node.get('vectorStroke'), addAttr, mask);
  const vectorContent = orf(node.get('vectorStrokeContent')).data;
  // eslint-disable-next-line no-param-reassign
  mask.flagClasses.forEach(c => addAttr.cls.push('mask-' + c));

  const svgPath = decipherPathSegments(origRawPaths);

  const report = {
    isVectorLayer: true,
    stroke,
    fill: { ...parseRgbColor(vectorContent), enabled: filled },
    keyDescr,
    svgPath,
  };
  return report;
};


Object.assign(EX, {

  coordKeyOrder: ['top', 'left', 'width', 'height', 'bottom', 'right'],

  describeLayerCoords(node, addAttr) {
    if (node.type !== 'layer') { return false; }
    const { layer } = node;
    const coords = { ...layer, ...node.coords };
    EX.coordKeyOrder.forEach(k => addAttr.data(coords[k], k));
    const hasRelevantLayerCoords = EX.coordKeyOrder.some(function check(k) {
      const lv = layer[k];
      if (!lv) { return; }
      const cv = coords[k];
      if (lv === cv) { return; }
      return true;
    });
    if (hasRelevantLayerCoords) {
      addAttr.br();
      EX.coordKeyOrder.forEach(k => addAttr.data(layer[k], 'layer-' + k));
    }
  },


  unpackOriginalKeyDescriptor(origination) {
    const kdl = orf(origination.keyDescriptorList);
    const nkd = (+kdl.length || 0);
    if (nkd === 1) { return kdl[0]; }
    throw new Error('Expected exactly one keyDescriptor, not ' + nkd);
  },


  parseMask(mask) {
    if (!mask) { return false; }
    const {
      disable,
      invert,
      notLink,
      paths,
      ...unsupp
    } = mask.export();
    if (unsupp.length) {
      const keys = Object.keys(unsupp).join(', ');
      throw new Error('Unsupported mask properties: ' + keys);
    }
    const report = {
      enable: !disable,
      inverted: invert,
      linked: !notLink,
      origRawPaths: paths,
    };
    report.flagClasses = [
      (disable ? 'disabled' : 'enabled'),
      (invert ? 'inverted' : 'not-inverted'),
      (notLink ? 'not-linked' : 'linked'),
    ];
    return report;
  },


});


export default EX;
