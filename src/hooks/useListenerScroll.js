import {
  onActivated,
  onMounted,
  onUnmounted,
  onDeactivated,
  ref,
} from "@vue/runtime-core";
import { throttle } from "underscore";

// hook_V1 用于监听窗口滚动，当滚动到底时，调用传入的回调
// export function useListenerScroll(successCallback) {
//   const scrollListenerHandler = () => {
//     const scrollHeight = document.documentElement.scrollHeight;
//     const clientHeight = document.documentElement.clientHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     if (scrollHeight - clientHeight - scrollTop < 1) {
//       successCallback();
//     }
//   };
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler);
//   });
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler);
//   });
//   onActivated(() => {
//     window.addEventListener("scroll", scrollListenerHandler);
//   });
//   onDeactivated(() => {
//     window.removeEventListener("scroll", scrollListenerHandler);
//   });
// }

export function useListenerScroll() {
  // hook_v2 调用hook返回多个个ref，高扩展性高复用性
  // 1.定义需要返回的ref变量
  const isReachBottom = ref(false);
  const scrollHeight = ref(0);
  const clientHeight = ref(0);
  const scrollTop = ref(0);

  // 2.定义监听窗口滚动的回调函数
  const scrollListenerHandler = throttle(() => {
    scrollHeight.value = document.documentElement.scrollHeight;
    clientHeight.value = document.documentElement.clientHeight;
    scrollTop.value = document.documentElement.scrollTop;
    if (scrollHeight.value - clientHeight.value - scrollTop.value < 1) {
      console.log("滚动到底了嗷");
      isReachBottom.value = true;
    }
  }, 150);

  // 3.在调用此hook的组件的生命周期里监听或取消scroll事件
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  });
  onActivated(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  });
  onDeactivated(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  });

  // 4.返回ref变量
  return { isReachBottom, scrollHeight, scrollTop, clientHeight };
}
