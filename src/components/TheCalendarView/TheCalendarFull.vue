<template>
  <FullCalendar :options="calendarOptions" />
  <v-dialog v-model="state.isShowEventForm"
    ><EventForm @close-form="toggleIsShowEventForm"
  /></v-dialog>
</template>

<script>
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/vue3";

export default {
  components: { FullCalendar },
  setup() {
    const state = reactive({
      isShowEventForm: false,
    });

    const toggleIsShowEventForm = () => {
      state.isShowEventForm = !state.isShowEventForm;
    };

    const calendarOptions = {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: "timeGridWeek",
      dateClick: toggleIsShowEventForm,
      events: [
        { title: "event 1", date: "2025-08-20" },
        { title: "event 2", date: "2025-08-21" },
      ],
    };

    return { state, calendarOptions, toggleIsShowEventForm };
  },
};
</script>

<style lang="scss" scoped></style>
