<template>
  <li class="item-inputs">

    <label :class="`label-checkbox item-inputs__checkbox ${item.checked? 'label-checkbox_status_checked' : ''}`">
      <input type="checkbox"
             :name="`list-${listId}-checkbox-${item.id}`"
             :checked="item.checked"
             @change="handleCheckedItem"
             class="input-checkbox">{{ item.name }}</label>

    <input type="number"
           min="0"
           :name="`list-${listId}-count-${item.id}`"
           :value="item.count"
           @change="handleCountChange"
           class="item-inputs__number">

    <input type="color"
           :name="`list-${listId}-color-${item.id}`"
           :value="item.color"
           @change="handleColorChange"
           class="item-inputs__color">
  </li>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
    listId: Number,
  },

  methods: {
    handleCheckedItem(e) {
      this.$store.commit('setCheckedItem', {
        listId: this.listId, itemId: this.item.id, isChecked: e.target.checked
      });
    },

    handleCountChange(e) {
      const count = e.target.value % 1 === 0 ? e.target.value : Math.round(e.target.value);
      e.target.value = count;

      this.$store.commit('setCountItem', {
        listId: this.listId, itemId: this.item.id, count: +count || 0
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

<style>
.item-inputs {
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
}

.item-inputs:not(:last-child) {
  margin-bottom: 5px;
}

.item-inputs__checkbox {
  margin-right: auto;
}

.item-inputs__number {
  max-width: 70px;
  text-align: end;
  border: none;
}

.item-inputs__color {
  padding: 0;
  border: none;
  background: none;
  width: 27px;
}

.item-inputs__color::-webkit-color-swatch-wrapper {
  padding: 0;
}

.item-inputs__color::-webkit-color-swatch {
  border: none;
}

</style>