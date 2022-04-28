import { createStore } from 'vuex'

import {
  SET_USER_ADDRESS,
  SET_USER_BALANCE,
  SET_USER_TRANSACTIONS
} from './mutations';

export default createStore({
  state: {
    userAddress: null,
    userBalance: 0,
    userTransactions: []
  },
  getters: {
    userAddress: (state) => state.userAddress,
    isAuthenticated: (state) => state.userAddress !== null,
    userBalance: (state) => state.userBalance,
    userTransactions: (state) => state.userTransactions
  },
  mutations: {
    [SET_USER_ADDRESS](state, address) {
      state.userAddress = address;
    },
    [SET_USER_BALANCE](state, balance) {
      state.userBalance = balance;
    },
    [SET_USER_TRANSACTIONS](state, transactions) {
      state.userTransactions = transactions;
    }
  },
  actions: {
    setUserAddress({ commit }, address) {
      commit(SET_USER_ADDRESS, address);
    },
    setUserBalance({ commit }, balance) {
      commit(SET_USER_BALANCE, balance);
    },
    setUserTransactions({ commit }, transactions) {
      commit(SET_USER_TRANSACTIONS, transactions);
    },
    addNewTransaction({ state, commit }, newTransaction) {
      const currentTransactions = [...state.userTransactions];
      currentTransactions.push(newTransaction);
      commit(SET_USER_TRANSACTIONS, currentTransactions);
    },
  },
  modules: {
  }
})
