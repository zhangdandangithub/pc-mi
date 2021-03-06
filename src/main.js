import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookie from 'vue-cookie'
import VueLazyLoad from 'vue-lazyload' 
import axios from 'axios';
import VueAxios from 'vue-axios'; // 像这样npm install的插件不需要加’./‘这样的具体路径，因为是直接去node-modules里面找的

import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import env from './env' // 自己定义的文件在引入的时候要加’./‘这样的具体路径，否则会报错：This dependency was not found找不到这个依赖
// 接口规范
// {
//    status: **, // 状态码
//    data: **, // 返回值
//    msg: ** // 错误信息
// }

// mock开关 
  // import是在编译阶段就加载了，而require不是，require可以写在语句里面，执行的时候才会加载
// const mock = true;
// if (mock) {
//   require("./mock/api")
// }

// 设置基础值  根据前端的跨域方式做调整
// 当用easy-mock平台来mock数据的时候把baseURL换成easy-mock平台生成的base URL地址: https://www.easy-mock.com/mock/5ed3f26bc20d550e4408add5/mimall
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ed3f26bc20d550e4408add5/mimall';
axios.defaults.baseURL = '/api'; // 代理
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL; // cors/jsonp
axios.defaults.timeout = 8000;
// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data; // 获取接口返回值
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) { // 未登录的时候接口返回的状态码
      window.location.href = '/#/login'; // 跳转的时候之所以用Window方法是因为路由是挂载到Vue实例上去的，只有在页面里面才能拿到this.$route.push,此处的this并不指向Vue
      return Promise.reject(res);
  } else {
    Message.warning(res.msg);
    // alert(res.msg); // 将错误信息弹出来
    return Promise.reject(res);
  }
}, (error) => {
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(res);
});
Vue.use(VueAxios, axios);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie);
Vue.prototype.$message = Message;

// productionTip生产环境的提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
