<template>
  <div id="dropDownDiv" class="displayNone">
    <ul>
      <li v-for="(category,i) of categoryOptions" :key= i
      @click="selectCategory(i)"
      >
        {{ category }}
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
  props: {
    categoryOptions: {
      type: Array,
      validator(value) {
        return value.length > 0
      },
    },
  },
  methods: {
    selectCategory(i) {
      const selectedCategory = this.categoryOptions[i]
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
    border: 0.5px solid rgba(190, 178, 178, 0.39);
    cursor: pointer;
  }
  .displayNone{
    display: none;
  }

  #dropDownDiv ul{
    padding: 0;
    margin: 0;
  }

  #dropDownDiv li{
    font-size: 15px;
  }

</style>
