<template>
  <alert-modal :is-page="true" />
</template>
<script>
import AlertModal from '@/components/alertModal/AlertModal.vue'
import { mapActions, mapGetters } from 'vuex'
import { ModalStore } from '@/constant/stores'

export default {
  components: { AlertModal },
  beforeRouteLeave(to, from, next) {
    if (this.isOpenModal) {
      this.closeModal()
    }
    next()
  },
  computed: {
    ...mapGetters(ModalStore, ['isOpenModal']),
  },
  mounted() {
    this.openModal({
      alertText: '현재 페이지 정보가 없습니다.',
      alertType: 'error',
    })
  },
  methods: {
    ...mapActions(ModalStore, ['openModal', 'closeModal']),
  },
}
</script>
