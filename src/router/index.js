/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
    name: "Home",
  },
  {
    path: "/chat/:id?",
    component: () => import("@/pages/Chat.vue"),
    name: "Chat",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.onError((error, to) => {
  if (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed")
  ) {
    if (!to?.fullPath) {
      window.location.reload();
    } else {
      window.location = to.fullPath;
    }
  }
});

export default router;
