import { defineStore } from "pinia";
import { extractDomain } from "@/utils/domainUtils";
import { useAuthStore } from "./accountData";
import router from "@/router";
import axios from "axios";

export const useChatStore = defineStore("chat", {
  state: () => ({
    socket: null,
    status: "",
    answers: [],
    conversations: [],
    isLoading: false,
    currentConversationId: null,
  }),
  actions: {
    async startSocket() {
      const auth = useAuthStore();
      const url = extractDomain(import.meta.env.VITE_REMOTE_HOST);
      const userId = auth.user.id;

      this.socket = new WebSocket(`ws://${url}/ws/chat/${userId}/`);

      this.socket.onopen = () => {
        this.status = "Connected";
        console.log("WebSocket connected");
      };

      this.socket.onclose = () => {
        this.status = "Disconnected";
        console.log("WebSocket disconnected");
      };

      this.socket.onerror = (error) => {
        this.status = "Error";
        console.error("WebSocket error:", error);
      };

      this.socket.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        this.answers.push(messageData);
        this.isLoading = false;
        const currentRoute = router.currentRoute.value.params.id;

        if (!currentRoute && messageData.role !== "system") {
          router.push({
            name: "Chat",
            params: { id: messageData.conversation_id },
          });
        }
      };
    },

    async getConversations() {
      const auth = useAuthStore();
      if (auth.refresh) {
        await axios.get("/api/chat/conversation-list").then((response) => {
          const responseData = response.data;
          this.conversations = responseData;
        });
      }
    },

    async getConversationHistory() {
      const conversationId = router.currentRoute.value.params?.id;
      if (conversationId) {
        const conversationData = this.conversations.find(
          (item) => item.id == conversationId
        );
        this.answers = conversationData.messages;
        this.currentConversationId = conversationId;
      }
    },

    async closeSocket() {
      await this.socket.close();
      this.clearMessages();
    },

    async sendMessage(message) {
      const conversationId = router.currentRoute.value.params?.id;
      let newMessage = { role: "user", content: message };
      if (conversationId) {
        newMessage.conversation_id = conversationId;
      }
      this.isLoading = true;
      await this.socket.send(JSON.stringify(newMessage));
      this.answers.push({ role: "user", content: message });
    },

    clearMessages() {
      this.answers = [];
    },

    async changeChat(chat) {
      this.isLoading = true;
      await router.replace({
        name: "Chat",
        params: { id: chat.id },
      });
      this.answers = chat.messages;
      this.currentConversationId = chat.id;
      this.isLoading = false;
    },
  },
  getters: {
    answersList: (state) =>
      state.answers.map((obj, index) => ({ index, ...obj })),
    conversationsList: (state) => state.conversations,
    isLoadingChat: (state) => state.isLoading,
    conversationId: (state) => state.currentConversationId,
  },
});
