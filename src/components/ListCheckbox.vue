<template>
  <li class="collapse">

    <div class="collapse__title list-name">
      <button type="button"
              :class="`collapse__button ${!isOpenedList ? 'collapse__button_closed' : ''}`"
              @click="handleCollapseButtonClick"></button>
      <label
        :class="`label-checkbox collapse__label ${isCheckedList
        ? 'label-checkbox_status_checked'
        : checkedItemsIdList.length
          ? 'label-checkbox_status_select'
          : ''}`">
        <input type="checkbox"
               :name="`list-${list.id}`"
               :checked="isCheckedList"
               class="input-checkbox"
               @change="handleCheckedList">
        {{ list.name }}
      </label>
    </div>

    <ul :status="isOpenedList ? 'open' : 'close'"
        class="collapse__content items-box">
      <Item v-for="item in list.items"
            :key="`list-${list.id}-item-${item.id}`"
            :item="item"
            :listId="list.id"/>
    </ul>
  </li>
</template>

<script>
import Item from "@/components/Item";

export default {
  name: "ListCheckbox",
  props: {
    list: Object,
  },
  components: {
    Item,
  },

  computed: {
    checkedItemsIdList() {
      const checkedItemsIdList = [];
      this.list.items.forEach(item => {
        item.checked && checkedItemsIdList.push(item.id);
      })
      return checkedItemsIdList;
    },

    isCheckedList() {
      return this.checkedItemsIdList.length === this.list.items.length;
    },

    isOpenedList() {
      return this.$store.state.lists.openedListsId.includes(this.list.id);
    },
  },

  methods: {
    handleCollapseButtonClick() {
      this.$store.commit('updateOpenedListId', {
        listId: this.list.id, isOpen: !this.isOpenedList
      });
    },

    handleCheckedList(e) {
      const checked = e.target.checked;

      this.list.items.forEach(item => {
        this.$store.commit('setCheckedItem', {
          listId: this.list.id, itemId: item.id, isChecked: checked
        });
      })
    },
  }
}
</script>

<style>
.list-name {
  display: flex;
}

.items-box {
  padding: 0 75px;
}

.items-box[status='open'] {
  padding-top: 10px;
}

@media (max-width: 850px) {
  .items-box {
    padding-left: 50px;
    padding-right: 15px;
  }
}
</style>