<template>
  <v-card
    class="px-4"
    width="270"
    min-height="300"
  >
    <v-card-title
      class="d-flex justify-center"
    >
      {{ cardTitle }}
    </v-card-title>
    <v-text-field
      v-for="(input, key) in inputs"
      :key="key"
      :label="input.label"
      dense
      outlined
      :value="input.value"
      :rules="input.rules"
      :type="input.type"
      @input="$emit('onChangeInput', {inputKey: key, value: $event} )"
    />
    <v-btn
      color="primary"
      block
      :disabled="isInactiveSubmitButton"
      @click="$emit('onSubmitCardForm')"
    >
      {{ submitButtonText }}
    </v-btn>
    <slot name="underSubmitButton" />
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
        },
      }),
    },
    submitButtonText: {
      type: String,
      default: '',
    },
    isInactiveSubmitButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
