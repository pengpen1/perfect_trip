<template>
  <div class="menu" @click="handleClickCross">
    <div class="content" @click="handleClickContent($event)">
      <div class="head">
        <van-icon
          name="cross"
          size="24"
          class="cross"
          @click="handleClickCross"
          color="#909090"
        />
        <div class="item" @click="onClickMenuItem('/home')">
          <van-icon name="wap-home-o" size="17" /><span class="item-title"
            >首页</span
          >
        </div>
      </div>
      <div class="main">
        <template v-for="(item, index) in data" :key="index">
          <div class="item" @click="onClickMenuItem(item.path)">
            <van-icon :name="item.name" size="17" />
            <span class="item-title">{{ item.title }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// 变量
const data = [
  {
    name: "user-o",
    title: "我的",
    path: "/order",
  },
  {
    name: "orders-o",
    title: "订单",
    path: "/order",
  },
  {
    name: "like-o",
    title: "收藏",
    path: "/favor",
  },
  {
    name: "comment-o",
    title: "消息",
    path: "/message",
  },
  {
    name: "down",
    title: "退出登录",
    path: "/home",
  },
];

// 事件
const emit = defineEmits(["clickClosure"]);
const handleClickCross = () => {
  emit("clickClosure");
};
const handleClickContent = (e) => {
  e.stopPropagation();
};
// 点击item切换路由
const router = useRouter();
const onClickMenuItem = (path) => {
  router.push(path);
};
</script>

<style lang="less" scoped>
.menu {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    padding: 20px 20px 20px 38px;
    position: absolute;
    right: 0;
    width: 50%;
    box-sizing: border-box;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      margin-bottom: 30px;
      .item-title {
        margin-left: 32px;
        font-size: 15px;
        font-weight: 540;
      }
    }
    .head,
    .main {
      border-bottom: 1px solid rgb(229, 226, 226);
    }
    .head {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .cross {
        align-self: flex-end;
        margin-bottom: 16px;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 30px;
    }
  }
}
</style>