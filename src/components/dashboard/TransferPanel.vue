<template>
  <form @submit.prevent="handleFundTransfer" class="">
    <h3 class="title text-center">Transfer funds:</h3>
    <div class="mb-3">
      <label for="address" class="form-label">To address</label>
      <input required v-model="transferAddress" type="text" id="address" class="form-control">
    </div>
    <div class="mb-3">
      <label for="amount" class="form-label">Amount</label>
      <input required v-model="transferAmount" type="number" step="any" min="0" id="amount" class="form-control">
    </div>
    <button type="submit" class="btn text-left btn-primary">Send</button>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";

import { Web3ConnectionService } from '@/web3/domain/services/Web3ConnectionService';

const web3ConnectionService = Web3ConnectionService.createConnectionProvider();

const store = useStore();
const toast = useToast();

const userAddress = computed(() => store.getters.userAddress);

const transactions = ref([]);
const transferAddress = ref('');
const transferAmount = ref(0);

onMounted(async() => {
  transactions.value = await web3ConnectionService.getTransactionsHistory(userAddress.value);
})

const handleFundTransfer = async () => {
  try {
    const newTransaction = await web3ConnectionService.startFundTransfer( transferAddress.value, transferAmount.value);
    store.dispatch('addNewTransaction', newTransaction);

    const newBalance = await web3ConnectionService.getMetamaskBalance();
    store.dispatch('setUserBalance', newBalance);

    toast.success("Transaction successful", {
        timeout: 2000
    });
  }
  catch (error) {
    toast.error("An error ocurred!", {
        timeout: 2000
    });
  }
}

</script>
