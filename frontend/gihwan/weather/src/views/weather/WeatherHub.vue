<template>
  <div>
    <v-container class="d-flex justify-space-between">
      <div class="d-flex">
        <router-link to="current">
          현재 위치
        </router-link>
        <div class="empty" />
        <router-link to="location">
          지역별 날씨
        </router-link>
        <div class="empty" />
        <CompareTabButton />
      </div>
      <template v-if="isBookmarkIconShow">
        <v-btn
          v-if="!isBookmark"
          icon
          small
          @click="setBookMark"
        >
          <v-icon color="red">
            mdi-heart-plus
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          small
          @click="removeBookmark"
        >
          <v-icon color="red">
            mdi-heart-minus
          </v-icon>
        </v-btn>
      </template>
      <div
        v-else
        class="empty"
      />
    </v-container>
    <router-view />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { mapGetters } from 'vuex'
import { alert } from '@/lib'
import CompareTabButton from './components'

export default {
  components: {
    CompareTabButton,
  },
  data: () => ({
    isBookmark: false,
  }),
  computed: {
    ...mapGetters('user', ['userIdx']),
    ...mapGetters('weather', ['currentCoords', 'currentName', 'locationCoord', 'isWeatherFetchResult']),
    isLogin() {
      return this.userIdx
    },
    currentPathName() {
      return this.$route.name
    },
    isSelectSiGu() {
      return !(this.currentPathName === 'location' && !this.locationCoord)
    },
    isBookmarkIconShow() {
      return this.isLogin && this.isSelectSiGu && !(this.currentPathName === 'compare') && (this.isWeatherFetchResult || this.locationCoord)
    },
  },
  updated() {
    this.bookmarkCheck()
  },
  mounted() {
    this.bookmarkCheck()
  },
  methods: {
    bookmarkCheck() {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
      if (!bookmarks) {
        this.isBookmark = false
        return
      }
      const isBookmark = bookmarks.some(({ userIdx, coords }) => {
        switch (this.currentPathName) {
          case 'current':
            return (userIdx === this.userIdx) && (coords.name === this.currentName)
          case 'location':
            return (userIdx === this.userIdx) && (coords.name) === this.locationCoord?.name
          default:
            return false
        }
      })
      this.isBookmark = isBookmark
    },
    bookmarkData({ value: userInputValue }) {
      const defaultObject = {
        idx: uuid(),
        userIdx: this.userIdx,
        title: userInputValue,
      }
      switch (this.currentPathName) {
        case 'current':
          return {
            ...defaultObject,
            coords: this.currentCoords,
          }
        case 'location':
          return {
            ...defaultObject,
            coords: this.locationCoord,
          }
        default:
          return false
      }
    },
    async setBookMark() {
      const result = await alert.input('북마크 추가', '북마크를 설정할 제목을 입력해 주세요.', '저장', '취소')
      if (result.isConfirmed) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        const bookmarkData = this.bookmarkData(result)
        if (bookmarks) {
          const newBookmarks = [...bookmarks, bookmarkData]
          localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
        } else {
          localStorage.setItem('bookmarks', JSON.stringify([bookmarkData]))
        }
        this.bookmarkCheck()
        alert.success('북마크 저장', '저장이 완료되었습니다.')
      }
    },
    async removeBookmark() {
      const { isConfirmed } = await alert.confirm('북마크 삭제', '정말로 삭제하시겠습니까?', '삭제', '취소', 'red')
      if (!isConfirmed) return
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
      const bookmarkToRemove = bookmarks.find(({ userIdx, coords }) => {
        switch (this.currentPathName) {
          case 'current':
            return (userIdx === this.userIdx) && (coords.name === this.currentName)
          case 'location':
            return (userIdx === this.userIdx) && (coords.name === this.locationCoord.name)
          default:
            return false
        }
      })
      this.$store.dispatch('weather/removeBookmark', bookmarkToRemove.idx)
      this.bookmarkCheck()
      alert.success('북마크 삭제', '삭제가 완료되었습니다.')
    },
  },
}
</script>
<style scoped>
.empty {
  width: 15px;
}
</style>
