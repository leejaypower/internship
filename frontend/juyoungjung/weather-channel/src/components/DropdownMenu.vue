<template>
  <div class="text-center">
    <v-menu
      offset-y
      :auto="true"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          outlined
          dark
          v-bind="attrs"
          v-on="on"
        >
          <span>
            {{ dropdownBtnText }}
          </span>
          <v-icon class="ml-1">
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>
      <v-list-item-group
        v-model="group"
      >
        <v-list
          nav
        >
          <v-list-item
            v-for="(item, index) in dropdownMenuItems"
            :key="index"
            active-class="grey lighten-5"
            :to="item.to"
            @click="checkDropdownMenuItemLink(item.name)"
          >
            <v-list-item-title
              v-text="item.title"
            />
          </v-list-item>
        </v-list>
      </v-list-item-group>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { DropdownMenuItems } from '@/data'

export default {
  name: 'DropdownMenu',
  data: () => ({
    group: null,
    dropdownMenuItems: DropdownMenuItems.before_login,
    dropdownBtnText: '환영합니다',
  }),
  computed: {
    ...mapGetters('user', [
      'accessToken',
      'nickname',
    ]),
  },
  watch: {
    accessToken(value) {
      if (value) {
        this.dropdownMenuItems = DropdownMenuItems.after_login
      } else {
        this.dropdownMenuItems = DropdownMenuItems.before_login
      }
    },
    nickname(value) {
      if (value && value !== this.dropdownBtnText) {
        this.dropdownBtnText = `${value}님`
      } else {
        this.dropdownBtnText = '환영합니다'
      }
    },
  },
  mounted() {
    if (this.nickname && this.nickname !== this.dropdownBtnText) {
      this.dropdownBtnText = `${this.nickname}님`
    }
  },
  methods: {
    checkDropdownMenuItemLink(name) {
      if (name === 'login') {
        this.$store.dispatch('user/setLoginFormModalVisible', { visible: true })
      } else if (name === 'logout') {
        this.$store.dispatch('user/logout')
      }
    },
  },
}
</script>
