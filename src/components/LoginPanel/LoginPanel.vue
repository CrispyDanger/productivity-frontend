<template>
  <v-dialog persistent v-model="state.isNotAuth">
    <v-card class="login-dashboard d-flex mx-auto">
      <v-card-text class="d-flex mx-auto"><span>Login</span></v-card-text>
      <v-text-field variant="outlined" />
      <v-card-actions class="d-flex mx-auto"
        ><v-btn>Login</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      isNotAuth: true,
    });
    return { state };
  },
};
</script>

<style lang="scss" scoped>
.login-dashboard {
  padding: 25px;
}
</style>
