<template>
  <div>
    <button @click="handleLogin" class="btn">
      Login with metamask
    </button>
  </div>
</template>

<script setup>
import { Web3ConnectionService } from '@/web3/domain/services/Web3ConnectionService';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const metamaskConnectionService = Web3ConnectionService.createConnectionProvider();

const handleLogin = async () => {
  await metamaskConnectionService.metamaskLogin();

  const userAddress = await metamaskConnectionService.getMetamaskAddress();
  const balance = await metamaskConnectionService.getMetamaskBalance();

  store.dispatch('setUserAddress', userAddress);
  store.dispatch('setUserBalance', balance);

  router.push({ name: 'dashboard' });

}
</script>