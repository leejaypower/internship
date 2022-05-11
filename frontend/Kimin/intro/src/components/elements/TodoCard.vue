<template>
  <div v-if="cardStatus" id="background" @click.stop="clickOthers">
    <div id="todoCard"
      ref="todoCard"
      @click.stop
    >
    <div id="contentsContainer">
      <div id="cardTitle">
        <input
          id="title"
          type="text"
          placeholder="제목"
          ref="title"
          @keydown="saveTodo"
          :value="cardDetail.title"
          >
      </div>
      <div id="contents">
        <textarea
        id="contents"
        type="text"
        placeholder="내용"
        ref="contents"
        :value="cardDetail.contents"
        ></textarea>
      </div>
    </div>
    <div id="editsContainer">
      <div id="dropDownContainer">
        <button
        id="categotyButton"
        ref="categoryButton"
        @click="openCategory"
        v-text="cardDetail.category"
        >
        </button>
        <drop-down-menu
          v-if="categoryOpen"
          :liGroup="liGroup"
          @selectCategory="decideCategory"
        ></drop-down-menu>
      </div>
      <input
      :value="cardDetail.date"
      ref="date"
      type="datetime-local"
      id="dateButton"/>
    </div>
    <div id="actions">
      <button
        @click="clickOthers"
      >취소</button>
      <button
        id="saveButton"
        @click="saveTodo"
      >추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import DropDownMenu from './DropDownMenu.vue'

export default {
  name: 'todoCard',
  data() {
    return {
      categoryOpen: false,
      category: '기타',
    }
  },
  components: {
    'drop-down-menu': DropDownMenu,
  },
  computed: {
    liGroup() {
      return this.$store.getters.getCategories
    },
    todos() {
      return this.$store.getters.getTodos
    },
    cardStatus() {
      return this.$store.getters.getCardStatus
    },
    cardDetail() {
      return this.$store.getters.getcardDetail
    },
    date() {
      const today = new Date()
      return today.toISOString().substr(0, 16)
    },
  },
  methods: {
    clickOthers() {
      this.$store.dispatch('cardChange', false)
    },
    generateID() { // eslint-disable-next-line
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16) // eslint-disable-next-line
      });
    },
    saveTodo(e) {
      const title = this.$refs.title.value
      if ((e.type !== 'click' && e.key !== 'Enter') || !title) return
      const ID = this.generateID()
      const contents = this.$refs.contents.value
      let { date } = this
      if (this.$refs.date.value) {
        date = this.$refs.date.value
      }
      const { category } = this
      const itemSet = {
        title, contents, category, date, ID,
      }
      const isEditing = this.cardDetail.title
      if (isEditing) {
        this.$store.dispatch('editItems', { item: itemSet, ID: this.cardDetail.ID })
        console.log(itemSet)
      } else {
        this.$store.dispatch('addTodos', itemSet)
      }
      this.category = '카테고리'
      this.clickOthers()
    },
    openCategory() {
      this.categoryOpen = true
    },
    decideCategory(category) {
      this.category = category
      this.$refs.categoryButton.textContent = category
      this.categoryOpen = false
    },
  },
}
</script>

<style>
  #background{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  #todoCard{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 500px;
    height: 300px;
    padding: 1%;
    box-shadow: 2px 3px 10px 5px grey;
    background-color: rgba(250, 250, 250)
  }

  #title, #contents {
    width: 100%;
    border: none;
    background-color: transparent;
    cursor: text;
  }

  #dateButton{
    margin-left: 10px;
  }

  #title{
    font-size: 24px;
    margin-bottom: 20px;
  }

  #contents{
    font-size: 16px;
    height: 80%;
    vertical-align: text-top;
  }

  #todoCard button {
    min-width: 60px;
    border-radius: 5px;
    border: 0.5px solid rgba(190, 178, 178, 0.39);
  }

  #actions{
    display: flex;
    justify-content: space-between
  }
  #editsContainer{
    display: flex;
    justify-content: flex-end;
    height: 10%;
    line-height: 20px;
  }
  #contentsContainer{
    height: 70%;
  }

  #saveButton{
    background-color: #e14822;
    color: white;
    font-weight: 700;
  }

  li{
    list-style-type: none;
  }

  #categotyButton{
    position: relative;
    padding: 0;
  }
</style>
