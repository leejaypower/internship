import { VUE_ERROR_HANDLER } from '@/constants'
import dayjs from 'dayjs'
import makeLocalStorageErrorLogList from './localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from './localStorageLogController/saveErrorLogAtLocalStorage'

const vueErrorHandler = (error, vm, info) => {
  if (!error || !vm) {
    return
  }

  const log = {
    type: VUE_ERROR_HANDLER,
    name: error.name,
    originElement: vm.$el.innerHTML,
    vnodeTag: vm.$vnode.tag,
    message: error.message,
    stack: error.stack,
    routePath: vm.$route.fullPath,
    routeMeta: vm.$route.meta,
    info,
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  const newList = makeLocalStorageErrorLogList(log)
  saveErrorLogAtLocalStorage(JSON.stringify(newList))
}

export default vueErrorHandler
