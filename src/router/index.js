import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("../views/home/Home.vue"),
      meta: {
        currentIndex: 0,
        // currentIndex配置tabbar索引的
      },
    },
    {
      path: "/favor",
      component: () => import("@/views/favor/Favor.vue"),
      meta: {
        currentIndex: 1,
      },
    },
    {
      path: "/message",
      component: () => import("@/views/message/Message.vue"),
      meta: {
        currentIndex: 3,
      },
    },
    {
      path: "/order",
      component: () => import("@/views/order/Order.vue"),
      meta: {
        currentIndex: 2,
      },
    },
    {
      path: "/city",
      component: () => import("@/views/city/City.vue"),
      meta: {
        hideTabbar: true,
        // hideTabbar配置是否隐藏tabbar的
      },
    },
    {
      path: "/search",
      component: () => import("@/views/searchContent/SearchContent.vue"),
      meta: {
        hideTabbar: true,
      },
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: () => import("@/views/detail/Detail.vue"),
      meta: {
        hideTabbar: true,
      },
    },
  ],
});

export default router;
