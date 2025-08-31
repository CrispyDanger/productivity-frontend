<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <div class="d-flex header align-center justify-center py-2">
    <div class="empty" />

    <div class="d-flex header__central-items align-center justify-center">
      <v-btn
        prepend-icon="mdi-chat-processing-outline"
        stacked
        variant="text"
        density="comfortable"
        disabled
        >Social</v-btn
      >
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
        :to="{ name: 'Chat' }"
        variant="text"
        density="comfortable"
        prepend-icon="mdi-robot-outline"
        stacked
        >AI Chat</v-btn
      >
    </div>

    <div class="header__username-panel d-flex justify-end">
      <v-btn variant="text"
        >Hello, {{ auth.userData?.username ?? "unknown" }}
        <v-menu activator="parent">
          <v-list>
            <v-list-item>Test</v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
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
.header {
  position: relative;
  background: oklch(0.161 0.005 285.823);
  padding: 1rem 2rem;
  z-index: 1;

  &__central-items {
    .v-btn {
      margin-inline: 50px;
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

  &__username-panel {
    flex: 1;
  }

  .empty {
    flex: 1;
  }
}
</style>
