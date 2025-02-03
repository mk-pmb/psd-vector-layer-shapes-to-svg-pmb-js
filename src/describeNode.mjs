// -*- coding: utf-8, tab-width: 2 -*-

import xmlesc from 'xmlunidefuse';

import describeLayer from './describeLayer.mjs';


const EX = function describeNode(state, node) {
  const nodeType = node.type;
  const ind = state.indent;
  let g = '';

  function addAttr(v, k) {
    if (v === undefined) { return; }
    if (v === null) { return; }
    g += ' ' + k + '="' + xmlesc(v) + '"';
  }
  Object.assign(addAttr, {
    br() { g += '\n   ' + ind; },
    cls: ['psd-' + nodeType],
    data(v, k) { return addAttr(v, 'data-' + k); },
    raw(s) { g += s; },
  });

  EX.nodeEarlyKeysOrder.forEach(k => addAttr.data(node[k], k));
  describeLayer.describeLayerCoords(node, addAttr);

  if (node.leftOffset || node.topOffset) {
    addAttr.br();
    addAttr.data(node.leftOffset, 'offset-left');
    addAttr.data(node.topOffset, 'offset-top');
  }

  addAttr.br();
  const layer = { ...node.layer };
  EX.layerLateDataKeysOrder.forEach(function maybeAdd(k) {
    const v = layer[k];
    if (v === EX.layerPropDefaults[k]) { return; }
    addAttr.data(v, k);
  });

  const report = { svgHead: '', svgTail: '' };
  let hasDetails = node.hasChildren();
  if (nodeType === 'layer') {
    if (hasDetails) { throw new Error('Layers must not have children!'); }
    Object.assign(report, describeLayer(node, addAttr));
    if (report.isVectorLayer) { hasDetails = true; } // the path(s)
  }

  report.svgHead = (ind + ('<g class="' + addAttr.cls.join(' ')
    + '"' + g).trim() + (hasDetails ? '' : ' /') + '>\n');
  if (!hasDetails) { return report; }
  EX.subNodesOf({ ...state, indent: ind + '  ' }, node);
  report.svgTail = (ind + '</g><!-- /' + nodeType + ' "'
    +  xmlesc(node.name || '') + '" -->\n');

  console.debug(nodeType, node.name, report);
  return report;
};


Object.assign(EX, {

  nodeEarlyKeysOrder: [
    'type',
    'name',
    'legacyName',
  ],


  layerLateDataKeysOrder: [
    // 'mask',
    // 'blendingRanges',
    // 'adjustments',
    // 'channelsInfo',
    // 'blendMode',
    'groupLayer',
    // 'infoKeys',
    'channels',
    // 'rows',
    // 'cols',
    'opacity',
    'visible',
    'clipped',
    // 'layerEnd',

    // 'vectorStroke',
    // 'vectorStrokeContent',
    // 'vectorMask',
    // 'vectorOrigination',

    // 'layerId',
    // 'blendClippingElements',
    // 'blendInteriorElements',
    // 'locked',
    // 'metadata',
    // 'image',
  ],


  layerPropDefaults: {
    channels: 4,
    clipped: false,
    opacity: 255,
    visible: true,
  },


  subNodesOf(subState, node) {
    const ch = node.children();
    ch.reverse();
    return ch.map(EX.bind(null, subState));
  },


});


export default EX;
