<template>
  <div class="home">
    <ul>
      <li v-for="list in lists" :key="`list-${list.id}`">
        <label><input type="checkbox" :name="`list-${list.id}`">{{list.name}}</label>
        <ul>
          <Item v-for="item in list.items" :key="`list-${list.id}-item-${item.id}`" :item="item" :listId="list.id"/>
        </ul>
      </li>
    </ul>


  </div>
</template>

<script>
import Item from "@/components/Item";

export default {
  name: 'HomeView',
  components: {
    Item,
  },
  data() {
    return {}
  },
  computed: {
    lists() {
      return this.$store.state.lists.lists;
    },
  },
  beforeMount() {
    this.$store.dispatch('getLists');
  }
}
</script>
