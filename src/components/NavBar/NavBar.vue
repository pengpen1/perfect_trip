<template>
  <van-nav-bar v-bind="$attrs" @click-left="handleLeftClick">
    <template #left>
      <slot name="left">
        <i class="icon-left-arrow" @click="leftIconClick"></i>
        <span class="left-text">{{ leftText }}</span>
      </slot>
    </template>
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>

    <template #right>
      <slot name="right">
        <div class="rightMenu" @click="clickMenuHandle">
          <i class="icon-right-menu"></i>
        </div>
      </slot>
    </template>
  </van-nav-bar>

  <!-- 菜单 -->
  <Menu
    v-if="showMenu"
    @click-closure="clickClosureHandle"
    @touchmove.prevent.stop
    @mousewheel.prevent
  ></Menu>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Menu from "../Menu/Menu.vue";

const props = defineProps({
  leftText: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["leftClick"]);
const router = useRouter();
const handleLeftClick = () => {
  router.back();
  emit("leftClick");
};

// 点击菜单逻辑
const showMenu = ref(false);
const clickMenuHandle = () => {
  showMenu.value = true;
};
const clickClosureHandle = () => {
  showMenu.value = false;
};
</script>

<style lang="less" scoped>
.icon-left-arrow {
  display: inline-block;
  background: url(@/assets/img/common/icon_nav_back.png) 0 0/ 100% 100%;
  width: 8px;
  height: 15px;
}
.left-text {
  color: var(--primary-color);
  margin-left: 8px;
  font-weight: 700;
  font-size: 15px;
}
.icon-right-menu {
  display: inline-block;
  width: 20px;
  height: 15px;
  background-image: url(../../assets/img/home/icon-right-menu.png);
  background-size: 20px 15px;
}
</style>