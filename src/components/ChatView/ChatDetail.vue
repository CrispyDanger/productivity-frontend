<template>
  <v-btn @click="startSocket">Connect</v-btn
  ><v-btn @click="closeSocket">Disconnect</v-btn>
  <v-text-field v-model="state.message" label="message"></v-text-field>
  <v-btn @click="sendMessage">Send</v-btn>
  <span>{{ state.answers }}</span>
</template>

<script>
import { extractDomain } from "@/utils/domainUtils";

export default {
  setup() {
    const state = reactive({
      socket: null,
      status: "",
      message: "",
      answers: [],
    });

    const startSocket = async () => {
      const url = extractDomain(import.meta.env.VITE_REMOTE_HOST);

      state.socket = new WebSocket(`ws://${url}/ws/chat/123123131`);

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
        state.answers.push(JSON.parse(event.data));
      };
    };

    const closeSocket = async () => {
      state.socket.close();
    };

    const sendMessage = async () => {
      state.socket.send(
        JSON.stringify({ role: "user", content: state.message })
      );
      state.message = "";
    };

    return { state, startSocket, closeSocket, sendMessage };
  },
};
</script>

<style lang="scss"></style>
