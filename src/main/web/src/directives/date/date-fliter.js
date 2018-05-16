/**
 * Created by Administrator on 2018/2/1 0001.
 */
import moment from 'moment'

export const dateFilter = function (vue) {
  vue.filter('timestamp', function (time, formatString) {
    if (!time) {
      return
    }
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    let ss = moment(time).format(formatString)
    return getTimeDescription(ss)
  })
}

function getTimeDescription(time) {
  let oldDate = new Date(time)
  let year = oldDate.getFullYear();
  let month = oldDate.getMonth() + 1;
  let day = oldDate.getDate();
  let hour = oldDate.getHours();
  let minute = oldDate.getMinutes();
  if (minute < 10) {
    minute = '0' + minute
  }
  let second = oldDate.getSeconds();

  let newDate = new Date()

  var dayNum = "";
  var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;

  if (getTime < 60) {
    dayNum = "刚刚";
  } else if (getTime >= 60 && getTime < 60 * 60) {
    dayNum = (getTime/60).toFixed(0) + '分钟前'
  } else if (getTime >= 3600 && getTime < 3600 * 24) {
    if (hour >= 10) {
      dayNum = '今天' + hour + "时" + minute + "分" + second + '秒';
    } else {
      dayNum = '今天0' + hour + "时" + minute + "分" + second + '秒';
    }
  } else if (year === newDate.getFullYear() && month === (newDate.getMonth() + 1) && (day + 1) === newDate.getDate()) {
    if (hour >= 10) {
      dayNum = "昨天" + hour + "时" + minute + "分" + second + '秒'
    } else {
      dayNum = "昨天0" + hour + "时" + minute + "分" + second + '秒'
    }
  } else {
    dayNum = time
  }

  return dayNum;
}
