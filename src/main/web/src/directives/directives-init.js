/**
 * 自定义vue组件初始化(标签内部)
 */

import {dateFilter} from './date/date-fliter.js'

export const directivesInit = function (vue) {
  dateFilter(vue)
}
