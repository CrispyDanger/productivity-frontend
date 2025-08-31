<template>
  <div class="conv-box">
    <div class="actions d-flex align-center justify-center">
      <v-btn @click="createNewChat" append-icon="mdi-plus"> new Chat</v-btn>
    </div>
    <div class="conversations">
      <v-card
        v-for="item in chatStore.conversationsList"
        :class="['mb-4', { selected: chatStore.conversationId === item.id }]"
        elevation="5"
        @click="chatStore.changeChat(item)"
      >
        {{ item.messages[1]?.content || item.title }}</v-card
      >
    </div>
  </div>
</template>

<script>
import { useChatStore } from "@/stores/chatData";
import router from "@/router";

export default {
  setup() {
    const chatStore = useChatStore();

    const createNewChat = async () => {
      await router.replace({ path: "/chat" });
      chatStore.currentConversationId = null;
      chatStore.clearMessages();
    };

    return { chatStore, createNewChat };
  },
};
</script>

<style lang="scss" scoped>
.conv-box {
  padding-top: 10px;
  border-radius: 10px;
  background-color: oklch(0.2745 0.005 285.823);
  height: 100%;
}

.conversations {
  padding-inline: 10px;
  max-height: 80vh;
  overflow: auto;

  .v-card {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 10px;
    padding: 15px;
    background: oklch(0.141 0.005 285.823);

    span {
      white-space: none;
    }
  }

  .selected {
    background: linear-gradient(45deg, #1f4e75, #ab47bc);
  }
}

.actions {
  margin-bottom: 15px;
  .v-btn {
    font-weight: bold;
    border-radius: 10px;
    background-color: oklch(0.141 0.005 285.823);
  }
}
</style>
