<template>
  <div class="message">
    <!-- 导航栏 -->
    <NavBar left-text="返回">
      <template #title>
        <span class="title">消息中心</span>
      </template>
      <template #right>
        <div class="rightContent">
          <van-icon name="service" />
          <span>客服</span>
        </div>
      </template>
    </NavBar>
    <!-- 内容 -->
    <div class="content">
      <img src="@/assets/img/message/icon_message.png" alt="" />
      <div class="text">暂无聊天消息</div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar/NavBar.vue";
</script>

<style lang="less" scoped>
.message {
  .title {
    font-size: 15px;
    font-weight: 700;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 88%;
  }
}
.rightContent {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
:deep(.van-nav-bar .van-icon) {
  color: rgb(53, 53, 53);
  font-size: 16px;
}
</style>