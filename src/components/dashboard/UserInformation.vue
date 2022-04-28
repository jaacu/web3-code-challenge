<template>
  <div class="">
    <div class="card m-3">
      <div class="card-header">
        User address
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ userAddress }}</h5>
      </div>
    </div>
    <div class="card m-3">
      <div class="card-header">
        User balance
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ userBalance }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import {  computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const userAddress = computed(() => store.getters.userAddress);
const userBalance = computed(() => store.getters.userBalance);
</script>
