<template>
  <div class="market-view">
    <img
      alt="BarogoMarketImage"
      :src="barogoMarket1"
    >
    <img
      alt="BarogoMarketImage"
      :src="barogoMarket2"
    >
    <img
      alt="BarogoMarketImage"
      :src="barogoMarket3"
    >
    마켓 뷰
  </div>
</template>

<script>
import barogoMarket1 from '../../assets/company/barogoMarket1.png'
import barogoMarket2 from '../../assets/company/barogoMarket2.png'
import barogoMarket3 from '../../assets/company/barogoMarket3.png'

export default {
  name: 'MarketView',
  data() {
    return {
      barogoMarket1,
      barogoMarket2,
      barogoMarket3,
    }
  },
}
</script>

<style scoped>
  .market-view{
    text-align: center;
  }
</style>
