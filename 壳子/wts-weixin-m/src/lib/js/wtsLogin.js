/*! wtsLogin -v1.0 梧桐树保险网微信登录 created By 兴来 develop by 兴来 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.wtsLogin = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify$1 = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify = createCommonjsModule(function (module) {
module.exports = { "default": stringify$1, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify);

function getBrowser() {
    //获取地址栏参数
    if (!navigator) {
        return {};
    }
    var u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
        iPhone: u.indexOf('iPhone') > -1, //iPhone
        iPad: u.indexOf('iPad') > -1, //iPad
        webApp: u.indexOf('Safari') > -1, //Safari
        user: u
    };
}

function getQueryString(name, type) {
    //获取地址栏参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var search = window.location.search;
    if (type) {
        search = decodeURI(search);
    }
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}





function isWeiXin() {
    //微信
    var ua = getBrowser().user.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
}

function isAL() {
    //支付宝环境
    var ua = getBrowser().user.toLowerCase();
    return ua.match(/Alipay/i) == 'alipay' ? true : false;
}













function delQueStr(url, ref) {
    //删除地址栏参数
    var str = "";
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    } else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (var i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1) + hasHash$1();
    } else {
        arr = str.split('=');
        if (arr[0] == ref) {
            return url.substr(0, url.indexOf('?')) + hasHash$1();
        } else {
            return url;
        }
    }
}
//获取当前hash值
function hasHash$1() {
    if (window.location.hash && window.location.hash.length > 0) {
        if (isAL() && window.location.hash.split("?").length > 1) {
            return "";
        }
        return window.location.hash;
    }
    return "";
}

function getcookie(name) {
    //获取cookie
    var strcookie = document.cookie;
    var arrcookie = strcookie.split('; ');
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=');
        if (arr[0] == name) return decodeURIComponent(arr[1]);
    }
    return '';
}
function setcookie(key, val, expires) {
    //设置cookie
    var d = new Date();
    d.setTime(d.getTime() + (expires || 1000 * 60 * 60 * 24 * 30));
    document.cookie = key + "=" + escape(val) + ";expires=" + d.toGMTString() + ';';
}

function setLocal(name, value, type) {
    //设置本地储存
    var curTime = new Date().getTime();
    if (!type || type == 2) {
        //默认设置-之前存在则使用创建时间
        var data = localStorage.getItem(name);
        if (!data || data == 'null') {
            localStorage.setItem(name, _JSON$stringify({
                data: value,
                time: curTime
            }));
        } else {
            var dataObj = JSON.parse(data);
            var setTime = dataObj.time;
            localStorage.setItem(name, _JSON$stringify({
                data: value,
                time: setTime
            }));
        }
    } else if (type == 1) {
        //type:1重新创建
        localStorage.setItem(name, _JSON$stringify({
            data: value,
            time: curTime
        }));
    }
}

function getLocal(name, exp) {
    //获取本地储存
    var data = localStorage.getItem(name);
    var dataObj = JSON.parse(data);
    if (!exp) {
        var exp = 1000 * 60 * 60 * 24 * 3;
    }
    if (dataObj && new Date().getTime() - dataObj.time > exp) {
        localStorage.removeItem(name);
        console.log('信息已过期');
        return null;
    } else {
        var dataObjDatatoJson = !dataObj ? null : dataObj.data;
        return dataObjDatatoJson;
    }
}

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _library = true;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys$1 = _core.Object.keys;

var keys = createCommonjsModule(function (module) {
module.exports = { "default": keys$1, __esModule: true };
});

var _Object$keys = unwrapExports(keys);

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

var _redefine = _hide;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator$1 = core_getIterator;

var getIterator = createCommonjsModule(function (module) {
module.exports = { "default": getIterator$1, __esModule: true };
});

var _getIterator = unwrapExports(getIterator);

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign$1 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$1, __esModule: true };
});

var _Object$assign = unwrapExports(assign);

var http = {
  /**
   * js封装ajax请求
   * >>使用new XMLHttpRequest 创建请求对象,所以不考虑低端IE浏览器(IE6及以下不支持XMLHttpRequest)
   * >>使用es6语法,如果需要在正式环境使用,则可以用babel转换为es5语法 https://babeljs.cn/docs/setup/#installation
   *  @param settings 请求参数模仿jQuery ajax
   *  调用该方法,data参数需要和请求头Content-Type对应
   *  Content-Type                        data                                     描述
   *  application/x-www-form-urlencoded   'name=哈哈&age=12'或{name:'哈哈',age:12}  查询字符串,用&分割
   *  application/json                     name=哈哈&age=12'                        json字符串
   *  multipart/form-data                  new FormData()                           FormData对象,当为FormData类型,不要手动设置Content-Type
   *  注意:请求参数如果包含日期类型.是否能请求成功需要后台接口配合
   */
  ajax: function ajax() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 初始化请求参数
    var _s = _Object$assign({
      url: '', // string
      type: 'POST', // string 'GET' 'POST' 'DELETE'
      dataType: 'json', // string 期望的返回数据类型:'json' 'text' 'document' ...
      async: true, //  boolean true:异步请求 false:同步请求 required
      data: null, // any 请求参数,data需要和请求头Content-Type对应
      contentType: "application/x-www-form-urlencoded", // Content-Type
      headers: {}, // object 请求头
      timeout: 1000, // string 超时时间:0表示不设置超时
      beforeSend: function beforeSend(xhr) {},
      success: function success(result, status, xhr) {},
      error: function error(xhr, status, _error) {},
      complete: function complete(xhr, status) {}
    }, settings);
    // 创建XMLHttpRequest请求对象
    var xhr = new XMLHttpRequest();
    // 请求开始回调函数
    xhr.addEventListener('loadstart', function (e) {
      _s.beforeSend(xhr);
    });
    // 请求成功回调函数
    xhr.addEventListener('load', function (e) {
      var status = xhr.status;
      if (status >= 200 && status < 300 || status === 304) {
        var result = void 0;
        if (xhr.responseType === 'text') {
          result = xhr.responseText;
        } else if (xhr.responseType === 'document') {
          result = xhr.responseXML;
        } else {
          result = JSON.parse(xhr.response);
        }
        // 注意:状态码200表示请求发送/接受成功,不表示业务处理成功
        _s.success(result, status, xhr);
      } else {
        _s.error(xhr, status, e);
      }
    });
    // 请求结束
    xhr.addEventListener('loadend', function (e) {
      _s.complete(xhr, xhr.status);
    });
    // 请求出错
    xhr.addEventListener('error', function (e) {
      _s.error(xhr, xhr.status, e);
    });
    // 请求超时
    xhr.addEventListener('timeout', function (e) {
      _s.error(xhr, 408, e);
    });
    var useUrlParam = false;
    var sType = _s.type.toUpperCase();
    // 如果是"简单"请求,则把data参数组装在url上
    if (sType === 'GET' || sType === 'DELETE') {
      useUrlParam = true;
      _s.url += http.getUrlParam(_s.url, _s.data);
    }
    // 初始化请求
    xhr.open(_s.type, _s.url, _s.async);
    _s.headers['Content-Type'] = _s.contentType;
    _s.headers['X-Requested-With'] = 'XMLHttpRequest';
    // 设置请求头
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_Object$keys(_s.headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        xhr.setRequestHeader(key, _s.headers[key]);
      }
      // 设置超时时间
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (_s.async && _s.timeout) {
      xhr.timeout = _s.timeout;
    }
    // 发送请求.如果是简单请求,请求参数应为null.否则,请求参数类型需要和请求头Content-Type对应
    xhr.send(useUrlParam ? null : http.getQueryData(_s.data));
  },
  // 把参数data转为url查询参数
  getUrlParam: function getUrlParam(url, data) {
    if (!data) {
      return '';
    }
    var paramsStr = data instanceof Object ? http.getQueryString(data) : data;
    return url.indexOf('?') !== -1 ? paramsStr : '?' + paramsStr;
  },
  // 获取ajax请求参数
  getQueryData: function getQueryData(data) {
    if (!data) {
      return null;
    }
    if (typeof data === 'string') {
      return data;
    }
    if (data instanceof FormData) {
      return data;
    }
    return http.getQueryString(data);
  },
  // 把对象转为查询字符串
  getQueryString: function getQueryString(data) {
    var paramsArr = [];
    if (data instanceof Object) {
      _Object$keys(data).forEach(function (key) {
        var val = data[key];
        // todo 参数Date类型需要根据后台api酌情处理
        paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      });
    }
    return paramsArr.join('&');
  }
};

/**
 * app
 * 核心全局app方法
 */
var app = {
    user: {
        //获取app相关用户信息
        getUserInfo: function getUserInfo(success, fail) {
            navigator.general.getUserInfo(success, fail);
        },
        //通知app退出登录
        loginOut: function loginOut(success, fail) {
            navigator.general.logout(success, fail);
        }

    },

    weixin: {
        /**初始化分享*
        * params:{
               router (链接)
               路由：
               wts://share?type=1(分享网页链接)&link=&title=&content=&logo=
               wts://share?type=2(分享图片)&link=(图片链接)
               wts://share?type=3(分享小程序)&link=&title=&content=&logo=&userName=&path=
           }
        * **/
        initShare: function initShare(router, success, fail) {
            navigator.general.rightIcon(router, success, fail);
        },
        /**微信支付*
         * params:{
                appid (微信appid)
                partnerid (微信商户id)
                prepayid (订单id)
                package (财付通文档填写的数据和签名微信开放平台文档对数据做的签名)
                timestamp (时间戳)
                sign (签名)
                noncestr (随机串)
            }
         * **/
        wxPay: function wxPay(params, success, fail) {
            navigator.wechat.pay(params, success, fail);
        },
        /**打开微信小程序*
         * params:{
                userName (小程序appid)
                path (小程序页面路径)
                miniProgramType (小程序类型 0:正式版  1:开发版  2:体验版)
            }
         * **/
        openMiniProgram: function openMiniProgram(params, success, fail) {
            navigator.wechat.openMiniProgram(params, success, fail);
        }
    },

    aliPay: {
        /**主动拉起支付宝支付*
        * params:{
               orderInfo (后台请求获取支付宝支付相关的字符串信息)
           }
        * **/
        aliPay: function aliPay(params, success, fail) {
            navigator.alipay.pay(params, success, fail);
        }
    },

    general: {
        /**打开app内置页面*
         * params:{
                url (页面路径)
                title (页面标题  可选参数)
            }
         * **/
        router: function router(params, success, fail) {
            navigator.general.router(params, success, fail);
        },

        /**关闭当前webview页面*
         * **/
        closeWebView: function closeWebView() {
            navigator.general.close();
        },

        /**pdf预览*
         * params:{
                url (pdf链接)
                title (页面标题  可选参数)
            }
         * **/
        readPdf: function readPdf(params) {
            navigator.general.readPdf(params);
        },
        /**下载*
         * params:{
                url (图片链接)
                type (文件类型:image  audio video)
            }
         * **/
        download: function download(params, success, fail) {
            navigator.general.download(params, success, fail);
        },

        /**打开视频播放*
        * params:{
               url (视频链接)
           }
        * **/
        playVideo: function playVideo(params, success, fail) {
            navigator.general.playVideo(params, success, fail);
        },

        //视频上传人脸识别
        uploadRecognition: function uploadRecognition(success, fail) {
            navigator.general.uploadRecognition(success, fail);
        },

        /**设备初始化*
         *callback
         * **/
        deviceready: function deviceready(callback) {
            document.addEventListener('deviceready', function () {
                callback();
            }, false);
        }
    }
};

var domain = ['https://bx.wts9999.net', 'https://bx.wts999.com', 'https://bx-web.wts999.com'];
var base = ['wts9999.net', 'wts999.com', 'wts999.com'];
var initParams = {
    // domain: domain,//域名-全面
    historyLocal: ['WTS_USER', 'WTS_USER_2'], //历史缓存名称
    // base: base,//域名-一级
    wxscope: "snsapi_base",
    zfbcode: "auth_base",
    autoLogin: '/uc/ucUser/autoLogin', //获取登录数据
    //微信相关
    wxoauthappid: '/uc/login/wxoauthappid',
    wxmplogin: '/uc/login/wxmplogin',
    wxmploginHtml: '/m/wxmplogin.html',
    //支付宝相关
    getAliOauthUrl: '/uc/login/getThirdOauthUrl',
    aliOauthBaseInfo: '/uc/login/thirdOauthBaseInfo'
};
var blankOrigin = 'www.fxyf99.com,bp.lzyunying.com';
var initCallback;
function init(options, callBack) {
    initParams.domain = domain[options.env];
    initParams.base = base[options.env];
    initCallback = callBack;
    var login = getQueryString('login');
    var sessionlogin = sessionStorage.getItem('login');
    // app环境外链页
    if (navigator.userAgent.indexOf("wtsbxwApp") > -1) {
        initCallback(false);
        return;
    }
    // b端域名
    if (blankOrigin.indexOf(location.host) > -1) {
        initCallback(false);
        return;
    }
    // 携带参数不登录
    if (login && login == 2) {
        sessionStorage.setItem('login', login);
        initCallback(false);
        return;
    } else if (sessionlogin && sessionlogin == 2) {
        initCallback(false);
        return;
    }
    var token = getcookie('WTS_TOKEN_A');
    //app环境下不走token获取用户信息流程
    if (token && navigator.userAgent.indexOf("wtsApp") < 0) {
        getUserInfo();
    } else {
        toChannel();
    }
}

/**
 *获取用户信息
 *
 * @returns
 */
function getUserInfo() {
    var loginDatas = JSON.parse(sessionStorage.getItem("WTS_USER_3"));
    if (loginDatas) {
        if (checkUserServerCode(loginDatas)) return;
        return initCallback(loginDatas);
    }
    http.ajax({
        type: "post",
        url: initParams.autoLogin,
        async: false,
        dataType: 'json',
        success: function success(result, er) {
            console.log(result);
            alert('用户信息结果==='+JSON.stringify(result))
            if (result.httpCode == 500) {
                initCallback(false);
                return;
            }
            if (result.httpCode == 403) {
                clearUser();
                return toChannel();
            }
            if (checkUserServerCode(result.data)) return;
            if (result.data) {
                sessionStorage.setItem("WTS_USER_3", _JSON$stringify(result.data));
            }
            return initCallback(result.data);
        }
    });
}

/**
     * 判断是哪个渠道登录-微信，支付宝，h5
     */
function toChannel() {
    if (isWeiXin()) {
        //微信
        wxmplogin();
    } else if (isAL()) {
        //支付宝
        alert('进入支付宝')
        ALmplogin();
    } else if (navigator.userAgent.indexOf("wtsApp") > -1) {
        appmpLogin();
    } else {
        h5mplogin();
    }
}
function wxmplogin() {
    var code = getQueryString('code');
    var state = getQueryString('state');
    if (!code) {
        http.ajax({
            type: 'get',
            url: initParams.wxoauthappid,
            async: false,
            cache: false,
            data: {
                key: 'oauth.wx.mp.appid'
            },
            dataType: 'json',
            success: function success(result) {
                //将页面跳转至微信授权页
                if (result != null && result.httpCode == 200 && result.data != "") {
                    var redirectUrl = wechat_redirect_url(result); //获取授权地址
                    location.href = redirectUrl;
                } else {
                    alert('获取appid失败 \n ' + result);
                }
            }
        });
    } else {
        http.ajax({
            type: 'get',
            url: initParams.wxmplogin,
            async: false,
            cache: false,
            data: {
                code: code,
                state: state
            },
            dataType: 'json',
            success: function success(result) {
                if (result.msg == "重复CODE请求" || result.httpCode == 409) {
                    var tempHref = location.href;
                    tempHref = delQueStr(tempHref, 'code');
                    tempHref = delQueStr(tempHref, 'state');
                    return window.location.replace(tempHref);
                }
                if (result != null && result.httpCode == 200 && result.data != "") {
                    console.log(result.data);
                    getUserInfo();
                    //如果静默授权登录失败,则换成显示授权重新登录一次
                } else if (result.httpCode == 303 && initParams.wxscope == "snsapi_base") {
                    initParams.wxscope = "snsapi_userinfo";
                    http.ajax({
                        type: 'get',
                        url: initParams.wxoauthappid,
                        async: false,
                        cache: false,
                        data: {
                            key: 'oauth.wx.mp.appid'
                        },
                        dataType: 'json',
                        success: function success(result) {
                            //将页面跳转至微信授权页
                            if (result != null && result.httpCode == 200 && result.data != "") {
                                var redirectUrl = wechat_redirect_url(result); //获取授权地址
                                location.href = redirectUrl;
                            } else {
                                alert('获取appid失败 \n ' + _JSON$stringify(result));
                            }
                        }
                    });
                    //location.href=url;
                } else {
                    alert('微信身份识别失败 \n ' + _JSON$stringify(result));
                }
            }
        });
    }
}
function ALmplogin() {
    var Request = getQueryStringByVue(); //实例化
    var auth_code = Request.auth_code || "";
    var app_id = Request.app_id;
    var source = Request.source;
    var scope = Request.scope;
    if (auth_code == "") {
        var redirectUrl = al_redirect_url(); //获取授权地址
        alert('授权地址==='+redirectUrl)
        location.href = redirectUrl;
    } else {
        http.ajax({
            type: 'post',
            url: initParams.aliOauthBaseInfo,
            async: false,
            contentType: "application/json",
            data: _JSON$stringify({
                "appId": app_id,
                "source": source,
                "scope": scope,
                "authCode": auth_code.split("#")[0],
                "serverCode": 'alp'
            }),
            dataType: 'json',
            success: function success(result) {
              alert('授权结果==='+JSON.stringify(result))
                var url;
                if (result.msg == "请求参数出错" || result.httpCode == 400) {
                    url = location.href;
                    url = delQueStr(url, "auth_code");
                    url = delQueStr(url, "app_id");
                    url = delQueStr(url, "source");
                    url = delQueStr(url, "userOutputs");
                    url = delQueStr(url, "alipay_token");
                    return window.location.replace(url);
                }
                if (result != null && result.httpCode == 200 && result.data) {
                    var vueHash = getLocal("vueHash");
                    if (vueHash && window.location.href.indexOf(vueHash) > -1) {
                        url = location.href;
                        url = location.origin + location.pathname + vueHash;
                        localStorage.clear('vueHash');
                        window.location.replace(url);
                    }
                    getUserInfo();
                } else if (result.httpCode == 303 && initParams.zfbcode == "auth_base") {
                    initParams.zfbcode = "auth_user";
                    var redirectUrl = al_redirect_url(); //获取授权地址
                    location.href = redirectUrl;
                } else {
                    alert('支付宝身份识别失败 \n ' + result);
                }
            }
        });
    }
}

/**获取app原生返回的用户信息 */
function appmpLogin() {
    var loginDatas = sessionStorage.getItem("WTS_USER_3");
    if (loginDatas) {
        return initCallback(JSON.parse(loginDatas));
    }

    app.general.deviceready(function () {
        app.user.getUserInfo(function (res) {
            sessionStorage.setItem("WTS_USER_3", res);
            console.log(res);
            return initCallback(JSON.parse(res));
        }, function () {
            return initCallback(false);
        });
    });
}

function h5mplogin() {
    var loginDatas = JSON.parse(sessionStorage.getItem("WTS_USER_3"));
    if (loginDatas) {
        if (checkUserServerCode(loginDatas)) return;
        return initCallback(loginDatas);
    }
    return initCallback(false);
}

//获取地址栏参数
function getQueryStringByVue() {
    var obj = {};
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            obj[name] = value;
        }
    }
    return obj;
}

//清除本地cookie和缓存的用户信息
function clearUser() {
    setcookie('WTS_TOKEN_A', '', {
        expires: 1,
        path: "/",
        domain: initParams.base,
        secure: true
    });
    var historys = initParams.historyLocal;
    for (var k in historys) {
        localStorage.clear(historys[k]);
    }
    sessionStorage.clear();
}

//判断用户信息环境
function checkUserServerCode(userDta) {
    var result = false;
    if (isAL() && userDta.serverCode != "alp") {
        result = true;
    }
    if (isWeiXin() && userDta.serverCode != "wx") {
        result = true;
    }
    if (result) {
        clearUser();
        toChannel();
    }
    return result;
}

//获取微信授权地址
function wechat_redirect_url(result) {
    var wxappid = result.data.appid; //appid
    var domain = result.data.domain; //安全域名
    var fromurl = '';
    var tempHref = location.href;
    tempHref = delQueStr(tempHref, 'code');
    tempHref = delQueStr(tempHref, 'state');
    //如果当前访问域名不在安全域名内,则跳转到个人中心的登录跳转页
    fromurl = document.domain == domain ? encodeURIComponent(tempHref) : encodeURIComponent(initParams.domain + initParams.wxmploginHtml + "?jumpToUrl=" + tempHref);
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=' + fromurl + '&response_type=code&scope=' + initParams.wxscope + '&state=' + initParams.wxscope + '#wechat_redirect';
    return url;
}
//获支付宝授权地址
function al_redirect_url() {
    var tempHref = location.href;
    tempHref = delQueStr(tempHref, "auth_code");
    tempHref = delQueStr(tempHref, "app_id");
    tempHref = delQueStr(tempHref, "source");
    tempHref = delQueStr(tempHref, "scope");
    tempHref = delQueStr(tempHref, "userOutputs");
    tempHref = delQueStr(tempHref, "alipay_token");
    if (tempHref.indexOf('#/') > -1) {
        var arrHref = tempHref.split('#/');
        tempHref = arrHref[0] + '?from=ali#/' + arrHref[1];
        setLocal("vueHash", '#/' + tempHref.split("#/")[1]);
    }
    var fromurl = '';
    //如果当前访问域名不在安全域名内,则跳转到个人中心的登录跳转页
    fromurl = document.domain.indexOf("bx.wts999") > -1 ? encodeURIComponent(tempHref) : encodeURIComponent(initParams.domain + initParams.wxmploginHtml + "?jumpToUrl=" + tempHref);
    var url = initParams.getAliOauthUrl + "?serverCode=alp&scope=" + initParams.zfbcode + "&url=" + fromurl;
    return url;
}

var main = {
    init: init
};

return main;

})));
/* wtsLogin 欢迎来到梧桐树保险网 https://www.wts999.com/ */
//# sourceMappingURL=wtsLogin.js.map
