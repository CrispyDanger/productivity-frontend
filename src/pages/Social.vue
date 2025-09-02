<template>
  <span>Social</span>
  <span v-for="(item, index) in socialStore.socialFeed">{{ item }}</span>
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
