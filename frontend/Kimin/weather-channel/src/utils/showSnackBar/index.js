import store from '@/store'

const giveMessage = (text, color = 'pink') => {
  store.dispatch('giveOrderAlarm', {
    alarm: true,
    alarmColor: color,
    text,
  })
}

export default giveMessage
