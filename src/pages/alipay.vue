<template>
  <div class="ali-pay">
    <Loading v-if="loading"></Loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
  import Loading from '../components/Loading';
  export default{
    name:'ali-pay',
    components:{
      Loading
    },
    data(){
      return {
        orderId:this.$route.query.orderId,
        content:'',
        loading:true
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        var that = this;
        that.axios.post('/pay', {
          orderId: that.orderId,
          orderName: 'Vue高仿小米商城',
          amount: 0.01, //  单位元
          payType: 1 // 1 支付宝，2 微信
        }).then((res)=>{
          that.content = res.content;
          setTimeout(()=>{
            document.forms[0].submit();
          },100)
        })
      }
    }
  }
</script>