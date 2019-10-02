<template>
  <div class="container">
    <div class="d-flex justify-content-center bd-highlight mb-3">
      <div class="card bg-light mb-3" style="max-width: 22rem">
        <div class="card-header" @click="showHideForm=!showHideForm">Add New Stock</div>
        <div v-if="showHideForm" class="card-body">
          <div class="form-group">
            <div class="form-group row">
              <label for="name" class="col-sm-3 col-form-label">Stock</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" placeholder="New Stock Name" v-model="name" />
              </div>
            </div>
            <div class="form-group row">
              <label for="name" class="col-sm-3 col-form-label">Price</label>
              <div class="col-sm-9">
                <input
                  type="number"
                  class="form-control"
                  placeholder="New Stock Price"
                  v-model="price"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="createRecord">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "CreateStock",
  data() {
    return {
      id: this.nextID,
      name: "",
      price: { type: Number, value: 0 },
      quantity: { type: Number, value: 0 },
      showHideForm: false
    };
  },
  computed: {
    getID() {
      return this.nextStockID();
    },
    nextID() {
      return this.$store.getters.nextStockID;
    }
  },
  methods: {
    ...mapActions(["addNewStock"]),
    createRecord: function() {
      let id = this.id;
      let name = this.name;
      let price = this.price;
      let quantity = this.quantity;
      let record = {
        id,
        name,
        price,
        quantity
      };
      this.addNewStock(record);
    },
    myStokes: function() {
      return this.$store.state.stocks;
    }
  }
};
</script>

<style>
.card-header {
  text-align: center;
}
.btn-primary {
  background: #007bff;
  float: right;
}
</style>