<template>
  <v-card class="message-history" id="answers-container">
    <div class="answer-list">
      <v-list-item v-for="(item, index) in chat.answersList">
        <v-card
          :class="
            'chat-bubble px-3 py-2 ' +
            (item.role === 'user' ? 'user-message' : '')
          "
          variant="tonal"
        >
          <v-card-subtitle class="px-0 text-capitalize">
            <span>{{ item.role }}</span>
          </v-card-subtitle>
          <span>{{ item.content }}</span>
        </v-card>
      </v-list-item>
    </div>
    <v-progress-linear
      class="my-4"
      v-if="chat.isLoadingChat"
      color="#ab47bc"
      indeterminate
    ></v-progress-linear>
  </v-card>
  <div class="message-box d-flex mt-1">
    <v-text-field
      class="message-box__text-field"
      v-model="state.message"
      variant="solo-filled"
      flat
      single-line
      hide-details
      label="Message"
      @keyup.enter="sendMessage"
    ></v-text-field>
    <v-btn
      @click="sendMessage"
      class="message-box__send-btn"
      icon="mdi-send"
    ></v-btn>
  </div>
</template>

<script>
import { onMounted, onUnmounted, watch } from "vue";
import { useChatStore } from "@/stores/chatData";
import { useGoTo } from "vuetify";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const state = reactive({
      message: "",
    });

    const chat = useChatStore();

    const chatRefs = storeToRefs(chat);

    const goTo = useGoTo();

    const scrollToBottom = () => {
      goTo(999999, { container: "#answers-container" });
    };

    const sendMessage = async () => {
      await chat.sendMessage(state.message);
      state.message = "";
    };

    onMounted(async () => {
      await chat.getConversations();
      await chat.startSocket();
      await chat.getConversationHistory();
    });

    onUnmounted(() => {
      chat.closeSocket();
    });

    watch(
      chatRefs.answers,
      () => {
        nextTick(() => {
          scrollToBottom();
        });
      },
      { deep: true }
    );

    return { state, chat, sendMessage, scrollToBottom };
  },
};
</script>

<style lang="scss" scoped>
.message-box {
  background: oklch(0.141 0.005 285.823);
  align-items: center;
  &__text-field {
    border-radius: 20px;
    max-width: 100%;
  }

  &__send-btn {
    margin-inline: 10px;
    background: linear-gradient(45deg, #1f4e75, #ab47bc);
  }
}

.message-history {
  background: oklch(0.141 0.005 285.823);
  overflow: auto;
  padding: 10px;
  height: 82dvh;
  max-height: 82dvh;

  .chat-bubble {
    width: fit-content;
    max-width: 50%;
    background: linear-gradient(45deg, #1f4e75, #ab47bc);
  }

  .user-message {
    margin-left: auto;
  }
}
</style>
