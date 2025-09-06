<template>
  <div class="header-slot d-flex py-2">
    <div class="d-inline-flex header align-center mx-auto">
      <div class="header__central-items">
        <v-btn
          class="btn"
          prepend-icon="mdi-home-outline"
          stacked
          density="comfortable"
          :to="{ name: 'Home' }"
          variant="text"
          >Home</v-btn
        >
        <v-btn
          prepend-icon="mdi-chat-processing-outline"
          stacked
          variant="text"
          density="comfortable"
          :to="{ name: 'Social' }"
          >Social</v-btn
        >
        <v-btn
          :to="{ name: 'Chat' }"
          variant="text"
          density="comfortable"
          prepend-icon="mdi-robot-outline"
          stacked
          >AI Chat</v-btn
        >
        <v-btn
          stacked
          density="comfortable"
          prepend-icon="mdi-account-outline"
          variant="text"
          >{{ auth.userData?.username ? "Account" : "unknown" }}
          <v-menu activator="parent">
            <v-list>
              <v-list-item>Test</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/accountData";

export default {
  setup() {
    const auth = useAuthStore();

    return { auth };
  },
};
</script>

<style scoped lang="scss">
.header-slot {
  z-index: 1004;
  width: 100%;
}

.header {
  max-height: fit-content;
  overflow: hidden;
  background: oklch(0.161 0.005 285.823);
  border-radius: 10px;
  padding: 10px;

  &__central-items {
    .v-btn {
      background: linear-gradient(45deg, #42a5f5, #ab47bc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      :deep(.v-icon) {
        -webkit-text-fill-color: initial;
        background: none;
        color: #42a5f5;
      }
    }
  }
}
</style>
