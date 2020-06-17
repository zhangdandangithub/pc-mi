<template>
  <div class="order-pay">
    <order-header
    title="订单确支付">
      <template
      v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="container">
      <div class="pay-top">
        <div class="top-left">
          <div class="order-stateimg"></div>
          <div class="order-state">
            <h2>订单提交成功！去付款喽~</h2>
            <div>
              请在<p><span>0</span>小时<span>30</span>分</p>内完成支付，超时后将取消订单
            </div>
            <div>收货信息：{{ addressInfo }}</div>
          </div>
        </div>
        <div class="top-right">
          <div>
            应付总额：<b>{{ payment }}</b><span>元</span>
          </div>
          <div class="open-detail">
            <div>订单详情<span class="icon-down" :class="{'icon-up': openDetailFlag == false}" @click="openDetailFlag = !openDetailFlag"></span></div>
            
          </div>
        </div>
      </div>
      <div class="order-detail" v-show="openDetailFlag == false">
        <div class="item">
          <div class="detail-title">订单号：</div>
          <div class="detail-info theme-color">{{orderId}}</div>
        </div>
        <div class="item">
          <div class="detail-title">收货信息：</div>
          <div class="detail-info">{{addressInfo}}</div>
        </div>
        <div class="item good">
          <div class="detail-title">商品名称：</div>
          <div class="detail-info">
            <ul>
              <li v-for="(item,index) in orderDetail" :key="index">
                <img v-lazy="item.productImage"/>{{item.productName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="detail-title">发票信息：</div>
          <div class="detail-info">电子发票 个人</div>
        </div>
      </div>
      <div class="pay-bottom">
        <h2>请选择以下支付方式付款</h2>
        <div>
          <h4>支付平台</h4>
          <div class="pay-way">
            <div class="pay-zhi" :class="{'pay-checked': payWay==1}" @click="payWay=1"></div>
            <div class="pay-wei" :class="{'pay-checked': payWay==2}" @click="payWay=2"></div>
          </div>
        </div>
        <div>
          <button @click="payModalFlag = true">去支付</button>
        </div>
      </div>

    </div>
    <modal
    title="提示"
    :showModal="payModalFlag"
    :btnflag="{btnType: 0, btnTxt: ['确认', '取消']}"
    @cancelBtn="payModalFlag=false"
    @saveBtn="goPay">
      <template v-slot:body>
        您确认支付吗？
      </template>
    </modal>
    <modal
    title="支付确认"
    :showModal="showPayModal"
    :btnflag="{btnType: 0, btnTxt: ['查看订单', '未支付']}"
    @cancelBtn="showPayModal=false"
    @saveBtn="goOrderList">
      <template v-slot:body>
        您确认是否完成支付？
      </template>
    </modal>
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
  </div>
</template>

<script>
import Modal from '../components/modal';
import QRCode from 'qrcode'
import ScanPayCode from './../components/ScanPayCode'
import OrderHeader from '../components/OrderHeader';

  export default {
    name: 'order-pay',
    components: {
      Modal,
      ScanPayCode,
      OrderHeader
    },
    data () {
      return {
        orderId: this.$route.query.orderNo,
        addressInfo: '',
        orderDetail: {},
        payment: 0,
        openDetailFlag: true,
        payWay: 1, // 支付方式：1：支付宝  2：微信
        payModalFlag: false,
        payImg: '',
        showPay: false,
        showPayModal: false,
        T: ''
      }
    },
    mounted () {
      this.getOrderDetail();
    },
    methods: {
      getOrderDetail(){
        this.axios.get(`/orders/${this.orderId}`).then((res)=>{
          let item = res.shippingVo;
          this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
          this.orderDetail = res.orderItemVoList;
          this.payment = res.payment;
        })
      },
      goPay() {
        var that = this;
        that.payModalFlag = false;
        if(that.payWay == 1){
          window.open('/#/order/alipay?orderId='+that.orderId,'_blank');
        }else{
          that.axios.post('/pay', {
            orderId: that.orderId,
            orderName:'Vue高仿小米商城',
            amount:0.01,//单位元
            payType:2 //1支付宝，2微信
          }).then((res)=>{
            QRCode.toDataURL(res.content)
            .then(url => {
              that.showPay = true;
              that.payImg = url;
              that.loopOrderState();
            })
            .catch(() => {
              that.$message.error('微信二维码生成失败，请稍后重试');
            })
          })
        }
      },
      closePayModal () {
        this.showPay = false;
        this.showPayModal = true;
        clearInterval(this.T);
      },
      goOrderList () {
        this.$router.push('/order/list');
      },
      // 当微信支付二维码弹框弹出来之后，就要轮询是否已经完成支付，如果完成了支付那就立刻跳到订单列表页面，如果未支付完成就点击二维码弹框关闭按钮那就清空定时器，关闭弹框
      loopOrderState () {
        this.T = setInterval(() => {
          this.axios.get( `/orders/${this.orderId}`).then((res) => {
            if (res.status == 20) {
              clearInterval(this.T); 
              this.goOrderList();
            }
          })
        }, 1000);
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.order-pay{
  background: #e5e5e5;
  padding-bottom: 20px;
  .container{
    padding-top: 20px;
    .pay-top{
      padding: 40px;
      box-sizing: border-box;
      background: #fff;
      @include flex();
      .top-left{
        @include flex();
        .order-stateimg{
          width: 90px;
          height: 90px;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          border-radius: 50%;
          margin-right: 40px;
        }
        .order-state{
          div, h3{
            @include flex();
            margin-top: 10px;
          }
          div{
            font-size: 14px;
          }
          span{
            color: #FF6600;
          }
        }
      }
      .top-right{
        div{
          font-size: 14px;
          b{
            color: #FF6600;
            font-weight: bold;
            font-size: 24px;
            margin-left: 10px;
          }
          span{
            color: #FF6600;
            margin-left: 5px;
          }
        }
        .open-detail{
          margin-top: 20px;
          .icon-down{
            display:inline-block;
            width:14px;
            height:10px;
            background:url('/imgs/icon-down.png') no-repeat center;
            background-size:contain;
            margin-left:9px;
            transition:all .5s;
            cursor:pointer;
            &.icon-up{
              transform: rotate(180deg);
            }
          }
          
        }
      }
    }
    .order-detail{
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      .item{
        margin-bottom:19px;
        .detail-title{
          float:left;
          width:100px;
        }
        .detail-info{
          display:inline-block;
          img{
            width: 30px;
            vertical-align: middle;
          }
        }
      }
    }
    .pay-bottom{
      background: #fff;
      margin-top: 20px;
      padding: 40px;
      box-sizing: border-box;
      color: #333;
      h2{
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
      }
      div{
        margin-top: 20px;
        h4{
          font-size: 14px;
          padding: 10px 0;
        }
        .pay-way{
          @include flex(flex-start);
          margin-top: 0;
          div{
            margin-right: 10px;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
          }
          .pay-checked{
            border: 1px solid #FF6600;
          }
          .pay-zhi{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wei{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
}
</style>