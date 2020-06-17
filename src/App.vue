<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: 'app',
  components: {

  },
  data () {
    return {
      res: {}
    }
  },
  mounted () {
    if (this.$cookie.get('userId')) {
      this.getUser();
      this.getCartCount();
    }
    // 本地家在请求静态json文件的形式
    // this.axios.get('/mock/user/login.json').then((res) => {
    //   this.res = res.data;
    // });
    // // 通过easy-mock平台实现数据mock
    // this.axios.get('/user/login').then((res) => {
    //   this.res = res;
    // });
    // 本地集成mockjs实现数据mock
      // this.axios.get('/user/login').then((res) => {
      //   this.res = res;
      // });
  },
  methods: {
    ...mapActions(["ActionsGetUserName", "ActionsCartCount"]),
    getUser () {
      this.axios.get('/user').then((res={}) => {
        this.ActionsGetUserName(res.username)
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res=0) => {
        this.ActionsCartCount(res);
      })
    }
  }
}
</script>

<style lang="scss">
// 全局引用样式
@import './assets/scss/reset.scss';
// @import './assets/scss/modal.scss';
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
