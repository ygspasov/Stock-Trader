import stocksData from "../../data/stocks/stocksData.js";

const state = {
  funds: 10000,
  stocks: [],
  originalStocks: stocksData
};

const mutations = {
  buyStock(state, { stockId, stockQuantity, stockPrice, stockName }) {
    const record = state.stocks.find(element => element.id == stockId);
    if (record && stockQuantity * stockPrice <= state.funds) {
      record.quantity = Number(record.quantity);
      stockQuantity = Number(stockQuantity);
      record.quantity += stockQuantity;
      state.funds -= stockPrice * stockQuantity;
    } else if (stockQuantity * stockPrice <= state.funds) {
      state.stocks.push({
        id: stockId,
        quantity: stockQuantity,
        oldPrice: 0,
        price: stockPrice,
        name: stockName
      });
      state.funds -= stockPrice * stockQuantity;
    }
  },
  sellStock(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(element => element.id == stockId);

    if (quantity > record.quantity) return;

    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  },
  setPortfolioStockPrices(state) {
    state.stocks.forEach(stock => {
      stock.oldPrice = stock.price;

      state.originalStocks.forEach(originalStock => {
        if (stock.id == originalStock.id) {
          stock.price = originalStock.price;
        }
      });
    });
  }
};

const actions = {
  sellStock({ commit }, order) {
    commit("sellStock", order);
  },
  buyStock({ commit }, order) {
    commit("buyStock", order);
  },
  setPortfolioStockPrices({ commit }, stocks) {
    commit("setPortfolioStockPrices", stocks);
  }
};

const getters = {
  funds(state) {
    return state.funds;
  },
  stocksPortfolio(state) {
    return state.stocks;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
