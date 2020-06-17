<template>
  <div class="order-list">
    <order-header
    title="订单列表">
      <template
      v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="list-wrapper container">
      <no-data v-if="!loading && list.length==0"></no-data>
      <div class="list-num" v-for="(item, index) in list" :key="index">
        <div class="num-top">
          <div>
            <span>{{item.createTime}}</span>
            <span>|</span>
            <span>{{item.receiverName}}</span>
            <span>|</span>
            <span>订单号：{{item.orderNo}}</span>
            <span>|</span>
            <span>{{item.paymentTypeDesc}}</span>
          </div>
          <div>
            应付金额：<b class="price">{{item.payment}}</b>元
          </div>
        </div>
        <div class="num-bottom" v-for="(obj, ind) in item.orderItemVoList" :key="ind">
          <div>
            <div>
              <img v-lazy="obj.productImage" alt="">
            </div>
            <div>
              <p>{{obj.productName}}</p>
              <p>{{obj.totalPrice + 'X' + obj.quantity}}元</p>
            </div>
          </div>
          <div class="good-state fr" v-if="item.status == 20">
            <a href="javascript:;">{{item.statusDesc}}</a>
          </div>
          <div class="good-state fr" v-else>
            <a href="javascript:;" @click="goPay(item.orderNo)">{{item.statusDesc}}</a>
          </div>
          <!-- <div>
            立即付款<span> > </span>
          </div> -->
        </div>
      </div>
      <el-pagination
        v-if="true"
        class="pagination"
        background
        layout="prev, pager, next"
        :pageSize="pageSize"
        :total="total"
        @current-change="handleChange"
        >
      </el-pagination>
      <div class="load-more" v-if="false">
        <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
      </div>
      <div class="scroll-more"
        v-infinite-scroll="scrollMore"
        infinite-scroll-disabled="true"
        infinite-scroll-distance="410"
        v-if="false"
      >
        <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
      </div>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import {Pagination, Button} from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll'
  export default {
    name: 'order-list',
    components: {
      OrderHeader,
      Loading,
      NoData,
      [Pagination.name]: Pagination,
      [Button.name]: Button
    },
    directives: {
      infiniteScroll
    },
    data () {
      return {
        pageNum: 1,
        loading: false,
        list: [],
        showNextPage: true, // 加载按钮是否显示
        busy: false, // 滚动加载是否触发 
        pageSize: 1,
        total: 0
      }
    },
    mounted () {
      this.getOrderList();
    },
    methods: {
      getOrderList () {
        this.loading = true;
        this.busy = true;
        this.axios.get('/orders',{
          params:{
            pageSize: this.pageSize,
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.loading = false;
          this.list = this.list.concat(res.list);
          this.total = res.total;
          this.showNextPage = res.hasNextPage;
          this.busy = false;
        }).catch(()=>{
          this.loading = false;
        })
      },
      goPay(orderNo){
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      // 第一种方法：分页器
      handleChange(pageNum){
        this.pageNum = pageNum;
        this.getOrderList();
      },
      // 第二种方法：加载更多按钮
      loadMore(){
        this.pageNum++;
        this.getOrderList();
      },
      // 第三种方法：滚动加载，通过npm插件实现
      scrollMore(){
        this.busy = true;
        setTimeout(()=>{
          this.pageNum++;
          this.getList();
        },500);
      },
      // 专门给scrollMore使用
      getList(){
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            pageSize:10,
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.list = this.list.concat(res.list);
          this.loading = false;
          if(res.hasNextPage){
            this.busy=false;
          }else{
            this.busy=true;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.order-list{
  background: #F5F5F5;
  box-sizing: border-box;
  .list-wrapper{
    .list-num{
      margin-top: 30px;
      border:1px solid rgba(215,215,215,1);
      .num-top{
        padding: 23px 43px;
        box-sizing: border-box;
        height: 74px;
        background: #FFFAF7;
        @include flex();
        div{
          color: #333;
          font-size: 16px;
          color: #666;
          .price{
            font-size: 26px;
            color: #333;
          }
          span{
            margin-right: 10px;
            margin-left: 10px;
          }
        }
      }
      .num-bottom{
        @include flex();
        background: #fff;
        padding: 23px 43px;
        box-sizing: border-box;
        div{
          @include flex(flex-start);
          div{
            img{
              width: 70px;
              height: 90px;
            }
            p{
              color: #333;
              font-size: 20px;
            }
            &:last-child{
              margin-left: 40px;
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }
            
          }
          // &:last-child{
          //   @include flex();
          //   color: #FF6600;
          //   font-size: 20px;

          //   span{
          //     margin-left: 5px;
          //   }
          // }
        }
        .good-state{
          a{
            color: #FF6600;
            font-size: 20px;
          }
        }
      }
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #FF6600;
    }
    .el-button--primary{
      background-color: #FF6600;
      border-color: #FF6600;
    }
    .load-more,.scroll-more{
      text-align:center;
    }
  }
}
</style>