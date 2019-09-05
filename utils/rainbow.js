const Storage = {
  //  第一个 key 参数可以省略，直接传递 obj 对象，支持 callback
  setItem: function(key, obj, callback) {
    const getType = function(a) {
      var typeArray = Object.prototype.toString.call(a).split(' ');
      return typeArray[1].slice(0, -1);
    };
    var firstParamType = getType(arguments[0]);
    if (firstParamType === 'Object') {
      var keyArrayLength = Object.keys(arguments[0]).length;
      var index = 0;
      for (var keyName in arguments[0]) {
        index++;
        wx.setStorage({
          key: keyName,
          data: arguments[0][keyName],
          success: index == keyArrayLength ? arguments[1] : function() {}
        });
      }
    }
    if (firstParamType === 'String') {
      wx.setStorage({
        key: key,
        data: obj,
        success: callback || function() {}
      });
    }
  },
  getItem: function(key) {
    return wx.getStorageSync(key);
  },
  removeItem: function(key) {
    wx.removeStorage({
      key: key
    });
  }
};
var Event = (function() {
  var clientList = {},
    pub,
    sub,
    remove;

  var cached = {};

  sub = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    // 使用缓存执行的订阅不用多次调用执行
    cached[key + 'time'] == undefined ? clientList[key].push(fn) : '';
    if (cached[key] instanceof Array && cached[key].length > 0) {
      //说明有缓存的 可以执行
      fn.apply(null, cached[key]);
      cached[key + 'time'] = 1;
    }
  };
  pub = function() {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      //初始默认缓存
      cached[key] = Array.prototype.slice.call(arguments, 0);
      return false;
    }

    for (var i = 0, fn; (fn = fns[i++]); ) {
      // 再次发布更新缓存中的 data 参数
      cached[key + 'time'] != undefined
        ? (cached[key] = Array.prototype.slice.call(arguments, 0))
        : '';
      fn.apply(this, arguments);
    }
  };
  remove = function(key, fn) {
    var fns = clientList[key];
    // 缓存订阅一并删除
    var cachedFn = cached[key];
    if (!fns && !cachedFn) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
      cachedFn && (cachedFn.length = 0);
    } else {
      if (cachedFn) {
        for (var m = cachedFn.length - 1; m >= 0; m--) {
          var _fn_temp = cachedFn[m];
          if (_fn_temp === fn) {
            cachedFn.splice(m, 1);
          }
        }
      }
      for (var n = fns.length - 1; n >= 0; n--) {
        var _fn = fns[n];
        if (_fn === fn) {
          fns.splice(n, 1);
        }
      }
    }
  };
  return {
    pub: pub,
    sub: sub,
    remove: remove
  };
})();
module.exports = {
  Storage,
  Event
};
