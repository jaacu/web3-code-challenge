<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">From</th>
        <th scope="col">To</th>
        <th scope="col">Amount</th>
        <th scope="col">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(transaction, index) in parsedTransactions">
        <td>{{ transaction.from }}</td>
        <td>{{ transaction.to }}</td>
        <td>{{ transaction.amount }}</td>
        <td><a :href="transaction.detailsURL" target="_blank"> See details</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {  computed } from 'vue'
import { useStore } from 'vuex';

import { Web3ConnectionService } from '@/web3/domain/services/Web3ConnectionService';

const web3ConnectionService = Web3ConnectionService.createConnectionProvider();

const store = useStore();

const userTransactions = computed(() => store.getters.userTransactions);

const parsedTransactions = computed(() => {
  return userTransactions.value.map((transaction) => {
    transaction.amount = web3ConnectionService.formatEther(transaction.value);
    transaction.detailsURL = 'https://rinkeby.etherscan.io/tx/' + transaction.hash;
    return transaction;
  })
  .sort((aTransaction, bTransaction) => {
    return bTransaction.timestamp - aTransaction.timestamp;
  })
})
</script>
