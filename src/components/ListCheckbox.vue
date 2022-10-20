<template>
  <li class="collapse">

    <div class="collapse__title list-name">
      <button type="button" @click="handleCollapseButtonClick"
              :class="`collapse__button ${!isOpenedList ? 'collapse__button_closed' : ''}`"></button>
      <label
        :class="`label-checkbox collapse__label ${isCheckedList
        ? 'label-checkbox_status_checked'
        : list.checkedItemsIdList.length
          ? 'label-checkbox_status_select'
          : ''}`">
        <input type="checkbox" :name="`list-${list.id}`" :checked="isCheckedList" @change="handleCheckedList"
               class="input-checkbox">
        {{ list.name }}
      </label>
    </div>

    <ul :status="isOpenedList ? 'open' : 'close'" class="collapse__content items-box">
      <Item v-for="item in list.items" :key="`list-${list.id}-item-${item.id}`" :item="item" :listId="list.id"/>
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
    isCheckedList() {
      return this.list.checkedItemsIdList.length === this.list.items.length;
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

      if (checked) {
        this.list.items.filter(item => !this.list.checkedItemsIdList.includes(item.id))
          .forEach(item => {

            this.$store.commit('setCheckedItem', {
              listId: this.list.id, itemId: item.id, isChecked: true
            });

            this.$store.commit('updateCheckedItemsIdList', {
              listId: this.list.id, itemId: item.id, isChecked: true
            });
          })
      } else {
        this.list.items.filter(item => this.list.checkedItemsIdList.includes(item.id))
          .forEach(item => {

            this.$store.commit('setCheckedItem', {
              listId: this.list.id, itemId: item.id, isChecked: false
            });
          })

        this.$store.commit('clearCheckedItemsIdList', {
          listId: this.list.id
        });
      }
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
</style>