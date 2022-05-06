<template>
  <v-card class="pa-4">
    안녕하세요, 제 이름은 <strong class="strong_blue">{{ userName }}</strong> 입니다. <br>
    제 취미는 <strong class="strong_blue">{{ hobby }}</strong>이며,
    사는 곳은 <strong class="strong_blue">{{ living }}</strong> 입니다.<br>
    현재 {{ companyName }} 에서 프론트엔드 파트 인턴으로서 근무중입니다.<br>
    총 근무 기간은 <strong class="strong_blue">{{ period }}</strong>입니다.<br>
    현재 <strong class="strong_blue">{{ project }}</strong>입니다.<br>
    <br>
    추가 문의사항은 <strong class="strong_blue">{{ email }}</strong>로 보내주세요.
  </v-card>
</template>
<script>
import { CareerStore, UserStore } from '@/constant/stores'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(UserStore, [
      'userName', 'email', 'hobby', 'living',
    ]),
    ...mapGetters(CareerStore, [
      'companyName', 'period', 'project',
    ]),
  },
}
</script>

<style scoped>
.strong_blue {
  color: #3060f0;
}
</style>
