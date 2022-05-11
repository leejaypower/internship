<template>
  <div id="dropDownDiv">
    <ul>
      <li v-for="(li,i) of liGroup" :key= i
      @click="selectCategory(i)"
      >
        {{ li }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: [ 'liGroup' ],
  methods: {
    selectCategory(i) {
      const selectedCategory = this.liGroup[i]
      this.$emit('selectCategory', selectedCategory)
    },
  },
}
</script>

<style>
  #dropDownDiv{
    position: relative;
    left: 0;
    top: 0;
    border: 0.5px solid rgba(190, 178, 178, 0.39)
  }

  #dropDownDiv ul{
    padding: 0;
    margin: 0;
  }

  #dropDownDiv li{
    font-size: 15px;
  }

</style>
