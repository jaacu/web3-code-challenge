<template>
  <div class="text-center p-3">
    <button @click="handleLogin" class="btn btn-primary">
      Login with metamask
    </button>
  </div>
</template>

<script setup>
import { Web3ConnectionService } from '@/web3/domain/services/Web3ConnectionService';
import { useToast } from "vue-toastification";

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const toast = useToast();

const web3ConnectionService = Web3ConnectionService.createConnectionProvider();

const handleLogin = async () => {
  try {

    
  await web3ConnectionService.metamaskLogin();

  const userAddress = await web3ConnectionService.getMetamaskAddress();
  const balance = await web3ConnectionService.getMetamaskBalance();
  const transactions = await web3ConnectionService.getTransactionsHistory(userAddress);

  store.dispatch('setUserAddress', userAddress);
  store.dispatch('setUserBalance', balance);
  store.dispatch('setUserTransactions', transactions);

  toast.success("Login successful", {
        timeout: 2000
    });
    
  router.push({ name: 'dashboard' });

  } catch (error) {
    toast.error("Error during login, please try again!", {
        timeout: 2000
    });
  }
}
</script>