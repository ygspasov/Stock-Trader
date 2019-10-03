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
        <div class="button-group">
          <button class="btn btn-primary" :disabled="false" @click="editMenuOpen=!editMenuOpen">Edit</button>

          <button class="btn btn-primary" @click="removeStock(stock.id)">Remove</button>
          <button
            class="btn btn-primary float-left"
            @click="purchaseStock"
            :disabled="quantity== 0"
          >Buy</button>
        </div>
        <div v-if="editMenuOpen" class="card-body">
          <div class="form-group">
            <div class="form-group row">
              <label for="name" class="col-sm-3 col-form-label">Stock</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Edit Stock Name"
                  v-model="name"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="name" class="col-sm-3 col-form-label">Price</label>
              <div class="col-sm-9">
                <input
                  type="number"
                  class="form-control"
                  v-model="price"
                  min="0"
                  value="0"
                  step=".01"
                />
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col text-center">
                  <button
                    class="btn btn-primary"
                    @click="editSingleStock"
                    :disabled="stockEditCondition"
                  >Edit stock</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="notEnoughFunds" class="float-left" id="notEnoughFunds">Insuficient funds!</p>
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
      name: "",
      price: 0,
      quantity: 0,
      editMenuOpen: false
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
    },
    stockEditCondition: function() {
      return this.price <= 0 || !this.stock;
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
    },
    editSingleStock: function() {
      let order = {
        id: this.stock.id,
        name: this.name,
        price: this.price
      };
      this.$store.dispatch("editStock", order);
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
.button-group {
  display: flex;
  justify-content: space-between;
}
.form-group {
  margin-bottom: 0;
}
.card-body .card-body {
  padding-bottom: 0;
}
</style>