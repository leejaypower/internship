<template>
  <div id="headerLine">
    <div id="fisrtHeaderGroup">
      <p>Kimin's To-Do-List</p>
    </div>
    <div id="secondHeaderGropup">
      <header-button
        class="headerButton"
      >+
      </header-button>
    </div>
  </div>
</template>

<script>

import headerButton from '../elements/Headerbutton.vue'

export default {
  data() {
    return {
      name: 'app-header',
    }
  },
  components: {
    'header-button': headerButton,
  },

}
</script>

<style>
 #headerLine{
  height: 100%;
  display:flex;
  justify-content: space-between;
  background-color: #e14822;
  grid-area: h;
 }

 .headerButton{
  width: 50px;
  height: 100%;
  font-size: 3vh
 }

 #fisrtHeaderGroup{
  width: 500px;
  display:flex;
  justify-content:flex-start;
  padding-left: 20px;
 }

 #fisrtHeaderGroup p{
  font-size: 18px;
  font-weight: 700;
 }

 #secondHeaderGropup{
  display: flex;
  justify-content: space-around;
 }
</style>
