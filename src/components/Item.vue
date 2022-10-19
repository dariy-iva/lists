<template>
  <li class="item">
    <label class="item__label"><input type="checkbox" :name="`list-${listId}-item-${item.id}`">{{item.name}}</label>
    <input type="number" min="0" step="1" :value="item.count" :name="`list-${listId}-count-${item.id}`">
    <input type="color" :name="`list-${listId}-color-${item.id}`" :value="item.color">
  </li>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
    listId: Number,
  },
}
</script>

<style scoped>

</style>