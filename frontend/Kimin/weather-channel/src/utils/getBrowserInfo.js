export default function getBrowserInfo() {
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
  return browserInfo
}
