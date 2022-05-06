<template>
  <div
    class="card-container"
    :style="{ maxWidth, paddingTop }"
  >
    <v-form
      class="d-flex align-center"
      @submit.prevent
    >
      <div class="label">
        {{ inputData.label }}
      </div>
      <v-textarea
        v-if="inputData.inputType === 'multiline'"
        v-model="inputValue"
        :disabled="!inputData.isEdit"
        :rules="inputData.rules"
        class="px-4 G-input-disabled-font-color"
        :placeholder="placeholder"
      />
      <v-text-field
        v-else
        v-model="inputValue"
        :disabled="!inputData.isEdit"
        :rules="inputData.rules"
        class="pt-4 px-4 G-input-disabled-font-color"
        :placeholder="placeholder"
      />
      <v-btn
        v-show="inputData.isEdit"
        :disabled="isNotPassedValidation"
        @click="$emit('onSumbitInput', inputValue, inputData)"
      >
        완료
      </v-btn>
      <v-btn
        v-show="!inputData.isEdit"
        @click="$emit('onEditButton', inputData)"
      >
        수정
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: '560px',
    },
    paddingTop: {
      type: String,
      default: '0',
    },
    inputData: {
      type: Object,
      default: () => ({
        id: Math.random(),
        key: 'no-key',
        label: 'default',
        value: '',
        placeholder: '',
        isEdit: false,
        inputType: '',
        rules: [],
        checkValidation: () => true,
      }),
    },
  },
  data() {
    return {
      inputValue: this.inputData.value,
    }
  },
  computed: {
    placeholder() {
      if (this.inputData.isEdit) {
        return this.inputData.placeholder || ''
      }
      return ''
    },
    isNotPassedValidation() {
      const { checkValidation } = this.inputData
      return !checkValidation(this.inputValue)
    },
  },
}
</script>

<style scoped>
.label {
  min-width: 15%;
  max-width: 25%;
}
</style>
