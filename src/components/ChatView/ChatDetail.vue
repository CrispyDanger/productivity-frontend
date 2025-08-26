<template>
  <v-card class="message-history">
    <v-list class="d-flex" v-for="(item, index) in state.answers">
      <span class="mx-auto opacity-20" v-if="item.role === 'system'">{{
        item.content
      }}</span>
      <v-card
        v-else
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
    </v-list>
    <v-progress-linear
      class="my-4"
      v-if="state.isLoading"
      color="#ab47bc"
      indeterminate
    ></v-progress-linear>
  </v-card>
  <div class="message-box d-flex my-1">
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
import { onMounted, onUnmounted } from "vue";
import { extractDomain } from "@/utils/domainUtils";
import { useAuthStore } from "@/stores/accountData";

export default {
  setup() {
    const state = reactive({
      socket: null,
      status: "",
      message: "",
      answers: [],
      isLoading: false,
    });

    const auth = useAuthStore();

    const startSocket = async () => {
      const url = extractDomain(import.meta.env.VITE_REMOTE_HOST);
      const userId = auth.user.id;

      state.socket = new WebSocket(`ws://${url}/ws/chat/${userId}/`);

      state.socket.onopen = () => {
        state.status = "Connected";
        console.log("WebSocket connected");
      };

      state.socket.onclose = () => {
        state.status = "Disconnected";
        console.log("WebSocket disconnected");
      };

      state.socket.onerror = (error) => {
        state.status = "Error";
        console.error("WebSocket error:", error);
      };

      state.socket.onmessage = (event) => {
        state.isLoading = false;
        state.answers.push(JSON.parse(event.data));
      };
    };

    onMounted(() => {
      startSocket();
    });

    onUnmounted(() => {
      closeSocket();
    });

    const closeSocket = async () => {
      state.socket.close();
    };

    const sendMessage = async () => {
      state.socket.send(
        JSON.stringify({ role: "user", content: state.message })
      );
      state.answers.push({ role: "user", content: state.message });
      state.message = "";
      state.isLoading = true;
    };

    return { state, startSocket, closeSocket, sendMessage };
  },
};
</script>

<style lang="scss" scoped>
.message-box {
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
