'use strict';

require('p-fatal');

const libPsd = require('psd-pmb');

async function cliMain() {
  const psdFile = await libPsd.fromFile(process.argv[2]);
  const tree = {
    document: null,
    ...psdFile.tree().export(),
  };
  let json = JSON.stringify(tree, null, 2);

  json = json.replace(/\n( +)\{\n[\n -z]{0,128}\}/g, function f(orig, indent) {
    const oneline = indent + orig.trim().replace(/\n\s*/g, ' ');
    if (oneline.length >= 80) { return orig; }
    return '\n' + oneline;
  });
  json = json.replace(/((?:^| {2})\{)\n\s*/g, '$1 ');
  console.log(json);
}

cliMain();
