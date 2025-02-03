// -*- coding: utf-8, tab-width: 2 -*-

const EX = {

  invisibleColor: 'none', /*
    While fill="transparent" may work visually in some renderers,
    it seems unreliable for pointer-events="visible". */


  openSvgTag(coord) {
    let svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ';
    const viewBox = [];
    function add(svgProp, cProp) {
      const num = (+coord[cProp] || 0);
      svgTag += svgProp + '="' + num + 'px" ';
      viewBox.push(num);
    }
    add('x', 'top');
    add('y', 'left');
    add('width', 'right');
    add('height', 'bottom');
    svgTag += 'viewBox="' + viewBox.join(' ') + '">';
    return svgTag;
  },


};


// Object.assign(EX, {});
export default EX;
