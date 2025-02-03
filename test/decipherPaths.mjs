import 'p-fatal';

import libPsd from 'psd-pmb';

import svgCore from '../src/svgCore.mjs';
import describeNode from '../src/describeNode.mjs';


async function cliMain(argv) {
  const psdTree = (await libPsd.fromFile(argv[2])).tree();
  console.log(svgCore.openSvgTag(psdTree.coords));
  describeNode.subNodesOf({ indent: '' }, psdTree);
  console.log('</svg>');
}


cliMain(process.argv);
