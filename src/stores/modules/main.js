import { defineStore } from "pinia";
import { formatMonthDate, getDiffDays } from "@/utils/format_date";

// 全局时间逻辑
const startDate = new Date();
const endDate = new Date();
endDate.setDate(new Date().getDate() + 1);

const useMainStore = defineStore("main", {
  state: () => ({
    token: "",
    startDate,
    endDate,
    isLoading: false,
  }),
  getters: {
    //   入住时间字符串格式
    startDateStr() {
      return (formatStr = "MM月DD日") => {
        formatMonthDate(this.startDate, formatStr);
      };
    },
    // 离店时间字符串格式
    endDateStr() {
      return (formatStr = "MM月DD日") => {
        formatMonthDate(this.endDate, formatStr);
      };
    },
    // 共入住几天
    diffDays() {
      return getDiffDays(this.startDate, this.endDate);
    },
  },
});

export { useMainStore };
