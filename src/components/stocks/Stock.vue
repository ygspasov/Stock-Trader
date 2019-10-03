<template>
  <div class="col-sm-6 col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{stock.name}}</h5>
        <div class="container">
          <div class="row">
            <span class="card-subtitle mb-2 text-muted">
              Price:
              <strong>{{stock.price|showFunds}}</strong>
            </span>
          </div>
        </div>
        <div>
          <input
            type="number"
            class="form-control"
            :class="{error: notEnoughFunds}"
            v-model="quantity"
          />
        </div>
        <div>
          <button
            class="btn btn-primary float-left"
            @click="purchaseStock"
            :disabled="buyButtonDisabled ||notEnoughFunds"
          >Buy</button>
        </div>
        <button class="btn btn-primary float-right" @click="removeStock(stock.id)">Remove</button>

        <p v-if="notEnoughFunds" class="float-right" id="notEnoughFunds">Insuficient funds!</p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
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
    ...mapGetters({
      funds: "funds"
    }),
    buyButtonDisabled: function() {
      return this.quantity <= 0 || this.price <= 0;
    },
    notEnoughFunds: function() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    purchaseStock() {
      const order = {
        stockId: this.stock.id,
        stockQuantity: this.quantity,
        stockPrice: this.stock.price,
        stockName: this.stock.name
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    },
    removeStock: function(id) {
      this.$store.dispatch("removeStock", id);
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
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
</style>