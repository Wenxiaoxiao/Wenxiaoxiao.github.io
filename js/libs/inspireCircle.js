/*!
 * Inspire UI Circle.
 * 
 * @author pingjiang 00308025
 * @date   2015-8-25
 * 
 * @dependencies jquery.js, ucd.svg.js
 *
 * Copyright 2015 UCD Center, Huawei Technologies Co., Ltd.
 */
;(function(root, $) {

  var UCD = root.UCD || (root.UCD = {
    Core: $
  });

  var VG = UCD.VG, deg2rad = VG.rad, rad2deg = VG.deg;

  function _centerText($handler, x, y) {
    if (isNaN(x)) {
      x = $handler.attr('data-cx');
    } else {
      $handler.attr('data-cx', x);
    }

    if (isNaN(y)) {
      y = $handler.attr('data-cy');
    } else {
      $handler.attr('data-cy', y);
    }

    $handler.css({
      left: x - $handler.width()/2, 
      top: y - $handler.height()/2
    });

    return $handler;
  }

  /**
   * Inspire UI Circle
   *
   * TODO: 支持IE8
   * 
   * @param {String|Object} container 容器
   * @param {Object}        options   选项
   */
  function InspireCircle(container, options) {
    this.$container = $(container);
    var opts = this.options = $.extend({}, InspireCircle.defaults, options);

    opts.fullAngle = opts.semiCircle ? 180 : 360;
    opts.baseAngle = options.baseAngle === undefined && opts.semiCircle  ? -180 : opts.baseAngle;
  }

  InspireCircle.defaults = {
    value: 0.0, 
    continuousUpdate: true,

    growing: false,                         // 由细变粗的曲线
    semiCircle: false,                      // 半圆圆环

    growingPosition: 1,                     // 1 表示从外圆边缘开始绘制圆环

    MIN_VALUE: 0,                           // 圆环进度条最小值
    MAX_VALUE: 100,                         // 圆环进度条最大值

    r: 80,                                  // 内圆半径
    R: 100,                                 // 外圆半径

    ringColor: '#3a3e55',                   // 圆环背景色
    textColor: '#edebe8',                   // 文本颜色
    fillColor: '98-#EE474A:0-#E9CA76:100',  // 圆环填充色
    hoverColor: '98-#E9CA76-#EE474A:100',   // 圆环悬浮填充色

    baseAngle: -90,                         // 圆环开始角度
    semiSweepAngle: 180,                    // 圆环张角。整圆是360，半圆是180，代码自动根据semiCircle判断

    clockwise: true,                        // 顺时针旋转

    labelHTML: '<div class="ucd-vg-label"></div>', 
    onLabelUpdated: null,                   // function($label, newValue)

    animationEasing: 'linear',              // 动画速率曲线，支持jQuery.easing.js
    animationDuration: 1500                 // 动画时长
  };

  var proto = InspireCircle.prototype;

  /**
   * 初始化
   */
  proto.init = function() {
    var opts = this.options, canvas, defs;

    this._initSize();

    VG.ready && VG.ready();

    canvas = this.canvas = VG.canvas(this.$container.get(0), opts.width, opts.height);
    this.$labels = $('<div class="ucd-vg-labels"></div>').appendTo(this.$container);

    VG.addClass(canvas, 'ucd-vg');

    if (VG.supportSVG) {
      defs = this.defs = VG.create('defs', null, canvas);

      this._initGradients();
    }

    this[opts.semiCircle ? '_drawBGSemi' : '_drawBG']();

    this.$label = $(opts.labelHTML).appendTo(this.$labels);

    this._updateLabel(opts.value, opts.centerX, opts.centerY);

    this.ringElem = VG.path(canvas, 'M0,0Z', {
      'fill': opts.fillColor,
      'stroke': 'none', 
      'stroked': 'f'
    });

    this._bindEvents();

    this._cacheValue(0);

    this.update();
  };

  /**
   * 修改参数后重绘图表
   */
  proto.update = function() {
    var self = this,
      opts = this.options,
      valuePercent = (opts.value - opts.MIN_VALUE) / (opts.MAX_VALUE - opts.MIN_VALUE),
      startAngle, endAngle;

    if (Math.abs(self.previousValuePercent - valuePercent) < 1e-6) {
      return;
    }

    startAngle = opts.baseAngle + self.previousValuePercent * opts.fullAngle;
    endAngle = opts.baseAngle + valuePercent * opts.fullAngle;

    this._cacheStart = null;

    var animationOptions = {
      duration: opts.animationDuration,
      easing: opts.animationEasing, 
      onProgress: function(percent) {
        self.percent = percent;
        self.angle = startAngle + (endAngle - startAngle) * percent;
        self.valuePercent = self.previousValuePercent + (valuePercent - self.previousValuePercent)*percent;

        self._render();
      }, 
      onComplete: function(percent) {
        self.timerId = null;
        self.percent = percent;
        self.angle = endAngle;
        self.valuePercent = self.previousValuePercent + (valuePercent - self.previousValuePercent)*percent;
        self.previousValuePercent = valuePercent;

        self._render();
      }
    };

    if (self.timerId) {
      clearInterval(self.timerId);
    }

    self.timerId = VG.animate(animationOptions);

    return this;
  };

  /**
   * 自适应图表
   */
  proto.resize = function() { 
    var opts = this.options;

    this._initSize(true);

    // TODO: 解决这个样式问题
    if (VG.supportSVG) {
      VG.attr(this.canvas, {
        width: opts.width, 
        height: opts.height
      });
    } else {
      $(this.canvas).css({
        width: opts.width, 
        height: opts.height
      });
    }

    if (opts.semiCircle) {
      VG.attr(this.bgElem, {
        'd': this._halfRoundCirclePath()
      });
    } else {
      VG.attr(this.bgElem, {
        'cx': opts.centerX, 
        'cy': opts.centerY
      });
    }

    this._updateLabel(null, opts.centerX, opts.centerY);

    this._cacheValue(0);
    this.update();
  };

  /**
   * 销毁图表
   */
  proto.destroy = function() {
    $(this.ringElem).off('mouseover mouseout');

    this.$container.empty();

    /// 清除引用，如果不清除，所有组件实例的引用都会导致DOM节点无法释放
    // 清除深层次数组或者Map对象
    this.$container = null;
    this.canvas = null;
    this.defs = null;
    this.ringElem = null;
    this.$label = null;

    clearInterval(this.timerId);
    this.timerId = null;
  };

  /**
   * 设置参数
   * 
   * @param {String|Object} key   参数名称，参数键值对
   * @param {Object}        value 参数键值对
   * @param {Boolean}       force 自动更新
   */
  proto.setOptions = function(key, value, force) {
    var changed = false;

    if ($.isPlainObject(key)) {
      force = value;

      for (var k in key) {
        value = key[k];
        if (this.options[k] !== value) {
          if (key === 'value') {
            this._cacheValue(this.options[k]);
          }

          this.options[k] = value;

          changed = true;
        }
      }
    } else {
      if (this.options[key] !== value) {
        if (key === 'value') {
          this._cacheValue(this.options[key]);
        }

        this.options[key] = value;

        changed = true;
      }
    }

    force && changed && this.update();

    return this;
  };

  proto._cacheValue = function(value) {
    var opts = this.options;

    this.previousValue = value;
    this.previousValuePercent = (this.previousValue - opts.MIN_VALUE) / (opts.MAX_VALUE - opts.MIN_VALUE);

    return this;
  };

  /**
   * 初始化渐变颜色定义
   * 
   * TODO: update gradient options
   */
  proto._initGradients = function() {
    var opts = this.options, defs;

    defs = this.defs;

    if (opts.fillColorGradient) {
      VG.gradient('gradient-fill', opts.fillColorGradient, defs);
      opts.fillColor = 'url(#gradient-fill)';
    }
    
    if (opts.hoverColorGradient) {
      VG.gradient('gradient-fill-hover', opts.hoverColorGradient, defs);
      opts.hoverColor = 'url(#gradient-fill-hover)';
    }

    if (opts.ringColorGradient) {
      VG.gradient('gradient-fill-ring', opts.ringColorGradient, defs);
      opts.ringColor = 'url(#gradient-fill-ring)';
    }
    
    if (opts.textColorGradient) {
      VG.gradient('gradient-fill-text', opts.textColorGradient, defs);
      opts.textColor = 'url(#gradient-fill-text)';
    }

    return this;
  };

  proto._initSize = function(force) {
    var opts = this.options;

    if (!opts.width || force) {
      opts.width = this.$container.width();
    }

    if (!opts.height || force) {
      opts.height = this.$container.height();
    }

    if (!opts.centerX || force) {
      // opts.centerX = opts.semiCircle ? (opts.R + (opts.width - opts.R) / 2) : opts.width/2;
      opts.centerX = opts.width/2;
    }

    if (!opts.centerY || force) {
      opts.centerY = opts.semiCircle ? (opts.R + (opts.height - opts.R) / 2) : opts.height/2;
    }

    return this;
  };

  proto._updateLabel = function(content, x, y) {
    var opts = this.options, $label = this.$label;

    if (content !== undefined) {
      if ($.isFunction(opts.onLabelUpdated)) {
        opts.onLabelUpdated.call(this, $label, content);
      } else {
        $label.html(content.toFixed ? content.toFixed(1) : content);
      }
    }

    _centerText($label, x, y);

    return this;
  };

  proto._bindEvents = function() {
    var opts = this.options;

    $(this.ringElem).on('mouseover mouseout', function(e) {
      VG.attr(this, 'fill', e.type === 'mouseover' ? opts.hoverColor : opts.fillColor);
    });

    return this;
  };

  proto._render = function() {
    var opts = this.options, path;

    if (this.options.growing) {
      path = this._growingPath();
    } else {
      path = this._ringPath();
    }

    this._updateLabel(this.valuePercent * 100);

    VG.attr(this.ringElem, 'd', path);

    return this;
  };

  proto._drawBG = function() {
    var opts = this.options, canvas = this.canvas;

    this.bgElem = VG.circle(canvas, opts.centerX, opts.centerY, opts.r + (opts.R - opts.r)/2, {
      'fill': 'none', 
      'filled': 'f', 
      'stroke': opts.ringColor, 
      'stroke-width': (opts.R - opts.r) + 'px'
    });

    return this;
  };

  proto._drawBGSemi = function() {
    var opts = this.options, canvas = this.canvas, path;

    path = this._halfRoundCirclePath();

    this.bgElem = VG.path(canvas, path, {
      'fill': opts.ringColor,
      'stroke': 'none', 
      'stroked': 'f'
    });

    return this;
  };

  proto._growingPath = function() {
    var opts = this.options,
      splinePoints,
      startAngle = deg2rad(opts.baseAngle),
      startX, startY, path, outterPoints, innerPoints, middlePoints, firstInnerPoint,
      R = opts.R,
      r = opts.r,
      rDiff = R - r,
      rMiddle = r + rDiff * opts.growingPosition;

    if (!this._cacheStart) {
      startX = opts.centerX + rMiddle * Math.cos(startAngle);
      startY = opts.centerY + rMiddle * Math.sin(startAngle);
      this._cacheStart = ['M', startX, startY];
    }

    splinePoints = this._splinePoints(this.angle, this.percent);

    outterPoints = splinePoints.map(function(v) {
      return v[0];
    });

    innerPoints = splinePoints.map(function(v) {
      return v[1];
    }).reverse();

    firstInnerPoint = innerPoints[0]; // 在使用in-out easings的时候可能为null

    middlePoints = firstInnerPoint ? [['A', rDiff / 2, rDiff / 2, 0, 0, 1, firstInnerPoint[1], firstInnerPoint[2]]] : [];

    path = [this._cacheStart].concat(outterPoints).concat(middlePoints).concat(innerPoints).concat('Z');

    return path;
  };

  proto._ringPath = function() {
    var opts = this.options, semi = opts.semiCircle, 
      startAngle = deg2rad(opts.baseAngle),
      endAngle = deg2rad(this.angle),
      startX, startY, endX, endY, path, largeArcFlag, sweepFlag,
      istartX, istartY, iendX, iendY, isweepFlag,
      R = opts.R,
      r = opts.r, 
      rDiff = (R - r)/2, 
      is100, FIX_100 = 0;

    startX = opts.centerX + R * Math.cos(startAngle);
    startY = opts.centerY + R * Math.sin(startAngle);

    endX = opts.centerX + R * Math.cos(endAngle);
    endY = opts.centerY + R * Math.sin(endAngle);

    istartX = opts.centerX + r * Math.cos(startAngle);
    istartY = opts.centerY + r * Math.sin(startAngle);

    iendX = opts.centerX + r * Math.cos(endAngle);
    iendY = opts.centerY + r * Math.sin(endAngle);

    largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    sweepFlag = opts.clockwise ? 1 : 0;
    isweepFlag = opts.clockwise ? 0 : 1;

    is100 = opts.value * this.percent >= 100 ? true : false;
    FIX_100 = is100 ? .0001 : 0;

    path = [
        ['M', startX, startY],
        ['A', R, R, 0, largeArcFlag, sweepFlag, endX - FIX_100, endY],
        semi ? ['A', rDiff, rDiff, 0, 0, 1, iendX - FIX_100, iendY] : ['L', iendX - FIX_100, iendY],
        ['A', r, r, 0, largeArcFlag, isweepFlag, istartX, istartY], 
        semi ? ['A', rDiff, rDiff, 0, 0, 1, startX, startY] : ['L', startX, startY], 
        'Z'
      ];

    return path;
  };

  proto._halfRoundCirclePath = function() {
    var opts = this.options, 
      startAngle = deg2rad(opts.baseAngle),
      endAngle = startAngle + deg2rad(opts.semiSweepAngle),
      path, rDiff = (opts.R - opts.r)/2, 
      R = opts.R, r = opts.r, 
      cx = opts.centerX, cy = opts.centerY, 
      x1, y1, x2, y2, x3, y3, x4, y4;

    x1 = cx + R * Math.cos(startAngle);
    y1 = cy + R * Math.sin(startAngle);

    x2 = cx + R * Math.cos(endAngle);
    y2 = cy + R * Math.sin(endAngle);

    x3 = cx + r * Math.cos(endAngle);
    y3 = cy + r * Math.sin(endAngle);

    x4 = cx + r * Math.cos(startAngle);
    y4 = cy + r * Math.sin(startAngle);

    path = [
      ['M', x1, y1], 
      ['A', R, R, 0, 0, 1, x2, y2],
      ['A', rDiff, rDiff, 0, 0, 1, x3, y3], 
      ['A', r, r, 0, 0, 0, x4, y4], 
      ['A', rDiff, rDiff, 0, 0, 1, x1, y1], 
      'Z'
    ];

    return path;
  };

  proto._splinePoints = function(angle, percent) {
    var opts = this.options,
      points = [],
      point,
      startAngle = deg2rad(opts.baseAngle),
      curAngle = startAngle,
      curPercent,
      endAngle = deg2rad(angle), 
      STEP = .1 / Math.PI,
      diffAngle = endAngle - startAngle,
      endX, endY,
      iendX, iendY,
      R = opts.R,
      r = opts.r,
      rDiff = R - r,
      rMiddle = r + rDiff * opts.growingPosition;

    if (diffAngle < 1e-6) {
      return points;
    }

    rDiff = rDiff * percent;

    while (curAngle <= endAngle) {
      curPercent = (curAngle - startAngle) / diffAngle;

      // re-calculate R based on curPercent
      R = rMiddle + (1-opts.growingPosition)*rDiff * curPercent;
      r = rMiddle - opts.growingPosition*rDiff * curPercent;

      endX = opts.centerX + R * Math.cos(curAngle);
      endY = opts.centerY + R * Math.sin(curAngle);

      iendX = opts.centerX + r * Math.cos(curAngle);
      iendY = opts.centerY + r * Math.sin(curAngle);

      point = [['L', endX, endY], ['L', iendX, iendY]];
      points.push(point);

      curAngle += STEP;
    }

    return points;
  };

  UCD.InspireCircle = InspireCircle;

})(this, jQuery);

