<template>
  <nav>
    <ul>
      <router-link to="/" tag="li" activeClass="active">
        <a>Trader</a>
      </router-link>

      <router-link tag="li" activeClass="active" to="portfolio">
        <a>Portfolio</a>
      </router-link>
      <router-link tag="li" activeClass="active" to="stocks">
        <a>Stocks</a>
      </router-link>

      <li>
        <span>Money: {{funds|showFunds}}</span>
      </li>
      <li>
        <a href @click.prevent="endCurrentDay">Next Day</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions(["rearrangeStocks", "setPortfolioStockPrices"]),
    endCurrentDay() {
      this.rearrangeStocks();
      this.setPortfolioStockPrices();
    },
    dropDown() {
      return (this.showHide = !this.showHide);
    }
  }
};
</script>


<style scoped>
/* MENU STYLES */
nav ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
nav ul li {
  flex: 1;
}
ul {
  list-style-type: none;
  background: #0e83cd;
}

ul li a {
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 10px 30px;
  display: inline-block;
  margin: 10px 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border: 3px solid #fff;
  color: #fff;
  background: #0e83cd;
  border-radius: 5px;
}

ul li a:hover {
  color: #0e83cd;
  background: white;
}

ul li span {
  color: white;
  font-size: 20px;
  font-weight: 700;
}

a:hover {
  text-decoration: none;
}

@media all and (max-width: 500px) {
  nav ul {
    flex-direction: column;
  }
  ul span {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>