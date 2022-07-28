import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("../views/home/Home.vue"),
    },
    {
      path: "/favor",
      component: () => import("@/views/favor/Favor.vue"),
    },
    {
      path: "/message",
      component: () => import("@/views/message/Message.vue"),
    },
    {
      path: "/order",
      component: () => import("@/views/order/Order.vue"),
    },
  ],
});

export default router;
