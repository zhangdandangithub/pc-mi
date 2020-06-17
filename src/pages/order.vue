<template>
  <div>
    <!-- <order-header
    :title="title">
      <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </order-header> -->
    <router-view></router-view>
    <server-bar></server-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
// import OrderHeader from '../components/OrderHeader';
import NavFooter from '../components/NavFooter';
import ServerBar from '../components/ServerBar';
  export default {
    name: 'order',
    components: {
      // OrderHeader,
      NavFooter,
      ServerBar
    },
    data () {
      return {
        title: '',
        tip: ''
      }
    },
    mounted () {
      let path = this.$route.path;
      if (path == '/order/confirm') {
        this.title = '订单确认';
        this.tip = '请认真填写收货地址';
      } else if (path == '/order/confirm') {
        this.title = '订单列表';
        this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
      } else if (path == '/order/confirm') {
        this.title = '订单支付';
        this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
      }  
    }
  }
</script>

<style>

</style>