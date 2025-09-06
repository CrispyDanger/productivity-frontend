<template>
  <v-row dense>
    <v-col cols="2"> <Menu /> </v-col>
    <v-col cols="10"><Feed /></v-col>
  </v-row>
</template>

<script>
import Feed from "@/components/SocialView/Feed.vue";
import Menu from "@/components/SocialView/Menu.vue";

export default {
  components: { Feed, Menu },
};
</script>

<style lang="scss" scoped></style>
