<template>
  <v-main>
    <AppHeader />
    <router-view />
  </v-main>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: { AppHeader },
};

//
</script>
