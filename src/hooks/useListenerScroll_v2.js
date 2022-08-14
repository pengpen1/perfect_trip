import {
  onActivated,
  onMounted,
  onUnmounted,
  onDeactivated,
  ref,
} from "@vue/runtime-core";
import { throttle } from "underscore";

export function useListenerScroll(elRef) {
  // 1.定义变量
  let el = window;
  const isReachBottom = ref(false);
  const scrollHeight = ref(0);
  const clientHeight = ref(0);
  const scrollTop = ref(0);

  // 2.定义监听窗口滚动的回调函数
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      scrollHeight.value = document.documentElement.scrollHeight;
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
    } else {
      scrollHeight.value = el.scrollHeight;
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
    }
    if (scrollHeight.value - clientHeight.value - scrollTop.value < 1) {
      console.log("滚动到底了嗷");
      isReachBottom.value = true;
    }
  }, 150);

  // 3.在调用此hook的组件的生命周期里监听或取消scroll事件
  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListenerHandler);
  });
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });
  onActivated(() => {
    el.addEventListener("scroll", scrollListenerHandler);
  });
  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  // 4.返回ref变量
  return { isReachBottom, scrollHeight, scrollTop, clientHeight };
}
