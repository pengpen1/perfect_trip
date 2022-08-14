<template>
  <div class="intro">
    <DetailSection left-title="价格说明">
      <div class="content">
        {{ introData?.introduction }}
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import { useDetailStore } from "@/stores/modules/detail";
import { computed } from "vue";
import DetailSection from "@/components/DetailSection/DetailSection.vue";

const detailStore = useDetailStore();
const introData = computed(() => {
  return detailStore.detail_mainPart?.introductionModule;
});
</script>

<style lang="less" scoped>
.content {
  font-size: 15px;
  line-height: 1.2;
  margin-top: -5px;
  text-indent: 2em;
}
</style>