import stocksData from "../../data/stocks/stocksData";

const state = {
  stocks: []
};

const mutations = {
  insertStocks(state, stocks) {
    state.stocks = stocks;
  },
  //Changes the price of each stock in order to simulate new prices each day
  changeStockPrices(state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  },
  addNewStock(state, order) {
    state.stocks.push(order);
  },
  removeStock(state, id) {
    for (let index = 0; index < state.stocks.length; index++) {
      if (state.stocks[index].id == id) {
        state.stocks.splice(index, 1);
      }
    }
  }
};

const actions = {
  purchaseStocks: ({ commit }, order) => {
    commit("buyStock", order);
  },
  setStocks: ({ commit }) => {
    commit("insertStocks", stocksData);
  },
  changeStockPrices: ({ commit }) => {
    commit("changeStockPrices");
  },
  addNewStock: ({ commit }, order) => {
    commit("addNewStock", order);
  },
  removeStock: ({ commit }, id) => {
    commit("removeStock", id);
  }
};

const getters = {
  stocks: state => {
    return state.stocks;
  },
  nextStockID: state => {
    return state.stocks.length + 1;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
