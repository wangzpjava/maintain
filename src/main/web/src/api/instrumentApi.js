/**
 * Created by zhang.lu on 2018/5/7.
 */
import {getApiRoot} from '../../build/apiConfig.js'

/******************************************************
 * current module
 ******************************************************/
const currentRootRest = getApiRoot('/current')
export const LOGIN_REST = currentRootRest + '/instrument/login'
export const LOGOUT_REST = currentRootRest + '/instrument/logout'
export const LOGIN_USER_INFO_REST = currentRootRest + '/user/info'

/******************************************************
 * instrument module
 ******************************************************/
const instrumentRootRest = getApiRoot('/instrument')
export const INSTRUMENT_LIST_REST = instrumentRootRest + '/list'
export const INSTRUMENT_TOTAL_REST = instrumentRootRest + '/total'

/******************************************************
 * category module
 ******************************************************/
const categoryRootRest = getApiRoot('/category')
export const CATEGORY_CASCADER_REST = categoryRootRest + '/cascader' //级联下拉框

/******************************************************
 * favorites module
 ******************************************************/
const favoritesRootRest = getApiRoot('/favorites')
export const FAVORITES_ADD_OR_CANCEL_REST = favoritesRootRest + ''
export const FAVORITES_INSTRUMENT_LIST_REST = favoritesRootRest + '/instruments/list'
export const FAVORITES_INSTRUMENT_TOTAL_REST = favoritesRootRest + '/instruments/total'

/******************************************************
 * thumb up module
 ******************************************************/
const thumbUpRootRest = getApiRoot('/thumbup')
export const THUMBUP_ADD_OR_CANCEL_REST = thumbUpRootRest + ''

/******************************************************
 * topic module
 ******************************************************/
const topicRootRest = getApiRoot('/topic')
export const TOPIC_DETAIL_REST = topicRootRest + '/detail'

/******************************************************
 * comment module
 ******************************************************/
const commentRootRest = getApiRoot('/comment')
export const COMMENT_LIST_REST = commentRootRest + '/list'
export const COMMENT_LV2_LIST_REST = commentRootRest + '/lv2/list'
export const COMMENT_LIST_COUNT_REST = commentRootRest + '/list/count'
export const COMMENT_ADD_REST = commentRootRest + ''
