<template>
  <v-card class="message-history" id="answers-container">
    <div class="answer-list">
      <v-card
        v-for="(item, index) in chat.answersList"
        :class="
          'chat-bubble elevation-10 px-3 py-2 my-4 ' +
          (item.role === 'user' ? 'user-message' : '')
        "
        variant="tonal"
      >
        <v-card-subtitle class="px-0 text-capitalize">
          <span>{{ item.role }}</span>
        </v-card-subtitle>
        <span>{{ item.content }}</span>
      </v-card>
    </div>
    <v-progress-linear
      class="my-4"
      v-if="chat.isLoadingChat"
      color="#ab47bc"
      indeterminate
    ></v-progress-linear>
  </v-card>
  <v-form @submit.prevent="sendMessage">
    <div class="message-box d-flex mt-1">
      <v-text-field
        class="message-box__text-field"
        v-model="state.message"
        variant="solo-filled"
        flat
        single-line
        hide-details
        label="Message"
      ></v-text-field>
      <v-btn
        type="submit"
        class="message-box__send-btn"
        icon="mdi-send"
      ></v-btn>
    </div>
  </v-form>
</template>

<script>
import { onMounted, onUnmounted, watch, reactive, nextTick } from "vue";
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
      if (state.message.length > 0) {
        await chat.sendMessage(state.message);
      }
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
    max-width: 100%;

    :deep(.v-field) {
      border-radius: 10px;
    }
  }

  &__send-btn {
    margin-inline: 10px;
    background: linear-gradient(45deg, #1f4e75, #ab47bc);
  }
}

.message-history {
  background: oklch(0.2745 0.005 285.823);
  border-radius: 10px;
  overflow: auto;
  padding: 10px;
  height: 81dvh;
  margin-bottom: 12px;
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
