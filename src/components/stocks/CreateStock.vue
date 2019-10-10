<template>
  <div class="container">
    <div class="d-flex justify-content-center bd-highlight mb-3">
      <div class="card bg-light mb-3" style="max-width: 22rem">
        <div class="card-header" @click="showAndAnimate">Add New Stock</div>
        <transition name="bounce">
          <div v-if="showHideForm" class="card-body">
            <div class="form-group">
              <div class="form-group row">
                <label for="name" class="col-sm-3 col-form-label">Stock</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="New Stock Name"
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
                    placeholder="New Stock Price"
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
                      @click="createRecord"
                      :disabled="buyButtonDisabled"
                    >Add new stock</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
    nextID() {
      return this.$store.getters.nextStockID;
    },
    buyButtonDisabled() {
      return !this.name || this.price <= 0;
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
    },
    showAndAnimate: function() {
      this.showHideForm = !this.showHideForm;
    }
  }
};
</script>

<style scoped>
.form-control {
  margin-left: 3px;
}

.card-header {
  background: #0e83cd;
  color: white;
  font-size: 20px;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  background: white;
}
</style>