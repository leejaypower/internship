<template>
  <div v-if="bookmark === null">
    <div class="emptyBox pa-12 d-flex justify-center align-center">
      <span style="fontSize: 20px">통신을 실패하였습니다.</span>
      <v-icon
        class=""
        @click="reFetchAfterFetchFail"
      >
        mdi-refresh
      </v-icon>
    </div>
  </div>
  <div v-else>
    <CurrentWeather
      :current-data="bookmark"
      :loading="loading"
      :title="`${title} - ${name}`"
      :on-re-fetch="weatherDataReFetch"
    />
    <div class="mt-2 d-flex justify-end align-center">
      <v-btn
        color="green"
        small
        @click="updateName"
      >
        <v-icon color="white">
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        color="red"
        small
        @click="remove"
      >
        <v-icon color="white">
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { CurrentWeather } from '@/components/weather'
import { alert } from '@/lib'
import { mapActions } from 'vuex'

export default {
  components: {
    CurrentWeather,
  },
  props: {
    idx: {
      type: String,
      required: true,
    },
    bookmark: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: Array,
      required: true,
    },
    refresh: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions('weather', ['updateBookmark', 'removeBookmark', 'updateBookmarkName']),
    async weatherDataReFetch() {
      this.loading = true
      const findBookmark = this.bookmarks?.filter((bookmark) => bookmark.idx === this.idx)[0]
      const payload = {
        idx: this.idx,
        coords: { lat: findBookmark.coords.lat, lon: findBookmark.coords.lon },
      }
      await this.updateBookmark(payload)
      this.refresh()
      this.loading = false
    },
    async reFetchAfterFetchFail() {
      const { coords } = this.bookmarks.find((bookmark) => bookmark.idx === this.idx)
      await this.updateBookmark({ idx: this.idx, coords })
    },
    async remove() {
      const { isConfirmed } = await alert.confirm(this.title, '북마크를 정말로 삭제하시겠습니까?', '삭제', '취소', 'red')
      if (isConfirmed) {
        try {
          this.loading = true
          this.removeBookmark(this.idx)
          alert.success('북마크 삭제', '삭제를 완료하였습니다.')
        } catch (error) {
          alert.error('북마크 삭제', '삭제를 실패하였습니다.')
        } finally {
          this.loading = false
          this.refresh()
        }
      }
    },
    async updateName() {
      const result = await alert.input('북마크 수정', '변경할 제목을 입력해 주세요.', '저장', '취소', null, this.title)
      if (result.isConfirmed) {
        try {
          this.loading = true
          this.updateBookmarkName({ idx: this.idx, value: result.value })
          alert.success('북마크 수정', '수정을 완료하였습니다.')
        } catch (error) {
          alert.error('북마크 수정', '수정을 실패하였습니다.')
        } finally {
          this.loading = false
          this.refresh()
        }
      }
    },
  },
}
</script>

<style scoped>
.emptyBox {
  height: 269.25px;
  border-radius: 10px;
  box-shadow: 5px 5px 14px 0px rgba(0,0,0,0.69);
}
</style>
