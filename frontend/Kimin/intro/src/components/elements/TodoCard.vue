<template>
  <div v-if="cardOpen" id="background" @click.stop="clickOthers">
    <div id="todoCard"
      ref="todoCard"
      @click.stop="clickCard"
    >
    <div id="contentsContainer">
      <div id="cardTitle">
        <input
          id="title"
          type="text"
          placeholder="제목"
          ref="title"
          @keydown.enter="saveTodo"
          v-model="item.title"
          >
      </div>
      <div id="contents">
        <textarea
        id="contents"
        type="text"
        placeholder="내용"
        ref="contents"
        v-model="item.contents"
        ></textarea>
      </div>
    </div>
    <div id="editsContainer">
      <div id="dropDownContainer">
        <button
        id="categotyButton"
        ref="category"
        @click="openCategory"
        >
        {{ item.category }}
        </button>
        <drop-down-menu
          :categoryOptions="categoryOptions"
          @selectCategory="decideCategory"
        ></drop-down-menu>
      </div>
      <input
      v-model="item.date"
      ref="date"
      type="date"
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
      dropDownStatus: false,
      item: {
        title: this.cardData.title,
        category: this.cardData.category,
        contents: this.cardData.contents,
        date: this.cardData.date,
      },
    }
  },
  props: [
    'cardData', 'cardOpen',
  ],
  components: {
    'drop-down-menu': DropDownMenu,
  },
  computed: {
    categoryOptions() {
      return this.$store.getters.getCategories
    },
    todos() {
      return this.$store.getters.getTodos
    },
    defaltDate() {
      const today = new Date()
      const year = today.getFullYear()
      let month = today.getMonth() + 1
      if (month.length === 1) {
        month = String(today.getMonth() + 1).padStart(2, '0')
      }
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
  },
  methods: {
    clickOthers() {
      this.item = {
        title: this.cardData.title,
        category: this.cardData.category,
        contents: this.cardData.contents,
        date: this.cardData.date,
      }
      this.$emit('closeCard')
    },
    clickCard() {
      this.dropDownStatus = false
    },
    generateID() { // eslint-disable-next-line
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16)
      })
    },
    saveTodo() {
      const ID = this.generateID()
      const { title, contents } = this.item
      let { date } = this.item
      if (!title.trim()) return
      if (this.item.date === null) {
        date = this.defaltDate
      }
      let category = '기타'
      if (this.$refs.category.innerText !== '카테고리') {
        category = this.$refs.category.innerText
      }
      const itemSet = {
        title, contents, category, date, ID,
      }
      const isEditing = this.cardData.ID
      if (isEditing) {
        this.$store.dispatch('editItems', { item: itemSet, ID: this.cardData.ID })
      } else {
        this.$store.dispatch('addTodos', itemSet)
      }
      this.clickOthers()
    },
    openCategory() {
      const dropDownMenu = document.querySelector('#dropDownDiv')
      if (!this.dropDownStatus) {
        dropDownMenu.classList.remove('displayNone')
      } else {
        dropDownMenu.classList.add('displayNone')
      }
      this.dropDownStatus = !this.dropDownStatus
    },
    decideCategory(category) {
      this.item.category = category
      const dropDownMenu = document.querySelector('#dropDownDiv')
      dropDownMenu.classList.add('displayNone')
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
    cursor: pointer;
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
