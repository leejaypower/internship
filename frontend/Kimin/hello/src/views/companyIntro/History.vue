<template>
  <div class="history-view">
    <img
      alt="barogoHistory"
      :src="barogoHistory"
    >
    히스토리 뷰
  </div>
</template>

<script>
import barogoHistory from '../../assets/company/barogoHistory.png'

export default {
  name: 'HistoryView',
  data() {
    return {
      barogoHistory,
    }
  },
}
</script>

<style scoped>
 .history-view{
   text-align: center;
 }
</style>
