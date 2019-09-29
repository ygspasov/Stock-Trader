import stocksData from "../../data/stocks/stocksData";

const state = {
  stocks: []
};

const mutations = {
  insertStocks(state, stocks) {
    state.stocks = stocks;
  },
  rearrangeStocks(state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  }
};

const actions = {
  purchaseStocks: ({ commit }, order) => {
    commit("buyStock", order);
  },
  setStocks: ({ commit }) => {
    commit("insertStocks", stocksData);
  },
  rearrangeStocks: ({ commit }) => {
    commit("rearrangeStocks");
  }
};

const getters = {
  stocks: state => {
    return state.stocks;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
