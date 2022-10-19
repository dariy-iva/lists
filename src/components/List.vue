<template>
  <li>
    <label><input type="checkbox" :name="`list-${list.id}`" :checked="isCheckedList"
                  @change="handleCheckedList">{{ list.name }}</label>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "List",
  props: {
    list: Object,
  },
  computed: {
    isCheckedList() {
      return this.list.checkedItemsIdList.length === this.list.items.length;
    },
  },
  methods: {
    handleCheckedList(e) {
      const checked = e.target.checked;
      if (checked) {
        this.list.items.filter(item => !this.list.checkedItemsIdList.includes(item.id)).forEach(item => {
          this.$store.commit('setCheckedItem', {
            listId: this.list.id, itemId: item.id, isChecked: true
          });
          this.$store.commit('updateCheckedItemsList', {
            listId: this.list.id, itemId: item.id, isChecked: true
          });
        })
      } else {
        this.list.items.filter(item => this.list.checkedItemsIdList.includes(item.id)).forEach(item => {
          this.$store.commit('setCheckedItem', {
            listId: this.list.id, itemId: item.id, isChecked: false
          });
        })
        this.$store.commit('clearCheckedItemsList', {
          listId: this.list.id
        });
      }
    },
  }
}
</script>

<style scoped>

</style>