import { useMainStore } from "@/stores/modules/main";
import axios from "axios";
import { BASE_URL, TIME_OUT } from "./config";

// 为所有的网络请求准备loading
const mainStore = useMainStore();

class PQRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    // 每个实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        mainStore.isLoading = true;
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (value) => {
        mainStore.isLoading = false;
        return value;
      },
      (err) => {
        mainStore.isLoading = false;
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

export default new PQRequest(BASE_URL, TIME_OUT);
