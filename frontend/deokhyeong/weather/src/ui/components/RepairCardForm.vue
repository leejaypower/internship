<template>
  <v-card class="px-4 py-2">
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="px-0">
        {{ cardTitle }}
      </v-card-title>
      <div
        v-if="isEditting"
      >
        <v-btn
          class="#F44336"
          @click="$emit('onCancelButton')"
        >
          {{ cancelButtonText }}
        </v-btn>
        <v-btn
          class="ml-2 success"
          :disabled="isInactiveSubmitButton"
          @click="$emit('onSubmitButton')"
        >
          {{ submitButtonText }}
        </v-btn>
      </div>
      <div
        v-else
      >
        <v-btn
          class="primary"
          @click="$emit('onRepairButton')"
        >
          {{ repairButtonText }}
        </v-btn>
      </div>
    </div>
    <form>
      <v-text-field
        v-for="(input, key) in inputs"
        :key="key"
        :label="input.label"
        dense
        outlined
        :validate-on-blur="input.isValidateOnBlur === false ? false : true"
        :value="input.value"
        :rules="input.rules"
        :type="input.type"
        :placeholder="input.placeholder"
        :autocomplete="input.autocomplete"
        :disabled="input.disabled"
        @input="$emit('onChangeInput', {inputKey: key, value: $event} )"
      />
    </form>
  </v-card>
</template>

<script>
export default {
  props: {
    cardTitle: {
      type: String,
      default: '',
    },
    inputs: {
      type: Object,
      default: () => ({
        input: {
          label: '',
          value: '',
          rules: [],
          placeholder: '',
          autocomplete: 'off',
          disabled: false,
          isValidateOnBlur: true,
        },
      }),
    },
    submitButtonText: {
      type: String,
      default: '제출',
    },
    repairButtonText: {
      type: String,
      default: '수정',
    },
    cancelButtonText: {
      type: String,
      default: '취소',
    },
    isSelectListType: {
      type: Boolean,
      default: false,
    },
    isEditting: {
      type: Boolean,
      default: false,
    },
    isInactiveSubmitButton: {
      type: Boolean,
      default: false,
    },
    isSelectedStyle: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
