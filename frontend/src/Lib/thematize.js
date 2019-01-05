/**
 * Generates BEM-like classnames
 * @example
 *
 * classnamesGen('container', {
  *   visible: true,
  *   width: 'auto',
  *   sticked: false
  * });
  * // => ['container', 'container_visible', 'container_width_auto']
  *
  * @param {string} classname
  * @param {Object} mods
  * @returns {Array.<string>}
  */
 export function classnamesGen(classname, mods) {
   const classmods = Object.keys(mods).map((mod) => {
     const value = mods[mod];
     let classmod;
 
     if (value === false || value === undefined) {
       classmod = '';
     } else if (value === true) {
       classmod = `${classname}_${mod}`;
     } else {
       classmod = `${classname}_${mod}_${value}`;
     }
 
     return classmod;
   }).filter(str => str.length);
 
   return [classname, ...classmods];
 }
 
 /**
  * Returns matching styles from stylesheet
  * @param {Object.<string, string>} styles
  * @param {string} classname
  * @param {Object} mods
  * @returns {string}
  */
 export function theme(styles, classname, mods = {}) {
   return classnamesGen(classname, mods).map(clsName => styles[clsName]).join(' ');
 }
 
 /**
  * Returns theme
  * @param {Object} styles
  * @returns {function(): string}
  */
 export default function (styles) {
   return (classname, mods) => theme(styles, classname, mods);
 }