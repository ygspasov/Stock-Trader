<template>
  <transition name="bounce">
    <div class="card-body">
      <h5 class="card-title">{{stock.name}}</h5>
      <div class="container">
        <div class="row">
          <span class="card-subtitle mb-2 text-muted col">
            Price:
            <strong>{{stock.price |showFunds}}</strong>
          </span>
          <span class="card-subtitle mb-2 text-muted col">
            Quantity:
            <strong>{{stock.quantity}}</strong>
          </span>
        </div>
      </div>
      <div class="float-left">
        <input type="number" class="form-control" :class="{error:outOfStock}" v-model="quantity" />
      </div>
      <div class="float-right">
        <button
          class="btn btn-primary"
          @click="sellOrder"
          :disabled="buyButtonDisabled || outOfStock"
        >Sell</button>
      </div>
      <p v-if="outOfStock" class="float-right" id="outOfStock">Out of stock!</p>
    </div>
  </transition>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "Stock",
  props: {
    stock: { type: Object, required: true }
  },
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    buyButtonDisabled: function() {
      return this.quantity <= 0 || this.price <= 0;
    },
    outOfStock: function() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions(["sellStock"]),
    sellOrder() {
      const order = {
        stockId: this.stock.id,
        quantity: this.quantity,
        stockPrice: this.stock.price
      };
      this.sellStock(order);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.card-body {
  max-width: 300px;
  padding: 10px;
}
.card-title {
  background: #0e83cd;
  color: white;
  border-radius: 5px;
  padding: 10px;
}
input {
  margin-bottom: 10px;
}
#outOfStock {
  color: red;
  padding: 6px 2px;
}
.error {
  border: 1px solid red;
}
.card-title {
  background: #0e83cd;
  color: white;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
input {
  margin-bottom: 10px;
}
#notEnoughFunds {
  color: red;
  padding: 6px 2px;
}
.error {
  border: 1px solid red;
}
.card-subtitle {
  text-align: center;
}
.no-gutter {
  padding-left: 0;
  padding-right: 0;
}
</style>