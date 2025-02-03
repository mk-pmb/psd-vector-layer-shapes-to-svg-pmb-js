// -*- coding: utf-8, tab-width: 2 -*-
/*

This decipher module is laser-focussed on the paths that this here module
reconstructs from PSD vector layers, which aims to imitate what PhotoShop
would save when you ask it to export the paths of your vector layer.

If instead you want a more general decipher function that tries to make
sense of arbitrary paths, try `svg-path-to-shape-pmb`.

*/

const EX = function decipherPathSegments(origRawPaths) {
  const svgPath = Object.create({
    getOrigRawPaths() { return origRawPaths; },
  });
  return svgPath;
};


Object.assign(EX, {
});


export default EX;
