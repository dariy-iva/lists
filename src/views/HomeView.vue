<template>
  <main class="main">

    <section class="section">
      <ul class="section__list">
        <ListCheckbox v-for="list in lists" :key="`list-checkbox-${list.id}`" :list="list"/>
      </ul>
    </section>

    <section class="section">
      <ul class="section__list">
        <ListBlock v-for="list in lists" :key="`list-block-${list.id}`" :list="list"/>
      </ul>
    </section>

  </main>
</template>

<script>
import ListCheckbox from "@/components/ListCheckbox";
import ListBlock from "@/components/ListBlock";

export default {
  name: 'HomeView',
  components: {
    ListCheckbox,
    ListBlock,
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

<style>
.main {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  flex-grow: 1;
  box-sizing: border-box;
}

.section {
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-black);
  border-radius: 10px;
  transition: height .3s;
}

.section__list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (max-width: 1500px) {
  .main {
    padding: 0 30px;
  }
}

@media (max-width: 850px) {
  .main {
    padding: 0 15px;
    grid-gap: 15px;
  }
}
</style>
