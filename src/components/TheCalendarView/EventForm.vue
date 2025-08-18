<template>
  <div class="gradient mx-auto">
    <v-card class="event_card mx-auto">
      <v-form>
        <v-card-actions class="d-flex justify-end align-center">
          <v-btn @click="$emit('close-form')" flat icon="mdi-close"></v-btn>
        </v-card-actions>
        <div class="d-flex">
          <span class="mx-auto event_card__title"> New Event </span>
        </div>
        <v-text-field
          class="mt-4"
          density="compact"
          variant="outlined"
          label="Event Name"
          v-model="state.eventName"
        >
        </v-text-field>

        <v-card-actions class="d-flex mx-auto"
          ><v-btn class="event_card__button mx-auto" type="submit"
            >Create</v-btn
          ></v-card-actions
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      eventName: "",
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.event_card {
  width: 25vw;
  padding-inline: 25px;
  padding-bottom: 25px;
  border-radius: 20px;

  &__title {
    font-weight: 700;
    font-size: 24px;
  }

  &__button {
    background: linear-gradient(45deg, #42a5f5, #ab47bc);
    border-radius: 10px;
  }
}

.gradient {
  padding: 2px;
  border-radius: 20px;
  background: linear-gradient(45deg, #42a5f5, #ab47bc);
}

.gradient-border > .v-card {
  background: white;
  border-radius: inherit;
}
</style>
