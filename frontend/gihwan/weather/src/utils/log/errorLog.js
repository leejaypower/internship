import logginError from './loggingError'

const agent = window.navigator.userAgent.toLowerCase()

const browserMap = [
  { short: 'edge', full: 'MS Edge' },
  { short: 'edg', full: 'Edge (chromium based)' },
  { short: 'opr', full: 'Opera' },
  { short: 'chrome', full: 'Chrome' },
  { short: 'firfox', full: 'Firefox' },
  { short: 'safari', full: 'Safari' },
]

const browserInfo = browserMap.filter(({ short }) => agent.indexOf(short) > -1)[0].full
const userInfo = localStorage.getItem('loginInfo') || sessionStorage.getItem('loginInfo')
const currentPath = window.location.href

const errorLog = (type, errorInfo) => {
  const logs = {
    type,
    date: String(new Date()),
    user: JSON.parse(userInfo),
    browser: browserInfo,
    href: currentPath,
    error: errorInfo,
  }
  logginError(logs)
}

export default errorLog
