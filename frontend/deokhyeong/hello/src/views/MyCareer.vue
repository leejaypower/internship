<template>
  <div>
    <alert-modal />
    <div class="d-flex justify-end">
      <v-btn
        width="8rem"
        @click="onAddCareer"
      >
        추가
      </v-btn>
    </div>
    <v-card
      v-for="(career) in careers"
      :key="career.id"
      class="G-v-card-margin-top pa-4"
    >
      <div class="d-flex justify-end">
        <v-btn
          color="error"
          @click="onDeleteCareer(career.id)"
        >
          삭제
        </v-btn>
      </div>
      <div>
        <button-input
          v-for="(detail,index) in career.careerDetail"
          :key="index"
          :input-data="{...detail, careerId: career.id}"
          @onEditButton="onEditButton"
          @onSumbitInput="onSumbitInput"
        />
      </div>
    </v-card>
  </div>
</template>
<script>
import ButtonInput from '@/components/inputs/ButtonInput.vue'
import { mapActions, mapGetters } from 'vuex'
import { ModalStore, CareerStore } from '@/constant/stores'
import AlertModal from '@/components/alertModal/AlertModal.vue'

export default {
  components: { ButtonInput, AlertModal },
  computed: {
    ...mapGetters(CareerStore, [
      'careers', 'careersCount',
    ]),
  },
  methods: {
    ...mapActions(ModalStore, [
      'openModal',
    ]),
    ...mapActions(CareerStore, [
      'updateCareer', 'editCareer', 'addCareer', 'deleteCareer',
    ]),
    onSumbitInput(value, inputData) {
      this.updateCareer({ value, inputData })
    },
    onEditButton(inputData) {
      this.editCareer({ inputData })
    },
    onAddCareer() {
      this.addCareer()
    },
    onDeleteCareer(careerId) {
      this.deleteCareer({ careerId, warningModal: this.openModal })
    },
  },
}
</script>
