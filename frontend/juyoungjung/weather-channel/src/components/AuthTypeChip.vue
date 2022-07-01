<template>
  <div>
    <p>
      {{ text }}
    </p>

    <div>
      <v-chip
        v-if="requiredAuth"
        color="orange"
        small
        outlined
        label
      >
        회원전용
      </v-chip>

      <v-chip
        v-else
        color="light-blue"
        small
        outlined
        label
      >
        All
      </v-chip>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AuthTypeChip',
  props: {
    text: {
      type: String,
      default: '',
    },
    requiredAuth: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
