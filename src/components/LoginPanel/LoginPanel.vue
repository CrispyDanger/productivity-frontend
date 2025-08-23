<template>
  <v-dialog persistent v-model="dialogVisible">
    <v-form @submit.prevent="login">
      <v-card class="login-dashboard d-flex mx-auto">
        <v-card-text class="d-flex mx-auto"><span>Login</span></v-card-text>
        <v-text-field
          label="Username"
          v-model="state.userLogin"
          variant="outlined"
        />
        <v-text-field
          label="Password"
          v-model="state.userPassword"
          type="password"
          variant="outlined"
        />
        <v-card-actions class="d-flex mx-auto"
          ><v-btn size="large" type="submit">Login</v-btn></v-card-actions
        >
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { useAuthStore } from "@/stores/accountData";

export default {
  setup() {
    const auth = useAuthStore();
    const state = reactive({
      userLogin: "",
      userPassword: "",
    });

    const dialogVisible = computed({
      get: () => !auth.user,
    });

    const login = async () => {
      await auth.login(state.userLogin, state.userPassword);
      console.log("Logged in", auth.user);
      state.isNotAuth = false;
    };

    return { state, dialogVisible, login };
  },
};
</script>

<style lang="scss" scoped>
.login-dashboard {
  padding: 25px;
  border-radius: 20px;

  .v-text-field {
    max-width: 320px;
    min-width: 320px;
  }

  span {
    font-weight: 700;
    font-size: 24px;
  }

  .v-btn {
    padding: 2px;
    border-radius: 10px;
    background: linear-gradient(45deg, #42a5f5, #ab47bc);
  }
}

:deep(.v-overlay__scrim) {
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6) !important;
  opacity: 100%;
}
</style>
