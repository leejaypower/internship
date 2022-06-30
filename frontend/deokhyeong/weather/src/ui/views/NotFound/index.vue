<template>
  <div class="d-flex flex-column justify-center pa-4 full-height">
    <img
      src="/images/404.webp"
      alt="404페이지 이미지"
      width="100%"
    >
    <bottom-navigation />
  </div>
</template>
<script>
import BottomNavigation from '@/ui/components/layout/BottomNavigation'

export default {
  name: 'NotFound',
  components: { BottomNavigation },
}
</script>
