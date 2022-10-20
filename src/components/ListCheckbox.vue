<template>
  <li class="collapse">
    <div class="collapse__title">
      <button type="button" class="collapse__button"></button>
      <label
        :class="`label-checkbox ${isCheckedList
        ? 'label-checkbox_status_checked'
        : list.checkedItemsIdList.length
          ? 'label-checkbox_status_select'
          : ''}`">
        <input type="checkbox" :name="`list-${list.id}`" :checked="isCheckedList" @change="handleCheckedList"
               class="input-checkbox">
        {{ list.name }}</label>
    </div>
    <ul class="collapse__content">
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

<style>

.collapse {
  padding-left: 10px;
}

.collapse__title {
  display: flex;
}

.collapse__button {
  margin-right: 20px;
  position: relative;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: transform .3s;
}

.collapse__button::before, .collapse__button::after {
  content: "";
  position: absolute;
  top: auto;
  right: 0;
  left: 0;
  display: block;
  width: 13px;
  height: 2px;
  transition: all .3s ease-out;
  background-color: var(--color-black);
}

.collapse__button::before {
  transform: translate(-1px, -50%) rotate(45deg);
}

.collapse__button::after {
  transform: translate(7px, -50%) rotate(-45deg);
}

.collapse__button_closed {
  transform: rotate(-90deg);
}

.collapse__content {
  padding: 10px 75px 0;
}

.label-checkbox {
  position: relative;
  font-weight: 700;
}

.label-checkbox::before {
  content: '';
  position: absolute;
  top: auto;
  left: 0;
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-black);
  box-sizing: border-box;
}

.label-checkbox_status_checked::before {
  background: url("../assets/check_icon.svg") center / contain no-repeat;
}

.label-checkbox_status_select::after {
  content: '';
  position: absolute;
  top: calc(10px - 7px / 2);
  left: calc(10px - 7px / 2);
  display: block;
  width: 7px;
  height: 7px;
  background-color: var(--color-black);
  border-radius: 50%;
}


.input-checkbox {
  margin-right: 15px;
  visibility: hidden;
}


</style>