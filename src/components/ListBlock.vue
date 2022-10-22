<template>
  <li class="block collapse">
    <p class="block__name collapse__title">{{ list.name }}</p>

    <div :status="isOpenedList && checkedItems.length ? 'open' : 'close'"
         class="colors collapse__content">
      <ul v-if="isSortedCell"
          class="colors__rows">
        <li v-for="item in checkedItems"
            :key="`list-${list.id}-row-${item.id}`"
            class="colors__row">
          <div v-for="color in item.count"
               :key="`item-${item.id}-cell-${color}`"
               :id="item.id"
               :style="`background-color: ${item.color}`"
               class="colors__cell"
               @click="handleCellClick"></div>
        </li>
      </ul>
      <ul v-else
          class="colors__row">
        <li v-for="(item,index) in mixedItems"
            :key="`list-${list.id}-cell-${index}`"
            :id="item.itemId"
            :style="`background-color: ${item.color}`"
            class="colors__cell"
            @click="handleCellClick">
        </li>
      </ul>
    </div>

    <button type="button"
            @click="handleSortButtonClick"
            :class="`block__button ${checkedItems.length && isOpenedList ? 'block__button_visible' : ''}`">
      {{ isSortedCell ? 'Перемешать' : 'Сортировать' }}
    </button>
  </li>
</template>

<script>
export default {
  name: "ListBlock",
  props: {
    list: Object,
  },
  data() {
    return {
      isSortedCell: true,
    }
  },

  computed: {
    checkedItems() {
      return this.list.items.filter(item => item.checked && item.count);
    },

    mixedItems() {
      const sortedColors = [];

      this.checkedItems.forEach(item => {
        for (let i = 0; i < item.count; i++)
          sortedColors.push({itemId: item.id, color: item.color});
      });

      return this.isSortedCell ? sortedColors : this.shuffle(sortedColors);
    },

    isOpenedList() {
      return this.$store.state.lists.openedListsId.includes(this.list.id);
    },
  },

  methods: {
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

    handleCellClick(e) {
      const itemId = +e.target.id;
      const newCount = this.list.items.find(item => item.id === itemId).count - 1;

      this.$store.commit('setCountItem', {
        listId: this.list.id, itemId: itemId, count: newCount
      });
    },

    handleSortButtonClick() {
      this.isSortedCell = !this.isSortedCell;
    },
  }
}
</script>

<style>
.block {
  position: relative;
  padding: 0 10px 15px;
  border: 1px solid var(--color-black);
  border-radius: 15px;
}

.block__name {
  margin: 0;
  padding-top: 15px;
}

.block__button {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  min-width: 100px;
  border: none;
  border-radius: 10px;
  background-color: var(--blue-color);
  color: var(--color-white);
  cursor: pointer;
  z-index: 20;
  transition: all .3s;
}

.block__button:hover {
  opacity: .8;
}

.block__button_visible {
  visibility: visible;
  opacity: 1;
}

.colors[status="open"] {
  margin-top: 15px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.colors__rows {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.colors__row {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.colors__cell {
  width: 15px;
  height: 15px;
  list-style-type: none;
  cursor: pointer;
  transition: transform .3s;
}

.colors__cell:hover {
  transform: scale(1.2);
}
</style>