<template>
  <div class="home">
    <ul>
      <List v-for="list in lists" :key="`list-${list.id}`" :list="list">
        <ul>
          <Item v-for="item in list.items" :key="`list-${list.id}-item-${item.id}`" :item="item" :listId="list.id"/>
        </ul>
      </List>
    </ul>


  </div>
</template>

<script>
import List from "@/components/List";
import Item from "@/components/Item";

export default {
  name: 'HomeView',
  components: {
    List,
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
