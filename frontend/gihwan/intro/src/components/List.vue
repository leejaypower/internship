<template>
  <div>
    <ul v-if="list.length > 0">
      <li
        v-for="todo in list"
        :key="todo.id"
      >
        <list-item
          :id="todo.id"
          :value="todo.value"
          :edit-list="editList"
          :remove-list="removeList"
        />
      </li>
    </ul>
    <slot
      v-else
      class="empty"
      name="empty"
    />
  </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  name: 'ListComponent',
  components: {
    'list-item': ListItem,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    editList: {
      type: Function,
      required: true,
    },
    removeList: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style scoped>
  ul {
    width: 200px;
    list-style: none;
  }
</style>
