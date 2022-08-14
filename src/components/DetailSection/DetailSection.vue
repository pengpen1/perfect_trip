<template>
  <div class="section">
    <p class="leftTitle">{{ leftTitle }}</p>
    <div class="content">
      <slot> </slot>
    </div>
    <p class="tail" v-if="tail">{{ tail }} <van-icon name="arrow" /></p>
  </div>
</template>

<script setup>
const props = defineProps({
  leftTitle: {
    type: String,
    default: "标题",
  },
  tail: {
    type: String,
  },
});
</script>

<style lang="less" scoped>
.section {
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  border-top: 5px solid #f3f3f3;
  .leftTitle {
    align-self: start;
    font-size: 18px;
    font-weight: 700;
    margin: 10px;
  }
  .content {
    margin: 20px;
  }
  .tail {
    align-self: flex-end;
    color: var(--primary-color);
    margin: 0px 10px 5px;
    font-size: 15px;
  }
}
</style>