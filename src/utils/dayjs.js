import Vue from 'vue'

import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

Vue.filter('relativeTime',value => {
  return dayjs().to(dayjs(value))
})

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
