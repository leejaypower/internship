<template>
  <v-container>
    <v-row v-if="weatherBookmarks">
      <template v-if="bookmarks.length > 0">
        <v-col
          v-for="{idx, title, name, data} in weatherBookmarks"
          :key="idx"
          :cols="cols"
        >
          <BookmarkItem
            :idx="idx"
            :bookmark="data"
            :title="title"
            :name="name"
            :bookmarks="bookmarks"
            :refresh="updateBookmarks"
          />
        </v-col>
      </template>
      <v-col
        v-else
        class="d-flex flex-column align-center"
        align="center"
      >
        <span class="text-h5 text-sm-h2 mt-10 mb-10">저장된 북마크가 없습니다❌</span>
        <v-btn
          width="200"
          color="success"
          @click="$router.push('/weather')"
        >
          날씨 페이지로 이동
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        저장된 지역이 없습니다.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import weatherMixins from '@/mixins/weather'
import BookmarkItem from './BookmarkItem.vue'

export default {
  components: {
    BookmarkItem,
  },
  mixins: [weatherMixins],
  data: () => ({
    bookmarks: [],
  }),
  computed: {
    ...mapGetters('user', ['userIdx']),
    ...mapGetters('weather', ['weatherBookmarks']),
  },
  async mounted() {
    await this.updateBookmarks()
    await this.getBookmarksData()
  },
  methods: {
    ...mapActions('weather', ['updateBookmarksData']),
    async updateBookmarks() {
      const bookmarks = await JSON.parse(localStorage.getItem('bookmarks'))
      if (bookmarks) {
        this.bookmarks = bookmarks.filter(({ userIdx }) => userIdx === this.userIdx)
      }
    },
    compareBookmarksAndStore() {
      return this.bookmarks.filter(
        ({ idx }) => !this.weatherBookmarks.some((store) => store.idx === idx),
      )
    },
    async getBookmarksData() {
      if (this.compareBookmarksAndStore().length !== 0) {
        await this.updateBookmarksData(this.compareBookmarksAndStore())
      }
    },
  },
}
</script>

<style scoped>
.bookmark {
  width: 100%;
  border: 1px solid #f1f1f1;
}
</style>
