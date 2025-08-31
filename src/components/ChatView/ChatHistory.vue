<template>
  <div class="actions">
    <v-list-item class="d-flex align-center justify-center px-0">
      <v-btn @click="createNewChat" class="gradient">
        new Chat</v-btn
      ></v-list-item
    >
  </div>
  <div class="conversations">
    <v-list-item class="px-0" v-for="item in chatStore.conversationsList">
      <v-card
        :class="[
          'gradient',
          { selected: chatStore.conversationId === item.id },
        ]"
        @click="chatStore.changeChat(item)"
      >
        {{ item.messages[1].content }}</v-card
      ></v-list-item
    >
  </div>
</template>

<script>
import { useChatStore } from "@/stores/chatData";
import router from "@/router";

export default {
  setup() {
    const chatStore = useChatStore();

    const createNewChat = () => {
      router.replace({ path: "/chat" });
      chatStore.clearMessages();
    };

    return { chatStore, createNewChat };
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/mixins";

.conversations {
  max-height: 80vh;
  overflow: auto;

  .v-card {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 15px;
    background-color: oklch(0.141 0.005 285.823);

    span {
      white-space: none;
    }
  }
}

.actions {
  margin-bottom: 15px;
  .v-btn {
    background-color: oklch(0.141 0.005 285.823);
  }
}
.gradient {
  @include mixins.animated-gradient-border(
    3px,
    (#42a5f5, #ab47bc, #42a5f5),
    6s
  );
}

.selected {
  background: linear-gradient(45deg, #42a5f5, #ab47bc);
}
</style>
