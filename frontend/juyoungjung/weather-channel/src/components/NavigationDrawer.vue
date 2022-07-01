<template>
  <v-navigation-drawer
    :value="isDrawerVisible"
    absolute
    temporary
    stateless
  >
    <v-list
      nav
      dense
      two-line
    >
      <v-list-item-group
        v-model="group"
      >
        <v-list-item
          class="d-flex justify-center py-5"
          disabled
        >
          <h3>
            The Weather Channel
          </h3>
        </v-list-item>

        <v-list-item
          v-for="item in appBarMenuItems"
          :key="item.icon"
          active-class="grey lighten-5"
          :to="item.to"
          @click="updateIsDrawerVisible()"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-center">
              <auth-type-chip
                :text="item.text"
                :required-auth="item.requiredAuth"
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { appBarMenuItems } from '@/data'
import AuthTypeChip from './AuthTypeChip.vue'

export default {
  name: 'NavigationDrawer',
  components: { AuthTypeChip },
  props: {
    isDrawerVisible: {
      type: Boolean,
      default: false,
    },
    appBarMenuItems: {
      type: Array,
      default: () => appBarMenuItems,
    },
  },
  emits: ['onChangeIsDrawerVisible'],
  data: () => ({
    group: null,
  }),
  methods: {
    updateIsDrawerVisible() {
      this.$emit('onChangeIsDrawerVisible')
    },
  },
}
</script>
