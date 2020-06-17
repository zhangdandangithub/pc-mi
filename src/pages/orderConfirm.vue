<template>
  <div class="order-confirm">
    <order-header
    title="订单确认">
      <template
      v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <div class="container">
      <div class="confirm">
        <div class="address">
          <div class="weight">收货地址</div>
          <div class="address-wrap">
            <div class="num" v-for="(item, index) in list" :key="index" @click="chooseAddress(item)" :class="{'checkedAddress': checkedAddress.id == item.id}">
              <div class="num-top">
                  <h2>{{item.receiverName}}</h2>
                  <div class="phone">{{item.receiverMobile}}</div>
                  <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
              </div>
              <div class="num-config">
                <span @click="editAddress(item)">编辑</span>
                <span @click="deleteAddress(item)">删除</span>
              </div>
            </div>
            <div class="add" @click="addAddress">
              <span class="icon-add">+</span>
              <span>添加地址</span>
            </div>
          </div>
        </div>
        <div class="product-div">
          <div class="weight">商品</div>
          <div class="product-list">
            <div class="product-num" v-for="(item,index) in cartList" :key="index">
              <div class="num-left">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' ' + item.productSubtitle}}</span>
              </div>
              <div class="num-right">
                <span class="product-price">{{item.productPrice}}元x{{item.quantity}}</span>
                <span class="product-total">{{item.productTotalPrice}}元</span>
              </div>
            </div>
          </div>
        </div>
        <div class="product-detail">
          <div><span class="weight">配送方式</span></div>
          <div><span class="weight">发票</span></div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="新增确认"
      :btnflag="{btnType: 0, btnTxt: ['确认', '取消']}"
      :showModal="showEditModal"
      @cancelBtn="showEditModal=false"
      @saveBtn="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress" cols="40"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
    <modal
    title="提示"
    :showModal="showDeleteModal"
    :btnflag="{btnType: 0, btnTxt: ['确认', '取消']}"
    @cancelBtn="showDeleteModal=false"
    @saveBtn="submitAddress">
      <template v-slot:body>
        确认删除此地址吗？
      </template>
    </modal>
  </div>
</template>

<script>
import modal from '../components/modal';
import OrderHeader from '../components/OrderHeader';
  export default {
    name: 'order-confirm',
    components: {
      modal,
      OrderHeader
    },
    data () {
      return {
        list: [],
        cartList: [],
        showEditModal: false,
        showDeleteModal: false,
        checkedItem: {},
        userAction: Number, //用户行为 0：新增 1：编辑 2：删除
        cartTotalPrice:0,//商品总金额
        count:0,//商品结算数量
        checkedAddress: {}
      }
    },
    mounted () {
      this.getAddressList();
      this.getCartList();
    },
    methods: {
      getAddressList () {
        this.axios.get('/shippings').then((res) => {
          this.list = res.list;
          this.checkedAddress = res.list[0];
        })
      },
      getCartList () {
        this.axios.get('/carts').then((res) => {
          let list = res.cartProductVoList;
          this.cartTotalPrice = res.cartTotalPrice;
          this.cartList = list.filter(item=>item.productSelected);
          this.cartList.map((item)=>{
            this.count += item.quantity;
          })
        })
      },
      deleteAddress (item) {
        this.checkedItem = item;
        this.userAction = 2;
        this.showDeleteModal = true;
        // this.submitAddress();
      },
      editAddress (item) {
        this.checkedItem = item;
        this.showEditModal = true;
        this.userAction = 1;
      },
      addAddress () {
        this.userAction = 0;
        this.showEditModal = true;
      },
      submitAddress () {
        let {checkedItem,userAction} = this;
        let method,url,params={};
        if(userAction == 0){
          method = 'post',url = '/shippings';
        }else if(userAction == 1){
          method = 'put',url = `/shippings/${checkedItem.id}`;
        }else {
          method = 'delete',url = `/shippings/${checkedItem.id}`;
        }
        if(userAction == 0 || userAction ==1){
          let { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem;
          let errMsg='';
          if(!receiverName){
            errMsg = '请输入收货人名称';
          }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
            errMsg = '请输入正确格式的手机号';
          }else if(!receiverProvince){
            errMsg = '请选择省份';
          }else if(!receiverCity){
            errMsg = '请选择对应的城市';
          }else if(!receiverAddress || !receiverDistrict){
            errMsg = '请输入收货地址';
          }else if(!/\d{6}/.test(receiverZip)){
            errMsg = '请输入六位邮编';
          }
          if(errMsg){
            this.$message.error(errMsg);
            return;
          }
          params = {
            receiverName,
            receiverMobile,
            receiverProvince,
            receiverCity,
            receiverDistrict,
            receiverAddress,
            receiverZip
          }
        }
        this.axios[method](url,params).then(()=>{
          this.showEditModal = false;
          this.showDeleteModal = false;
          this.getAddressList();
          this.$message.success('操作成功');
        });
      },
      chooseAddress (item) {
        this.checkedAddress = item;
      },
      orderSubmit () {
        let item = this.checkedAddress;
        if(!item){
          this.$message.error('请选择一个收货地址');
          return;
        }
        this.axios.post('/orders',{
          shippingId: item.id
        }).then((res)=>{
          this.$router.push({
            path:'/order/pay',
            query:{
              orderNo:res.orderNo
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.order-confirm{
  background: #E5E5E5;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 100%;
  .weight{
    font-weight: 400;
    font-size: 20px;
    padding-bottom: 10px;
  }
  .confirm{
    padding: 33px 63px;
    background: #fff;
    box-sizing: border-box;
    .address{
      padding-top: 20px;
      padding-bottom: 20px;
      box-sizing: border-box;
      .address-wrap{
        @include flex();
        justify-content: flex-start;
        flex-wrap: wrap;
        .num, .add{
          width: 271px;
          height: 180px;
          box-sizing: border-box;
          border: 1px solid #E5E5E5;
          padding: 10px;
          margin-right: 20px;
          margin-top: 10px;
        }
        .num{
          @include flex();
          flex-direction: column;
          .num-top{
            width: 100%;
            div{
              margin-top: 10px;
            }
          }
          .num-config{
            @include flex();
            width: 100%;
            span{
              display: inline-block;
              padding: 5px 10px;
              border: 1px solid #E5E5E5;
              border-radius: 5px;
            }
          }
        }
        .checkedAddress{
          border: 1px solid #FF6600;
        }
        .add{
          background-size:14px;
          @include flex(center, center);
          flex-direction: column;
          span{
            color: #999;
            font-size: 18px;
          }
          .icon-add{
            border-radius: 50%;
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #E5E5E5;
            font-size: 30px;
            color: #fff;
            font-weight: bold;
            line-height: 25px;
            text-align: center;
          }
        }
      }
    }
    .product-div{
      .product-list{
        border-top: 1px solid #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
        flex-direction: column;
        .product-num{
          @include flex();
          .num-left{
            @include flex(center, center);
          }
          .num-right{
            @include flex(center, center);
            span{
              width: 100px;
              @include flex(flex-end);
              font-weight: bold;
              &:last-child{
                color: #FF6600;
              }
            }
          }
          img{
            width: 100px;
            height: auto;
          }
        }
      }
    }
    .product-detail{
      padding-top: 20px;
      border-top: 1px solid #E5E5E5;
      // div{
      //   color: #333;
      // }
      .btn-group{
        @include flex(flex-end);
        a{
          padding: 10px 20px;
          background: #FF6600;
          color: #fff;
          font-size: 20px;
          border: none;
          margin-right: 10px;
          border-radius: 5%;
        }
      }
    }
  }
  .edit-wrap{
    .item{
      margin-top: 20px;
      input, select{
        padding: 5px 10px;
        border: 1px solid #E5E5E5;
        margin-right: 10px;
      }
      select{
        width: 105px;
      }
      textarea{

      }
    }
  }
}
</style>