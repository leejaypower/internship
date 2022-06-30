import { CELSIUS_UNIT } from '@/constants'
import makeWeatherDataToFixedOne from '../makeWeatherDataToFixedOne'

const inputCelsiusUnit = (temperature) => `${makeWeatherDataToFixedOne(temperature) + CELSIUS_UNIT}`

export default inputCelsiusUnit
