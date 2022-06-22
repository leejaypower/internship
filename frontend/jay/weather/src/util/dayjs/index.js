import dayjs from 'dayjs'

const dayjsObjFromUnixTime = (timestamp) => dayjs.unix(timestamp)

export default dayjsObjFromUnixTime
