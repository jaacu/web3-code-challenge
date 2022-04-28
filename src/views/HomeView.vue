<template>
  <div class="home">
    <metamask-login v-if="ethereum"></metamask-login>
    <install-metamask v-else />
  </div>
</template>

<script setup>
import MetamaskLogin from '@/components/MetamaskLogin';
import InstallMetamask from '@/components/InstallMetamask.vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue'

const ethereum = window.ethereum;

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

onMounted(() => {
  if (isAuthenticated.value) {
    router.push({ name: 'dashboard' });
  }
})
</script>
