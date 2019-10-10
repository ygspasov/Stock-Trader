<template>
  <div class="container no-gutter">
    <div class="row no-gutter">
      <div id="portfolio-items" class="col-sm-12 col-md-8 no-gutter">
        <Stock v-for="stock in stocks" :stock="stock" :key="stock.id"></Stock>
      </div>
      <div class="col-sm-12 col-md-4">
        <h4 class="mb-3 mt-2" id="adviser-title">Trade Adviser</h4>
        <Adviser v-for="stock in stocks" :stock="stock" :key="stock.id"></Adviser>
        <p
          class="mt-2"
        >*Click on "Next day" to use the Trade Adviser. All profits are calculated with yesterday's prices in mind only!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "./Stock.vue";
import Adviser from "./Adviser.vue";
export default {
  computed: {
    ...mapGetters({
      stocks: "stocksPortfolio"
    })
  },
  components: {
    Stock,
    Adviser
  }
};
</script>

<style scoped>
#portfolio-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  min-width: 350px;
}

.no-gutter {
  padding-left: 0;
  padding-right: 0;
}

#adviser-title {
  background: #0e83cd;
  color: white;
  border-radius: 5px;
  padding: 8px 10px;
  text-align: center;
}
</style>