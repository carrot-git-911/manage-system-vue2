import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/index.scss";

// 导入MSW启动函数
import { startMocking } from "./mocks/browser";

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 启动MSW Mock服务
startMocking().then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
