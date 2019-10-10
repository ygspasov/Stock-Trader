<template>
  <div class="container">
    <div class="row">
      <ul class="list-group">
        <transition name="bounce">
          <li v-if="showOrHIdeAdvisor" class="list-group-item list-group-item-primary mb-2">
            The price of
            <strong>{{stock.name}}</strong> has increased by
            <strong>{{priceRise|showFunds}}</strong>
            . If you sell now, you will profit by
            <strong>{{profit|showFunds}}</strong>.
          </li>
        </transition>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "Adviser",
  props: {
    stock: { type: Object, required: true }
  },
  data() {
    return {
      showAdvice: false
    };
  },

  computed: {
    priceRise: function() {
      return this.stock.price - this.stock.oldPrice;
    },
    profit: function() {
      return this.stock.quantity * (this.stock.price - this.stock.oldPrice);
    },
    showOrHIdeAdvisor: function() {
      return this.stock.oldPrice != 0 > 0 && this.priceRise > 0;
    }
  }
};
</script>

<style scoped>
</style>