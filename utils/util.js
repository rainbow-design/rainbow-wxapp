const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

function getTimeInAFewMinute(origin, minute) {
  var now = new Date(origin);
  var time = now.getTime() + 1000 * 60 * minute;
  return new Date(time);
}
/**
 * 判断数据类型
 *
 * @param {*} a
 * @returns Boolean String Array Object Function Number Undefined Null
 */
function getType(a) {
  return Object.prototype.toString.call(a).slice(8, -1);
}
function extend(target) {
  for (var i = 1, len = arguments.length; i < len; i++) {
    for (var prop in arguments[i]) {
      if (arguments[i].hasOwnProperty(prop)) {
        target[prop] = arguments[i][prop];
      }
    }
  }
  return target;
}
function dateAddZero(str) {
  return String(str).replace(/(?=\b\d\b)/g, "0");
}

function parsePrice(str, num) {
  // 四舍五入 格式化数字
  // toFix(8440.55,1) => 8440.6
  var num = num || 2;
  var times = Math.pow(10, num);
  var roundNum = Math.round(str * times) / times;
  return roundNum.toFixed(num);
}
function checkType(str, type) {
  switch (type) {
    case "empty":
      return (
        str == null ||
        str == "" ||
        str == undefined ||
        typeof str == typeof undefined
      );
    case "email":
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case "phone":
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str);
    case "tel":
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "number":
      return /^[0-9]$/.test(str);
    /**
     * 校验邮政编码
     * @param {string} str 字符串
     * @return {bool}
     */
    case "isZipCode":
      return /^(\d){6}$/.test(str);
    case "isURL":
      return /^(https|http):\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(
        str
      );
    case "english":
      return /^[a-zA-Z]+$/.test(str);
    case "allChinese":
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case "hasChinese":
      return /^[\u4E00-\u9FA5]/.test(str);
    case "IDCard":
      // (15位、18位数字)，最后一位是校验位，可能为数字或字符X
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case "lower":
      return /^[a-z]+$/.test(str);
    case "upper":
      return /^[A-Z]+$/.test(str);
    default:
      return true;
  }
}
// 四舍五入 格式化数字
// toFix(8440.55,1) => 8440.6
function toFixed(number, fractionDigits) {
  var times = Math.pow(10, fractionDigits);
  var roundNum = Math.round(number * times) / times;
  return roundNum.toFixed(fractionDigits);
}
function toast(content, callback) {
  wx.showToast({
    title: content,
    icon: "none",
    duration: 700,
    complete: callback
      ? setTimeout(() => {
          callback();
        }, 700)
      : function() {}
  });
}
function openLoading() {
  wx.showToast({
    title: "加载中",
    icon: "loading",
    mask: true,
    duration: 5000
  });
}

function closeLoading() {
  wx.hideToast();
}

function addKey(sourceArray, extendObj, filterFn) {
  var getType = function(a) {
    return Object.prototype.toString.call(a).slice(8, -1);
  };
  var secondParamType = getType(arguments[1]);

  if (!getType(sourceArray) == "Array") {
    throw new Error("The first argument must be an array type");
  }
  if (secondParamType === "Object") {
    return sourceArray.forEach((v, index, sourceArray) => {
      for (var key in extendObj) {
        v[key] = extendObj[key];
      }
      typeof filterFn === "function" ? filterFn(v, index, sourceArray) : "";
    });
  } else if (secondParamType === "Function") {
    return sourceArray.forEach((v, index, sourceArray) => {
      arguments[1](v, index, sourceArray);
    });
  } else {
    if (arguments.length > 1) {
      console.warn(
        "The second parameter type is " +
          secondParamType +
          " , Must use an object or function type"
      );
    }
    return sourceArray;
  }
}
// 距离结束时间的时间
function formatRemainTime(endTime) {
  var startDate = new Date(),
    endDate = new Date(endTime);
  //时间差
  var t = endDate.getTime() - startDate.getTime();

  var d = 0,
    h = 0,
    m = 0,
    s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }

  return {
    d,
    h,
    m,
    s
  };
}

// 距离结束时间的时间
function distanceStartTime(endTime) {
  var startDate = new Date(),
    endDate = new Date(endTime);
  //时间差
  var t = endDate.getTime() - startDate.getTime();

  var d = 0,
    h = 0,
    m = 0,
    s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }

  return {
    d,
    h,
    m,
    s
  };
}

function escape2Html(str) {
  if (!str) {
    return "";
  }

  var arrEntities = {
    lt: "<",
    gt: ">",
    nbsp: " ",
    "↵": " ",
    amp: "&",
    quot: '"'
  };

  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}

function getLocation(callback) {
  wx.getLocation({
    type: "gcj02",
    success(res) {
      const latitude = res.latitude;
      const longitude = res.longitude;
      callback(latitude, longitude);
    },
    fail(error) {
      throw new Error("获取位置信息失败...");
    }
  });
}

function getCityInfo(lat, lng, mapKey, callback) {
  // 逆位置解析
  // https://lbs.qq.com/webservice_v1/guide-gcoder.html
  wx.request({
    url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${mapKey}`,
    success: res => {
      callback(res.data.result);
    }
  });
}

/* 在某时间之前 */
// isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true
const isBeforeDate = (dateA, dateB) => dateA < dateB;

/* 在某时间之后 */
// isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true
const isAfterDate = (dateA, dateB) => dateA > dateB;

// 几天后 aFewDayLater(1) => 2019-07-18
const aFewDayLater = number => {
  let t = new Date();
  t.setDate(t.getDate() + number);
  return t.toISOString().split("T")[0];
};

module.exports = {
  formatTime: formatTime,
  getTimeInAFewMinute,
  getType,
  extend,
  parsePrice,
  checkType,
  toast,
  openLoading,
  closeLoading,
  toFixed,
  addKey,
  dateAddZero,
  formatRemainTime,
  distanceStartTime,
  escape2Html,
  isBeforeDate,
  isAfterDate,
  aFewDayLater,
  getLocation,
  getCityInfo
};
