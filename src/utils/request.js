import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
// import { getToken } from "@/utils/auth";

// 创建 axios 实例，使用环境变量配置
const service = axios.create({
  // API 基础地址，开发环境使用相对路径以便 MSW 拦截
  baseURL:
    process.env.VUE_APP_MOCK === "true"
      ? "/api"
      : process.env.VUE_APP_BASE_API || "http://localhost:3000/api",
  // 请求超时时间，从环境变量获取，默认为 10 秒
  timeout: parseInt(process.env.VUE_APP_API_TIMEOUT) || 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (store.getters.token) {
      // config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: "error",
        duration: 5 * 1000,
      });
      if (res.code === 401) {
        MessageBox.confirm(
          "登录状态已过期，您可以继续留在该页面，或者重新登录",
          "系统提示",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          },
        ).then(() => {
          store.commit("user/resetToken");
          // router.push("/login");
        });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.log(error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
