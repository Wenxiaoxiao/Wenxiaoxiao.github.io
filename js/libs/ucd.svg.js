;(function(root, $, undefined) {
 'use strict';

// patch Function.bind for IE8
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

Array.prototype.filter = Array.prototype.filter || function(cb) {
 var ret = [];
  for (var i = 0, len = this.length; i < len; i++) {
    if (cb(this[i])) {
      ret.push(this[i]);
    }
  }
  return ret;
};

Array.prototype.map = Array.prototype.map || function(cb) {
  var ret = [];
  for (var i = 0, len = this.length; i < len; i++) {
    ret.push(cb(this[i], i, this));
  }
  return ret;
};

Array.prototype.indexOf = Array.prototype.indexOf || function(val) {
  for (var i = 0, len = this.length; i < len; i++) {
    if (this[i] === val) {
      return i;
    }
  }
  return -1;
};

var UCD = root.UCD || (root.UCD = {});

var doc = document, 
 EPS = 1e-6, 
 userAgent = navigator.userAgent,
 isOpera = window.opera,
 isIE = /(msie|trident)/i.test(userAgent) && !isOpera,
 IE8 = doc.documentMode === 8,
 toString = Object.prototype.toString, 
 hasOwn = Object.prototype.hasOwnProperty, 
 // log = window.console ? console.log.bind(console) : $.noop, 
 extend = $.extend, 
 isPlainObject = $.isPlainObject, 
 isArray = $.isArray, 
 each = $.each, 
 map = $.map, 
 isNumeric = $.isNumeric, 
 RE_LETTER = /[a-zA-Z]/, 
 RE_COLOR = /((rgb|hsl|hsb)(a?))\(([^\)]+)\)/i, 
 RE_RADIAL_GRADIENT = /^r(?:\(([^\)]+?)\))?/i, // 匹配：r(0.25, 0.75)#fff-#000
 RE_COLOR_OFFSET = /^([^:]*):?([\d\.]*)/, // 匹配：#def:20
 RE_SPACE_SEPERATOR = /\s+/, 
 RE_DASH_SEPTERATOR = /\s*\-\s*/, 
 RE_COMMA_SEPTERATOR = /\s*,\s*/,

 // http://www.w3.org/TR/SVG/paths.html#DAttribute
 // M m
 // Z z
 // L l, H h, V v
 // C c, S s
 // Q q, T t
 // A a
 // TODO: r?
 // 
 // RE_PATH_VALUES = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig, 
 RE_PATH_VALUES = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0]*/ig, 
 // RE_PATH = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, 
 RE_PATH = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0]*)+)/ig;


var SVG = UCD.SVG = {
 NS: 'http://www.w3.org/2000/svg', 
 NAMESPACES: {
  'svg': 'http://www.w3.org/2000/svg', 
  'xml': 'http://www.w3.org/2000/xmlns/', 
  'xlink': 'http://www.w3.org/1999/xlink'
 }
};

var supportSVG = SVG.supportSVG = !!doc.createElementNS && !!doc.createElementNS(SVG.NS, 'svg').createSVGRect;
var supportSMIL = SVG.supportSMIL = !!doc.createElementNS && /SVGAnimate/.test(toString.call(doc.createElementNS(SVG.NS, 'animate')));

var FX_INTERVAL = 13,
  fxNow;

function createFxNow() {
  setTimeout(function() {
    fxNow = undefined;
  }, 0);
  return (fxNow = (+new Date()));
}

function rad(deg) {
  return deg * Math.PI / 180;
}

function deg(rad) {
  return rad * 180 / Math.PI;
}

// 将一个角度转换为(x1,y1)-(x2,y2)直线和水平的夹角
// 用于定义渐变曲线
function vectorAngle(angle) {
  var r = rad(angle);
  var vector = [0, 0, Math.cos(rad(angle)), Math.sin(rad(angle))],
    max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1);
  vector[2] *= max;
  vector[3] *= max;
  if (vector[2] < 0) {
    vector[0] = -vector[2];
    vector[2] = 0;
  }
  if (vector[3] < 0) {
    vector[1] = -vector[3];
    vector[3] = 0;
  }

  return vector;
}

// 这里只是简单的解析格式，而不校验格式。如果发现解析的效果不对，可以debug解析出来的值
function parseColor(color) {
 var matches = RE_COLOR.exec(color), rgba;
 if (matches && matches[3].toLowerCase() === 'a' && matches[4]) {
  rgba = matches[4].split(RE_COMMA_SEPTERATOR);

  if (rgba.length >= 4) {
   return {
    color: matches[2] + '(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')', 
    opacity: parseFloat(rgba[3])
   };
  }
 }

 return {
  color: color
 };
}

function setFillOrStroke(tag, elem, key, val) {
 var fillElem = elem.getElementsByTagName(tag);
 if (fillElem.length) {
  fillElem = fillElem[0];

  if (val === undefined) {
   return fillElem[key];
  } else {
   fillElem[key] = val;
  }
 } else {
  var attrs = {};
  attrs[key] = val;

  fillElem = VML.create(tag, attrs, elem);
 }
}

function setFillOpacity(elem, key, val) {
 setFillOrStroke('fill', elem, 'opacity', val);
}

function setStrokeOpacity(elem, key, val) {
 setFillOrStroke('stroke', elem, 'opacity', val);
}

function setStrokeDashStyle(elem, key, val) {
 setFillOrStroke('stroke', elem, 'dashstyle', val);
}

function setStyle(elem, key, val) {
 css(elem, key, val);
}

var attrHooks = {
 'd': {
  set: _pathToString
 }
};

var attrHooksVML = {
 'fill': {
  set: function(elem, val) {
   return elem['fillcolor'] = val;
  }, 
  get: function(elem) {
   return elem['fillcolor'];
  }
 }, 
 'stroke': {
  set: function(elem, val) {
   return elem['strokecolor'] = val;
  }, 
  get: function(elem) {
   return elem['strokecolor'];
  }
 }, 
 'stroke-width': {
  set: function(elem, val) {
   return elem['strokeweight'] = val;
  }, 
  get: function(elem) {
   return elem['strokeweight'];
  }
 }, 
 'fill-opacity': {
  set: setFillOpacity, 
  get: function(elem) {
   return setFillOrStroke('fill', elem, 'opacity');
  }
 }, 
 'stroke-opacity': {
  set: setStrokeOpacity, 
  get: function(elem) {
   return setFillOrStroke('stroke', elem, 'opacity');
  }
 },
 'stroke-dasharray': {
  set: setStrokeDashStyle, 
  get: function(elem) {
   return setFillOrStroke('stroke', elem, 'dashstyle');
  }
 },
 'font-size': {
  set: setStyle, 
  get: function(elem) {
   return css(elem, 'font-family');
  }
 }, 
 'font-family': {
  set: setStyle, 
  get: function(elem) {
   return css(elem, 'font-family');
  }
 }
};


// function (elem, key, value) {
//  var vmlAttrs = {}, replaced;

//  for (var key in attrs) {
//   replaced = attrHooksVML[key];
//   if ($.isFunction(replaced)) {
//    replaced(elem, key, attrs[key]);
//   } else {
//    vmlAttrs[replaced || key] = attrs[key];
//   }
//  }

//  attr(elem, vmlAttrs);
// }

function create(tag, attrs, parentNode) {
 var elem = doc.createElementNS(SVG.NS, tag);

 if (attrs) {
  attr(elem, attrs);
 }

 if (parentNode) {
  append(parentNode, elem);
 }

 return elem;
}



var RE_OVAL = /^(r|rx|ry|cx|cy)$/i, OVAL_ATTR_PREFIX = 'data-';

var ovalGetterAndSetter = {
 get: function(elem, key) {
  return parseFloat(elem[OVAL_ATTR_PREFIX + key]);
 }, 
 set: function(elem, key, value) {
  var cx, cy, r, rx, ry;
  cx = parseFloat(elem[OVAL_ATTR_PREFIX + 'cx']);
  cy = parseFloat(elem[OVAL_ATTR_PREFIX + 'cy']);
  r = parseFloat(elem[OVAL_ATTR_PREFIX + 'r']);
  if (!isNaN(r)) {
   rx = ry = r;
  } else {
   rx = parseFloat(elem[OVAL_ATTR_PREFIX + 'rx']);
   ry = parseFloat(elem[OVAL_ATTR_PREFIX + 'ry']);
  }

  if (!isNaN(cx) && !isNaN(cy) && !isNaN(rx) && !isNaN(ry)) {
   css(elem, {
    'left': cx - rx, 
    'top': cy - ry, 
    'width': rx * 2, 
    'height': ry * 2
   });
  }

  return elem;
 }
};

function attr(elem, key, value) {
 var attrHook, ret, found, ns;

 if (value === undefined) {
  if (isPlainObject(key)) {
   for (var k in key) {
    attr(elem, k, key[k]);
   }
   return elem;
  } else {
   if (elem.tagName === 'oval' && RE_OVAL.test(key)) {
    return ovalGetterAndSetter.get(elem, key);
   }

   ret = elem.getAttribute(key); // IE8 ? elem[key] :

   if (IE8) {
    attrHook = attrHooksVML[key] || {};
    if (attrHook && attrHook.get) {
     return attrHook.get(elem);
    }
    return ret;
   } else {
    attrHook = attrHooks[key] || {};
    return attrHook.get ? attrHook.get(ret, elem) : ret;
   }
  }
 }

 if (value !== null) {
  if (elem.tagName === 'oval' && RE_OVAL.test(key)) {
   elem['data-' + key] = value; // TODO: move into ovalGetterAndSetter
   return ovalGetterAndSetter.set(elem, key, value);
  }

  attrHook = attrHooks[key] || {};
  value = attrHook.set ? attrHook.set(value, elem) : value;

  found = key.indexOf(':');
  if (found !== -1) {
   ns = key.substring(0, found).toLowerCase();
   if (SVG.NAMESPACES[ns]) {
    elem.setAttributeNS(SVG.NAMESPACES[ns], key.substring(found + 1), value);

    return elem;
   }
  }

  if (IE8) {
   if (key === 'class') {
    elem.className = value;
   } else if (key === 'd') {
    elem['path'] = value;
   } else {
    attrHook = attrHooksVML[key] || {};
    if (attrHook && attrHook.set) {
     attrHook.set(elem, value);
    } else {
     elem[key] = value;
    }
   }
  } else {
   elem.setAttribute(key, value);
  }
 }
 
 return elem;
}

function removeAttr(elem, key) {
  elem.removeAttribute(key);

  return elem;
}

// 支持append html
function append(parentNode, childNodes) {
 if (typeof childNodes === 'string') {
  // parse nodes
 }
 if (isArray(childNodes)) {
  each(childNodes, function(i, childNode) {
   append(parentNode, childNode);
  });
  return parentNode;
 }

 parentNode.appendChild(childNodes);
 return parentNode;
}

function css(elem, key, value) {
 if (value === undefined) {
  if (isPlainObject(key)) {
   for (var k in key) {
    css(elem, k, key[k]);
   }

   return elem;
  } else {
   return elem.style[key];
  }
 }

 if (value === '') {
  delete elem.style[key];
 } else {
  elem.style[key] = value;
 }
 
 return elem;
}

function addClass(elem, classNames) {
 return _toggleClass(elem, classNames, 1);
}

function removeClass(elem, classNames) {
 return _toggleClass(elem, classNames, -1);
}

function toggleClass(elem, classNames) {
 return _toggleClass(elem, classNames, 0);
}

function _toggleClass(elem, classNames, flag) {
 var cur = attr(elem, 'class') || '', 
  curNames = cur.split(RE_SPACE_SEPERATOR), found, 
  targetNames = (classNames || '').split(RE_SPACE_SEPERATOR), targetName, finalNames;

 for (var i = 0, len = targetNames.length; i < len; i++) {
  targetName = targetNames[i];

  found = curNames.indexOf(targetName);

  if (flag > 0) {
   if (found === -1) {
    curNames.push(targetName);
   }
  } else if (flag < 0) {
   if (found !== -1) {
    curNames.splice(found, 1);
   }
  } else {
   if (found === -1) {
    curNames.push(targetName);
   } else {
    curNames.splice(found, 1);
   }
  }
 }

 finalNames = curNames.join(' ');

 // 即便为空也不删除
 return attr(elem, 'class', finalNames);
}

// svg paths
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
// 
// M x y (or m dx dy)
// L x y (or l dx dy)
// Q x1 y1, x y (or q dx1 dy1, dx dy)  - quadratic 
// T x y (or t dx dy)
// C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)  - Cubic 
// S x2 y2, x y (or s dx2 dy2, dx dy)
// A rx ry x-axis-rotation large-arc-flag>180 sweep-flag=1?clockwise x y (or a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy)
// Z (or z)
// 
function _pathToString(path) {
 if (!path || path.length === 0) {
  return 'M0,0';
 }

 if (IE8) {
  path = _pathForVML(path);
 }

 if (typeof path === 'string') {
  return path;
 }

 var str = [], part;
 for (var i = 0, len = path.length; i < len; i++) {
  part = path[i];
  if (typeof part === 'string') {
   str.push(part);
  } else {
   if (part.length > 1 && RE_LETTER.test(part[0])) {
    str.push(part[0] + part.slice(1).join(','));
   }
  }
 }

 return str.join('');
}

function parsePathString(pathString) {
  var data = [];

  // M66.039,133.545 'M' '66.039,133.545'
  pathString.replace(RE_PATH, function(a, b, c) {
    var params = [];
    c.replace(RE_PATH_VALUES, function(a, b) {
      b && params.push(+b);
    });
    
    data.push([b].concat(params));
  });

  return data;
}

function _infer(cpx1, cpy1, x1, y1) {
 return [2*x1-cpx1, 2*y1-cpy1];
}
function _toAbsolutePath(path) {
 var ret = [], cx, cy, cpx, cpy, cmd, sublen, inferredCP;

 for (var i = 0, len = path.length, subpath; i < len; i++) {
  subpath = path[i];

  if (isArray(subpath) && subpath.length) {
   sublen = subpath.length;
   cmd = subpath[0];

   switch(cmd) {
    case 'M': 
     cx = subpath[1];
     cy = subpath[2];

     ret.push(subpath);
     break;
    case 'm': 
     if (isNaN(cx) || isNaN(cy)) { // 如果第一个是m
      cx = subpath[1];
      cy = subpath[2];
     } else {
      cx = cx + subpath[1];
      cy = cy + subpath[2];
     }
     
     ret.push(['M', cx, cy]);
     break;
    case 'L':
     cx = subpath[1];
     cy = subpath[2];

     ret.push(subpath);
     break;
    case 'l':
     cx = cx + subpath[1];
     cy = cy + subpath[2];

     ret.push(['L', cx, cy]);
     break;
    case 'H':
     cx = subpath[1];

     ret.push(['L', cx, cy]);
     break;
    case 'h':
     cx = cx + subpath[1];

     ret.push(['L', cx, cy]);
     break;
    case 'V':
     cy = subpath[1];

     ret.push(['L', cx, cy]);
     break;
    case 'v':
     cy = cy + subpath[1];

     ret.push(['L', cx, cy]);
     break;
    case 'C': // C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
     cpx = subpath[3];
     cpy = subpath[4];
     cx = subpath[5];
     cy = subpath[6];

     ret.push(subpath);
     break;
    case 'c':
     cpx = cx + subpath[3];
     cpy = cy + subpath[4];
     cx = cx + subpath[5];
     cy = cy + subpath[6];

     ret.push(['C', cx + subpath[1], cy + subpath[2], cpx, cpy, cx, cy]);
     break;
    case 'S': // S x2 y2, x y (or s dx2 dy2, dx dy)
     inferredCP = isNaN(cpx) ? [subpath[1], subpath[2]] : _infer(cpx, cpy, cx, cy);
     
     cpx = subpath[1];
     cpy = subpath[2];
     cx = subpath[3];
     cy = subpath[4];

     ret.push(['C', inferredCP[0], inferredCP[1], cpx, cpy, cx, cy]);
     break;
    case 's': // S x2 y2, x y (or s dx2 dy2, dx dy)
     inferredCP = isNaN(cpx) ? [cx + subpath[1], cy + subpath[2]] : _infer(cpx, cpy, cx, cy);
     
     cpx = cx + subpath[1];
     cpy = cy + subpath[2];
     cx = cx + subpath[3];
     cy = cy + subpath[4];

     ret.push(['C', inferredCP[0], inferredCP[1], cpx, cpy, cx, cy]);
     break;
    case 'Q': // Q x1 y1, x y (or q dx1 dy1, dx dy)
     cpx = subpath[1];
     cpy = subpath[2];
     cx = subpath[3];
     cy = subpath[4];

     ret.push(subpath);
     break;
    case 'q':
     cpx = cx + subpath[1];
     cpy = cy + subpath[2];
     cx = cx + subpath[3];
     cy = cy + subpath[4];

     ret.push(['Q', cpx, cpy, cx, cy]);
     break;
    case 'T': // T x y (or t dx dy)
     inferredCP = isNaN(cpx) ? [cx, cy] : _infer(cpx, cpy, cx, cy);
     cpx = inferredCP[0];
     cpy = inferredCP[1];
     cx = subpath[1];
     cy = subpath[2];

     ret.push(['Q', cpx, cpy, cx, cy]);
     break;
    case 't':
     inferredCP = isNaN(cpx) ? [cx, cy] : _infer(cpx, cpy, cx, cy);
     cpx = inferredCP[0];
     cpy = inferredCP[1];
     cx = cx + subpath[1];
     cy = cy + subpath[2];

     ret.push(['Q', cpx, cpy, cx, cy]);
     break;
    case 'A': 
     cx = subpath[6];
     cy = subpath[7];

     ret.push(subpath);
     break;
    case 'a': // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
     cx = cx + subpath[6];
     cy = cy + subpath[7];

     subpath[0] = 'A';
     subpath[1] = cx + subpath[1];
     subpath[2] = cy + subpath[2];
     subpath[6] = cx;
     subpath[7] = cy;

     ret.push(subpath);
     break;
    default:
     ret.push(subpath);
     break;
   }
  } else {
   ret.push(subpath);
  }
 }

 return ret;
}

UCD.np = function(path) {
 return _toAbsolutePath(parsePathString(path));
};

function VML_ZOOM(val) {
 return isNumeric(val) ? Math.round(val * VML.ZOOM) : val;
}

// M m
// L l
// C c C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y => wa
// large-arc-flag 角度>180
// sweep-flag 1表示顺时针
// at,ar 会从当前点开始连接到弧线的起点
// wa=>at left,top right,bottom sx,sy ex,ey 顺时针
// wr=>ar left,top right,bottom sx,sy ex,ey

function _pathForVML(path) {
 if (path && path.isVML) {
  return path;
 }

 if (!isArray(path)) {
  path = parsePathString(path);
 }

 path = _toAbsolutePath(path);

 // convert
 var ret = [], cx, cy, cmd, sublen;

 for (var i = 0, len = path.length, subpath; i < len; i++) {
  subpath = path[i];

  if (isArray(subpath) && subpath.length) {
   sublen = subpath.length;
   cmd = subpath[0];

   switch(cmd) {
    case 'M': 
     cx = subpath[1];
     cy = subpath[2];

     ret.push(['m'].concat(subpath.slice(1).map(VML_ZOOM)));
     break;
    case 'L':
     cx = subpath[1];
     cy = subpath[2];

     ret.push(['l'].concat(subpath.slice(1).map(VML_ZOOM)));
     break;
    case 'Q': // Q x1 y1, x y (or q dx1 dy1, dx dy)
     cx = subpath[3];
     cy = subpath[4];

     ret.push(['qb'].concat(subpath.slice(1).map(VML_ZOOM)));
     break;
    case 'C':
     cx = subpath[5];
     cy = subpath[6];

     ret.push(['c'].concat(subpath.slice(1).map(VML_ZOOM)));
     break;
    case 'A':
     var sweepFlag = subpath[5];
     var arcInfo = computeArc.apply(null, [cx, cy].concat(subpath.slice(1)));
     var vmlARC = [
      sweepFlag ? 'wa' : 'at', 
      arcInfo.x, arcInfo.y, 
      arcInfo.x1, arcInfo.y1, 
      cx, cy, 
      subpath[6], subpath[7]
     ];

     cx = subpath[6];
     cy = subpath[7];

     ret.push(vmlARC.map(VML_ZOOM));
     break;
    case 'Z':
     ret.push('x');
     break;
    case 'z':
     ret.push('x');
     break;
    default:
     console.log(cmd);
     break;
   }
  } else {
   if (subpath === 'z' || subpath === 'Z') {
    ret.push('x');
   }
  }
 }

 return ret;
}

function computeArc(x0, y0, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
 var dx2, dy2, cosAngle, sinAngle, x1, y1, Prx, Pry, Px1, Py1, radiiCheck, 
  sign, sq, coef, cx1, cy1, sx2, sy2, cx, cy, ux, uy, vx, vy, p, n, angleStart, angleExtent;

  //
  // Elliptical arc implementation based on the SVG specification notes
  //

  // Compute the half distance between the current and the final point
  dx2 = (x0 - x) / 2.0;
  dy2 = (y0 - y) / 2.0;
  // Convert angle from degrees to radians
  angle = rad(angle % 360.0);
  cosAngle = Math.cos(angle);
  sinAngle = Math.sin(angle);

  //
  // Step 1 : Compute (x1, y1)
  //
  x1 = (cosAngle * dx2 + sinAngle * dy2);
  y1 = (-sinAngle * dx2 + cosAngle * dy2);
  // Ensure radii are large enough
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  Prx = rx * rx;
  Pry = ry * ry;
  Px1 = x1 * x1;
  Py1 = y1 * y1;
  // check that radii are large enough
  radiiCheck = Px1 / Prx + Py1 / Pry;
  if (radiiCheck > 1) {
    rx = Math.sqrt(radiiCheck) * rx;
    ry = Math.sqrt(radiiCheck) * ry;
    Prx = rx * rx;
    Pry = ry * ry;
  }

  //
  // Step 2 : Compute (cx1, cy1)
  //
  sign = (largeArcFlag == sweepFlag) ? -1 : 1;
  sq = ((Prx * Pry) - (Prx * Py1) - (Pry * Px1)) / ((Prx * Py1) + (Pry * Px1));
  sq = (sq < 0) ? 0 : sq;
  coef = (sign * Math.sqrt(sq));
  cx1 = coef * ((rx * y1) / ry);
  cy1 = coef * -((ry * x1) / rx);

  //
  // Step 3 : Compute (cx, cy) from (cx1, cy1)
  //
  sx2 = (x0 + x) / 2.0;
  sy2 = (y0 + y) / 2.0;
  cx = sx2 + (cosAngle * cx1 - sinAngle * cy1);
  cy = sy2 + (sinAngle * cx1 + cosAngle * cy1);

  //
  // Step 4 : Compute the angleStart (angle1) and the angleExtent (dangle)
  //
  ux = (x1 - cx1) / rx;
  uy = (y1 - cy1) / ry;
  vx = (-x1 - cx1) / rx;
  vy = (-y1 - cy1) / ry;
  p, n;
  // Compute the angle start
  n = Math.sqrt((ux * ux) + (uy * uy));
  p = ux; // (1 * ux) + (0 * uy)
  sign = (uy < 0) ? -1 : 1;
  angleStart = deg(sign * Math.acos(p / n));

  // Compute the angle extent
  n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
  p = ux * vx + uy * vy;
  sign = (ux * vy - uy * vx < 0) ? -1 : 1;
  angleExtent = deg(sign * Math.acos(p / n));
  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= 360;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += 360;
  }
  angleExtent %= 360;
  angleStart %= 360;

  //
  // We can now build the resulting Arc2D in precision
  //
  var arc = {};
  arc.x = cx - rx;
  arc.y = cy - ry;
  arc.x1 = cx + rx;
  arc.y1 = cy + ry;
  arc.start = -angleStart;
  arc.extent = -angleExtent;

  return arc;
}

// Gradients
// Linear gradient format: “`‹angle›-‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`90-#fff-#000`” – 90°
// gradient from white to black or “`0-#fff-#f00:20-#000`” – 0° gradient from white via red (at 20%) to black.
// 
// radial gradient: “`r[(‹fx›, ‹fy›, <cx>, <cy>, <r>)]‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`r#fff-#000`” –
// gradient from white to black or “`r(0.25, 0.75)#fff-#000`” – gradient from white to black with focus point
// at 0.25, 0.75. Focus point coordinates are in 0..1 range. Radial gradients can only be applied to circles and ellipses.
// 
// Colour name (“red”, “green”, “cornflowerblue”, etc)
// #••• — shortened HTML colour: (“#000”, “#fc0”, etc)
// #•••••• — full length HTML colour: (“#000000”, “#bd2300”)
// rgb(•••, •••, •••) — red, green and blue channels’ values: (“rgb(200, 100, 0)”)
// rgb(•••%, •••%, •••%) — same as above, but in %: (“rgb(100%, 175%, 0%)”)
// rgba(•••, •••, •••, •••) — red, green and blue channels’ values: (“rgba(200, 100, 0, .5)”)
// rgba(•••%, •••%, •••%, •••%) — same as above, but in %: (“rgba(100%, 175%, 0%, 50%)”)
// hsb(•••, •••, •••) — hue, saturation and brightness values: (“hsb(0.5, 0.25, 1)”)
// hsb(•••%, •••%, •••%) — same as above, but in %
// hsba(•••, •••, •••, •••) — same as above, but with opacity
// hsl(•••, •••, •••) — almost the same as hsb, see Wikipedia page
// hsl(•••%, •••%, •••%) — same as above, but in %
// hsla(•••, •••, •••, •••) — same as above, but with opacity
// Optionally for hsb and hsl you could specify hue as a degree: “hsl(240deg, 1, .5)” or, if you want to go fancy, “hsl(240°, 1, .5)”
function _parseGradientStops(gradient) {
 var dots = [];
  for (var i = 0, ii = gradient.length; i < ii; i++) {
    var dot = {},
      par = gradient[i].match(RE_COLOR_OFFSET), parsedColor = parseColor(par[1]);
    dot.color = parsedColor.color;
    dot.opacity = parsedColor.opacity;
    
    par[2] && (dot.offset = par[2] + "%");
    dots.push(dot);
  }

  // TODO: 如果只有两个颜色，并且没有指定offset，那么就必须要指定一个100%
  for (i = 1, ii = dots.length - 1; i < ii; i++) {
    if (!dots[i].offset) {
      var start = parseFloat(dots[i - 1].offset || 0),
        end = 0;
      for (var j = i + 1; j < ii; j++) {
        if (dots[j].offset) {
          end = dots[j].offset;
          break;
        }
      }
      if (!end) {
        end = 100;
        j = ii;
      }
      end = parseFloat(end);
      var d = (end - start) / (j - i + 1);
      for (; i < j; i++) {
        start += d;
        dots[i].offset = start + "%";
      }
    }
  }
  return dots;
}

function _parseGradient(gradient) {
 var result = {
  type: 'linear', 
  fx: .5,
  fy: .5,
  cx: .5, 
  cy: .5, 
  r: .5, 
  angle: 0, 
  stops: []
 };

 gradient = gradient.replace(RE_RADIAL_GRADIENT, function($0, $1) {
  result.type = 'radial';
  if ($1) {
   var KEYS = ['fx', 'fy', 'cx', 'cy', 'r'], key, val, 
    parts = $1.split(RE_COMMA_SEPTERATOR);

   each(parts, function(i, part) {
    key = KYES[i];
    val = parseFloat(part);
    if (key && !isNaN(val)) {
     result[key] = val;
    }
   });
  }
  return '';
 });

 gradient = gradient.split(RE_DASH_SEPTERATOR);

 if (result.type === 'linear' && gradient.length && isNumeric(gradient[0]))  {
  result.angle = parseFloat(gradient.shift());
  if (!isNaN(result.angle)) {
   var vector = vectorAngle(result.angle);
   result.x1 = vector[0];
   result.y1 = vector[1];
   result.x2 = vector[2];
   result.y2 = vector[3];
  }
 }
 
 result.stops = _parseGradientStops(gradient);

 return result;
}

/**
 * 创建渐变颜色
 *
 * // 0 0 100% 100%, red 0% 1, green 50% 1, blue 100% 1
  // r 50% 50% 50% 50% 50%, red 0% 1, green 50% 1, blue 100% 1
 * 
 * @param  {String} uid  unique id
 * @param  {String} s    渐变颜色描述字符串
 * @param  {Object} defs svg parent node, should be defs node.
 */
function createGradient(uid, s, defs) {
  var gradient = _parseGradient(s), 
   radial = gradient.type === 'radial',
    type = radial ? 'radialGradient' : 'linearGradient';

  var KEYS, attrs, stops, elem;

  attrs = {
    "id": uid
  };

  if (radial) {
   KEYS = ['fx', 'fy', 'cx', 'cy', 'r'];
  } else {
   KEYS = ['x1', 'y1', 'x2', 'y2'];
  }

  for (var i = 0, len = KEYS.length, key; i < len; i++) {
   key = KEYS[i];

   if (gradient[key] !== undefined) {
    attrs[key] = gradient[key];
   }
  }

  elem = create(type, attrs, defs);
  for (var i = 0, len = gradient.stops.length; i < len; i++) {
   _createStop(elem, gradient.stops[i]);
  }
}

/**
 * 创建渐变颜色点
 * 
 * @param  {Object} root    svg parent node
 * @param  {String} stop    stop
 * @return {Object}         渐变颜色点
 */
function _createStop(root, stop) {
  var attrs = {
    offset: stop.offset,
    "stop-color": stop.color,
    "stop-opacity": stop.opacity
  };

  return create("stop", attrs, root);
}

function animate(options) {
  var timerId, opts = $.extend({
    duration: 500
   }, options), 
   duration = opts.duration, 
    startTime, endTime,
    easeFn = $.easing[opts.easing];

  startTime = fxNow || createFxNow();
  endTime = startTime + duration;

  var tick = function() {
    var curTime = fxNow || createFxNow(),
      remains = Math.max(0, endTime - curTime),
      temp = duration ? remains / duration : 0,
      timePercent = 1 - temp,
      percent = easeFn ? easeFn(timePercent, duration * timePercent, 0, 1, duration) : timePercent;

    if (timePercent >= 1) {
      clearInterval(timerId);
      timerId = null;

      $.isFunction(opts.onComplete) && opts.onComplete(percent, timePercent);
    } else {
      $.isFunction(opts.onProgress) && opts.onProgress(percent, timePercent);
    }
  };

  return timerId = setInterval(tick, FX_INTERVAL);
}

function animateAttr(elem, attrName, from, to, options) {
 var opts = $.extend({
  onProgress: function(percent) {
   var val = from + (to - from) * percent;

   attr(elem, attrName, val);
  }, 
  onComplete: function() {
   attr(elem, attrName, to);
  }
 }, options);

 return animate(opts);
}


extend(SVG, {
 create: create, 
 canvas: function(parentNode, width, height) {
  return create('svg', {
      'version': '1.1',
      'width': width,
      'height': height
    }, parentNode);
 },

 group: function(parentNode, attrs) {
  return create('g', attrs, parentNode);
 }, 

 rect: function(parentNode, x, y, width, height, props) {
  var attrs = $.extend({
   x: x, 
   y: y,
   width: width, 
   height: height
  }, props);

  return create('rect', attrs, parentNode);
 },

 text: function(parentNode, x, y, content, props) {
  delete props.width;
  delete props.height;

  var attrs = $.extend({
   x: x, 
   y: y
  }, props);

  var elem = create('text', attrs, parentNode);
  elem.textContent = content;

  // fix 'dominant-baseline': 'hanging', // text-before-edge
  if (isIE && elem.getBBox) {
   attr(elem, 'y', y + elem.getBBox().height/2);
  }

  return elem;
 },

 path: function(parentNode, path, props) {
  var attrs = $.extend({
   d: path
  }, props);

  return create('path', attrs, parentNode);
 },

 circle: function(parentNode, cx, cy, r, props) {
  var attrs = $.extend({
   cx: cx, 
   cy: cy, 
   r: r
  }, props);

  return create('circle', attrs, parentNode);
 },

 ellipse: function(parentNode, cx, cy, rx, ry, props) {
  var attrs = $.extend({
   cx: cx, 
   cy: cy, 
   rx: rx, 
   ry: ry
  }, props);

  return create('ellipse', attrs, parentNode);
 }
});
/// VML
/// http://www.w3.org/TR/NOTE-VML#h3:introduction.example
/// https://msdn.microsoft.com/en-us/library/bb250524(v=vs.85).aspx
/// XXXto 从当前点连接到起始点
/// TO m x,y 移动
/// TO l x, y 连接
/// TO c cpx1, cpy1 cpx2, cpy2, x, y 三次贝塞尔
/// x 结束
/// e 结束子路径
/// t=>m dx, dy
/// r=>l dx, dy
/// v=>c
/// ar left,top right,bottom sx,sy ex,ey 弧线
/// TO at=>ar 逆时针
/// wr left,top right,bottom sx,sy ex,ey
/// TO wa=>wr 顺时针TO
/// qb cpx,cpy ex,ey 二次贝塞尔
var VML = UCD.VML = {
 NAMESPACE: 'v', 
 NS: 'urn:schemas-microsoft-com:vml',

 ZOOM: 10, 
 COORDSIZE: '10,10',

 CSS: '{ position: absolute; behavior:url(#default#VML); display: inline-block; } ',

 ready: function() {
  if (VML.__initialized) {
   return;
  } else {
   VML.__initialized = true;
  }
  
  if (doc.namespaces && !doc.namespaces[VML.NAMESPACE]) {
   doc.namespaces.add(VML.NAMESPACE, VML.NS);

   var css = 'v\\:oval, v\\:shape, v\\:path, v\\:stroke, v\\:fill' + VML.CSS;
   
   try {
    doc.createStyleSheet().cssText = css;
   } catch (e) {
    doc.styleSheets[0].cssText += css;
   }
  }
 },

 _create: function(tag, attrs, parentNode) {
  var elem = doc.createElement(tag);

  if (attrs) {
   attr(elem, attrs);
  }

  if (parentNode) {
   append(parentNode, elem);
  }

  return elem;
 },

 create: function(tag, attrs, parentNode) {
  var vmlTag = '<' + VML.NAMESPACE + ':' + tag + '>', elem;
  elem = VML._create(vmlTag, attrs, parentNode);

  tag === 'shape' && css(elem, {
   'width': '1px', 
   'height': '1px', 
   'position': 'absolute', 
   'display': 'inline-block', 
   'behavior': 'url(#default#VML)'
  });

  return elem;
 },

 canvas: function(parentNode, width, height) {
  var elem = VML._create('div', null, parentNode);

    css(elem, {
      'width': width,
      'height': height, 
      'position': 'relative'
    });

    return elem;
 },

 group: function(parentNode, attrs) {
  var elem = VML._create('div', attrs, parentNode);

    css(elem, 'position', 'absolute');

    return elem;
 },

 text: function(parentNode, x, y, content, attrs) {
  var width = attrs.width, height = attrs.height;

  delete attrs.width;
  delete attrs.height;

  var elem = VML._create('span', attrs, parentNode);
  elem.innerHTML = content;

    css(elem, {
     'width': width, 
   'height': height, 
   'position': 'absolute', 
   'display': 'inline-block'
    });

  css(elem, {
     'left': attrs['text-anchor'] === 'middle' ? (x - $(elem).width()/2) : x, 
   'top': attrs['dominant-baseline'] === 'central' ? (y - $(elem).height()/2) : y
    });

    return elem;
 },

 path: function(parentNode, path, props) {
  // TODO: 将svg的path转换为vml的path。
  var attrs = $.extend({
   'coordsize': VML.COORDSIZE, 
   d: path
  }, props);

  // console.log(attrs.path);

  return VML.create('shape', attrs, parentNode);
 },

 rect: function(parentNode, x, y, width, height, attrs) {
  // var path = [ ['m', x, y], ['l', x + width, y], ['l', x + width, y + height], ['l', x, y + height], 'x'];
  // path.isVML = true;

  var path = [ ['M', x, y], ['L', x + width, y], ['L', x + width, y + height], ['L', x, y + height], 'z'];

  return VML.path(parentNode, path, attrs);
 },

 ellipse: function(parentNode, cx, cy, rx, ry, attrs) {
  var attrs = $.extend({
   'cx': cx, 
   'cy': cy, 
   'rx': rx, 
   'ry': ry
  }, props);

  return VML.create('oval', attrs, parentNode);
 },

 // VML的oval使用left,top,width,height样式来控制在attr里面转换
 circle: function(parentNode, cx, cy, r, props) {
  var attrs = $.extend({
   'cx': cx, 
   'cy': cy, 
   'r': r
  }, props);

  return VML.create('oval', attrs, parentNode);
 }
};

var VG_APIS = 'ready create canvas group text path rect circle'.split(' ');

var VG = UCD.VG = {
 supportSVG: supportSVG, 
 supportSMIL: supportSMIL,

 _pathForVML: _pathForVML, 
 _pathToString: _pathToString,

 deg: deg, 
 rad: rad,

 attr: attr, 
 removeAttr: removeAttr,
 append: append, 
 css: css, 
 addClass: addClass, 
 removeClass: removeClass, 
 toggleClass: toggleClass,
 gradient: createGradient,
 parseColor: parseColor,
 parsePathString: parsePathString, 
 animate: animate,
 animateAttr: animateAttr
};

for (var i = 0, len = VG_APIS.length, api; i < len; i++) {
 api = VG_APIS[i];

 VG[api] = UCD[supportSVG ? 'SVG' : 'VML'][api];
}


})(this, jQuery);

