<template>
  <li>
    <label><input type="checkbox" :name="`list-${listId}-item-${item.id}`" :checked="item.checked"
                  @change="handleCheckedItem">{{ item.name }}</label>
    <input type="number" min="0" :name="`list-${listId}-count-${item.id}`" :value="item.count"
           @change="handleCountChange">
    <input type="color" :name="`list-${listId}-color-${item.id}`" :value="item.color" @change="handleColorChange">
  </li>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
    listId: Number,
  },
  computed: {},
  methods: {
    handleCheckedItem(e) {
      this.$store.commit('setCheckedItem', {
        listId: this.listId, itemId: this.item.id, isChecked: e.target.checked
      });
      this.$store.commit('updateCheckedItemsList', {
        listId: this.listId, itemId: this.item.id, isChecked: e.target.checked
      });
    },

    handleCountChange(e) {
      const count = e.target.value % 1 === 0 ? e.target.value : Math.round(e.target.value);
      e.target.value = count;
      this.$store.commit('setCountItem', {
        listId: this.listId, itemId: this.item.id, count: count || 0
      });
    },

    handleColorChange(e) {
      this.$store.commit('setColorItem', {
        listId: this.listId, itemId: this.item.id, color: e.target.value
      });
    }
  }
}
</script>

<style scoped>

</style>