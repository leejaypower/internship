<template>
  <v-card>
    <div class="pa-4">
      기본정보 수정
    </div>
    <v-divider />
    <div
      class="px-4"
    >
      <button-input
        v-for="userInfo in basicUserInfos"
        :key="userInfo.id"
        :input-data="userInfo"
        @onSumbitInput="onSumbitInput"
        @onEditButton="onEditButton"
      />
    </div>
  </v-card>
</template>

<script>
import ButtonInput from '@/components/inputs/ButtonInput.vue'
import { mapActions, mapGetters } from 'vuex'
import { UserStore } from '@/constant/stores'

export default {
  components: { ButtonInput },
  computed: {
    ...mapGetters(UserStore, [
      'basicUserInfos',
    ]),
  },
  methods: {
    ...mapActions(UserStore, [
      'updateUserInfo', 'editUserInfo',
    ]),
    onSumbitInput(value, inputData) {
      this.updateUserInfo({ value, inputData })
    },
    onEditButton(inputData) {
      this.editUserInfo({ inputData })
    },
  },
}
</script>
