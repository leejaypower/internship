<template>
  <div
    v-if="isOpenModal"
    id="alert_modal_background"
  >
    <div class="alert_modal_wrapper">
      <button
        class="alert_modal_close_button"
        @click="isPage ? $router.replace('/') : closeModal()"
      >
        <v-icon x-large>
          mdi-close-box
        </v-icon>
      </button>
      <v-alert
        class="text-center"
        :icon="false"
        :type="alertType"
        width="100%"
      >
        {{ alertText }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ModalStore } from '../../constant/stores'

export default {
  props: {
    isPage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(ModalStore, [
      'isOpenModal', 'alertText', 'alertType',
    ]),
  },
  methods: {
    ...mapActions(ModalStore, [
      'closeModal',
    ]),
  },
}
</script>

<style scoped>
#alert_modal_background {
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #7e827f;
  z-index: 99999;
}

#alert_modal_background .alert_modal_wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 0 auto;
  width: 25%;
  height: 100%;
}

#alert_modal_background .alert_modal_close_button{
  background: transparent;
  border: 0;
}

#alert_modal_background .alert_modal_close_button:hover {
  opacity: 0.5;
}

#alert_modal_background .alert_modal_close_button:active {
  opacity: 1;
}

</style>
