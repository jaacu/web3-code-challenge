<template>
  <div>
    <user-information />
    <transfer-panel />
    <transactions-list />
  </div>
</template>

<script setup>
import UserInformation from './UserInformation';
import TransferPanel from './TransferPanel';
import TransactionsList from './TransactionsList';

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

onMounted(async() => {
  if (!isAuthenticated.value) {
    router.push({ name: 'home' });
    return;
  }

})
</script>
