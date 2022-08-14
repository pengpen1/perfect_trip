<template>
  <div class="favor">
    <!-- 顶部tabs -->
    <NavBar left-arrow left-text="返回">
      <template #title>
        <van-tabs v-model:active="active" type="card">
          <template v-for="(item, index) in titles" :key="index" shrink>
            <van-tab :title="item"></van-tab>
          </template>
        </van-tabs>
      </template>
    </NavBar>

    <!-- 我的收藏 -->
    <div class="myFavor" v-show="active === 0">
      <van-tabs
        v-model:active="smallActive"
        line-width="30"
        line-height="4"
        title-active-color="#000"
        title-inactive-color="#969799"
      >
        <van-tab title="房屋" name="house">
          <div class="content">
            <template
              v-for="(item, index) in favorStore.favorList"
              :key="index"
            >
              <SearchListItem :item-data="item"> </SearchListItem>
            </template>
          </div>
        </van-tab>
        <van-tab title="房东" name="landlord">
          <div class="content">
            <div class="no-data">
              <img
                class="icon-no-data"
                src="@/assets/img/favor/empty_favorite.44731802.png"
                alt=""
              />
              <div class="name">暂无收藏</div>
              <div class="desp">
                点击
                <img src="@/assets/img/favor/favor.png" alt="" />
                即可收藏对应的房东
              </div>
              <button class="btn" @click="handleBtnClick">随便去逛逛</button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 浏览历史 -->
    <div class="history" v-show="active === 1">
      <div class="content">
        <template v-for="(item, index) in favorStore.historyList" :key="index">
          <SearchListItem :item-data="item"> </SearchListItem>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import SearchListItem from "@/components/search-list-item/index.vue";
import { useFavorStore } from "@/stores/modules/favor";
import { useRouter } from "vue-router";

// 1.变量
const active = ref(0);
const smallActive = ref("house");
const titles = ["我的收藏", "浏览历史"];

// 2.网络请求
const favorStore = useFavorStore();
favorStore.fetchFavorList();
favorStore.fetchHistoryList();

// 3.事件
const router = useRouter();
const handleBtnClick = () => {
  router.push("/");
};
</script>

<style lang="less" scoped>
.favor {
  // 覆盖tabs样式
  :deep(.van-tab--card) {
    padding: 3px 15px;
    display: flex;
    align-items: center;
  }
  :deep(.van-tabs__nav) {
    border: 1px solid rgb(218, 216, 216);
  }
  :deep(.van-tab__text) {
    font-size: 15px;
    font-weight: 500;
  }

  .content {
    padding: 10px 20px 55px 20px;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-no-data {
      width: 100%;
    }
    .desp {
      margin: 8px 0 20px 0;
      img {
        width: 16px;
      }
    }
    .btn {
      padding: 8px 32px;
      color: aliceblue;
      background: var(--theme-linear-gradient);
      border: none;
      border-radius: 17px;
      display: flex;
      align-items: center;
    }
  }
}
</style>