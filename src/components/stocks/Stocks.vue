<template>
  <div class="row">
    <Stock v-for="stock in stocks" :stock="stock" :key="stock.id"></Stock>
    <CreateStock></CreateStock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import CreateStock from "./CreateStock.vue";
export default {
  components: {
    Stock,
    CreateStock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
};
</script>

<style>
</style>