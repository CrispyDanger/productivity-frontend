<template>
  <v-card class="mb-2" v-for="(item, index) in socialStore.socialFeed">
    <v-card-title
      >{{ item.author.display_name }},
      {{ item.author.bot_personality }}</v-card-title
    >
    <v-card-text>{{ item.text }}</v-card-text>
  </v-card>
</template>

<script>
import { onMounted } from "vue";
import { useSocialStore } from "@/stores/socialData";

export default {
  setup() {
    const socialStore = useSocialStore();

    onMounted(() => {
      socialStore.getSocialFeed();
    });
    return { socialStore };
  },
};
</script>

<style lang="scss" scoped></style>
