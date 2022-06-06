<template>
  <v-card class="px-4 py-2">
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="px-0">
        {{ cardTitle }}
      </v-card-title>
      <div>
        <v-btn
          :disabled="isInActiveInitButton"
          @click="$emit('onInitButton')"
        >
          {{ initButtonText }}
        </v-btn>
        <v-btn
          class="primary ml-4"
          @click="$emit('onRepairButton')"
        >
          {{ repairButtonText }}
        </v-btn>
      </div>
    </div>
    <selected-card :location="selectedLocation.location" />
    <v-list>
      <non-seleted-card
        v-for="(bookmark, i) in nonSelectedBookmarks"
        :key="i"
        :location="bookmark.location"
        @onDeleteButton="handleNonSelectCardDeleteButton(bookmark)"
        @onSelectedButton="handleNonSelectCardSelectButton(bookmark)"
      />
    </v-list>
  </v-card>
</template>

<script>
import NonSeletedCard from './NonSeletedCard'
import SelectedCard from './SelectedCard'

export default {
  name: 'SelectedListCardForm',
  components: { SelectedCard, NonSeletedCard },
  props: {
    cardTitle: {
      type: String,
      default: '',
    },
    repairButtonText: {
      type: String,
      default: '수정',
    },
    initButtonText: {
      type: String,
      default: '초기화',
    },
    nonSelectedBookmarks: {
      type: Array,
      default: () => [],
    },
    selectedLocation: {
      type: Object,
      default: () => ({
        location: '',
        lat: '',
        long: '',
      }),
    },
    handleNonSelectCardDeleteButton: {
      type: Function,
      default: () => {
      },
    },
    handleNonSelectCardSelectButton: {
      type: Function,
      default: () => {
      },
    },
    isInActiveInitButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
