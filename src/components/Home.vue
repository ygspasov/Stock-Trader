<template>
  <div>
    <h1>Trade or view the stocks in your portfolio</h1>
    <h5>Purchase stocks from the Stocks section</h5>
    <h5>View your portfolo from the Portfolio section</h5>
    <h5>Click on "Next Day" to end the current day, recalculate the new stock prices and use the Trade Adviser</h5>
    <p>The funds available to you: {{funds|showFunds}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["funds"])
  }
};
</script>

<style>
</style>