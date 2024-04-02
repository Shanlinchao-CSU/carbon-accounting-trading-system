<template>

</template>

<script setup>
import {onMounted} from "vue";
import App from "@/chainUtil/CarbonCredits";

onMounted(async () => {
  let transaction_history = await App.getTransactionHistory()
  console.log(transaction_history)
})
</script>

<style scoped>

</style>