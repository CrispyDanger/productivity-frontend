<template>
  <v-app>
    <login-panel />
    <router-view />
  </v-app>
</template>

<script setup>
import { useAuthStore } from "@/stores/accountData";

const auth = useAuthStore();
auth.loadFromStorage();
</script>
