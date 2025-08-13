<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <v-card class="d-flex header align-center justify-center py-2">
    <div class="empty" />

    <div class="d-flex header__central-items align-center justify-center">
      <v-btn
        prepend-icon="mdi-calendar-blank-outline"
        stacked
        :to="{ path: '/calendar/' }"
        variant="text"
        >Calendar</v-btn
      >
      <v-btn
        prepend-icon="mdi-home-outline"
        stacked
        :to="{ path: '/' }"
        variant="text"
        >Home</v-btn
      >
      <v-btn disabled variant="text">Coming Soon</v-btn>
    </div>

    <div class="header__username-panel d-flex justify-end">
      <v-btn variant="text"
        >Hello, *insert usermname*
        <v-menu activator="parent">
          <v-list>
            <v-list-item>Test</v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped lang="scss">
.header {
  &__central-items {
    // margin: 0 auto;

    .v-btn {
      margin-inline: 50px;
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
