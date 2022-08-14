<template>
  <div class="search">
    <!-- 位置相关 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity }}</div>

      <div class="position" @click="positionClick">
        <span class="position_text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="location" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="show = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time"> {{ mainStore.startDateStr() }} </span>
        </div>
        <div class="stay">共{{ mainStore.diffDays }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time"> {{ mainStore.endDateStr() }} </span>
        </div>
      </div>
    </div>

    <!-- 选择日期范围的组件 -->
    <van-calendar
      v-model:show="show"
      type="range"
      :formatter="formatter"
      @confirm="onConfirm"
      color="#ff9854"
      :round="false"
    />

    <!-- 价格范围 人数范围 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 推荐热门城市 -->
    <div class="section city-suggest">
      <template v-for="(item, index) in citySuggest" :key="index">
        <span
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
          class="suggest-item"
          >{{ item.tagText.text }}</span
        >
      </template>
    </div>

    <!-- s搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="startSearch">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { useCityStore } from "@/stores/modules/city";
import { useHomeStore } from "@/stores/modules/home";
import { computed, ref } from "vue";
import router from "../../../../router";

import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/modules/main";

// 1.获取经纬度
function positionClick() {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    }
  );
}

// 2.点击城市逻辑
function cityClick() {
  router.push("/city");
}

// 3.获取用户选择的城市
const cityStore = useCityStore();
const currentCity = computed(() => {
  return cityStore.currentCity.cityName;
});

// 4.时间逻辑
const mainStore = useMainStore();
const show = ref(false);
const formatter = (day) => {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }

  return day;
};
const onConfirm = (value) => {
  // 1.关闭日历
  show.value = false;
  // 2.重设日期范围
  mainStore.startDate = value[0];
  mainStore.endDate = value[1];
};

// 5.pinia中拿数据_推荐热门城市
const homeStore = useHomeStore();
const { citySuggest } = storeToRefs(homeStore);

// 6.search按钮相关逻辑
const startSearch = () => {
  router.push({
    path: "/search",
    query: {
      cityId: cityStore.currentCity.cityId,
      startDate: mainStore.startDateStr("MM-DD"),
      endDate: mainStore.endDateStr("MM-DD"),
      address: cityStore.currentCity.cityName,
    },
  });
};
</script>

<style lang="less" scoped>
.search {
  --van-calendar-popup-height: 100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
    font-size: 15px;
  }

  .position {
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .position_text {
      font-size: 15px;
      color: rgb(64, 65, 64);
    }

    img {
      width: 18px;
    }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 40px;

  .start {
    flex: 1;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  .stay {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
}
.price-counter {
  font-size: 14px;
  .start {
    border-right: 1px solid #f3f3f3;
  }
}
.keyword {
  font-size: 14px;
}
.city-suggest {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: auto;

  .suggest-item {
    margin-top: 8px;
    padding: 4px 8px;
    border-radius: 14px;
    font-size: 14px;
  }
}
.search-btn {
  margin-top: 18px;
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>