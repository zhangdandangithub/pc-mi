<template>
  <div class="index">
    <div class="container">
      <div class="index-swiper">
        <div class="swiperdiv">        
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in slideList" :key="index"><img :src="item.img" alt="" @click="toProduct(item.id)"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="menudiv">
          <div class="menu-left">
            <div v-for="(item, index) in menuBar" :key="index"  @mouseenter="menuEnter(item.id)"  @mouseleave="menuLeave" :class="{'activeMenu': activeMenuId==item.id}">
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="menu-right" v-show="activeMenuRight" @mouseenter="menuRightEnter" @mouseleave="menuRightLeave">
            <div class="menuwrapper">
              <div class="menuchild" v-for="(item, index) in menuList" :key="index">
                <div v-for="(val, ind) in item" :key="ind" @click="toProduct(val.id ? val.id : 30)">
                  <img v-lazy="val.img ? val.img : '/imgs/item-box-1.png' " alt="">
                  <span>{{ val.name ? val.name : '小米CC9' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ads-box">
        <div v-for="(item, index) in adsList" :key="index" @click="toProduct(item.id)">
            <img v-lazy="item.img" alt="">
        </div>
      </div>
      <div class="banner" @click="toProduct(30)">
        <img v-lazy="'/imgs/banner-1.png'" alt="">
      </div>
    </div>
    <div class="phone-list">
      <div class="container">
        <h3>手机</h3>
        <div class="list-main">
          <div class="list-left">
            <div @click="toProduct(35)">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
            </div>
          </div>
          <div class="list-right">
            <div class="right-wrapper" v-for="(item, index) in phoneList" :key="index">
              <div v-for="(val, ind) in item" :key="ind">
                  <span v-bind:class="{'new-pro':ind%2==0}">新品</span>
                  <img v-lazy="val.mainImage" alt="">
                  <h4>{{val.name}}</h4>
                  <p>{{val.subtitle}}</p>
                  <p class="price" @click="addCart(val.id)">{{val.price}}元</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServerBar></ServerBar>
    <Modal @cancelBtn="cancelBtn" @saveBtn="saveBtn" :showModal="showModal" title="添加收货地址" :btnflag="btnflag">
      <!-- 插槽添加内容 -->
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </Modal>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import ServerBar from '../components/ServerBar';
  import Modal from '../components/modal';
  import 'swiper/css/swiper.css';
  export default {
    name: 'index',
    data () {
      return {
        swiperOptions: {
          // loop: true,
          effect : 'cube',
          // autoplay:true,//等同于以下设置
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable :true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
          // on:{
          //   click: function(ev){
          //     console.log(ev);
          //     // this.$route.push('/product/:' + )
          //   }
          // }
        },
        slideList:[
          {
            id:'42',
            img:'/imgs/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/imgs/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/imgs/slider/slide-3.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-4.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-5.jpg'
          }
        ],
        menuBar: [
          {
            name: '手机 电话卡',
            id: '1'
          },
          {
            name: '电视 盒子',
            id: '2'
          },
          {
            name: '笔记本 平板',
            id: '3'
          },
          {
            name: '家电 插线板',
            id: '4'
          },
          {
            name: '出行 穿戴',
            id: '5'
          },
          {
            name: '电源 配件',
            id: '6'
          },
          {
            name: '生活 箱包',
            id: '7'
          }
        ],
        menuList:[
          [
            {
              id:30,
              img:'/imgs/item-box-1.png',
              name:'小米CC9',
            },{
              id:31,
              img:'/imgs/item-box-2.png',
              name:'小米8青春版',
            },{
              id:32,
              img:'/imgs/item-box-3.jpg',
              name:'Redmi K20 Pro',
            },{
              id:33,
              img:'/imgs/item-box-4.jpg',
              name:'移动4G专区',
            }
          ],
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
        ],
        adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          }
        ],
        activeMenuId: '',
        // activeMenu: false,
        activeMenuRight: false,
        phoneList: [],
        menuOutTime: null,
        showModal: false,
        btnflag: {
          btnType: 0,
          btnTxt: ["确定", "取消"]
        }
      }
    },
    components: {
      ServerBar,
      Swiper,
      SwiperSlide,
      Modal
    },
    mounted () {
      this.init();
    },
    methods: {
      init(){
        this.axios.get('/products',{
          params:{
            categoryId:100012,
            pageSize:14
          }
        }).then((res)=>{
          // 这个后端老师比较懒，只提供了一个接口，前六条数据是顶部导航里的数据，后6-14条数据才是此处的八条数据，所以截取了一下
          res.list = res.list.slice(6,14);
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
        })
      },
      toProduct (id) {
        this.$router.push('/product/' + id);
      },
      menuEnter (id) {
        if (this.menuOutTime) {
          clearTimeout(this.menuOutTime);
        }
        this.activeMenuId = id;
        this.activeMenuRight = true;
      },
      menuLeave () {
        this.menuOutTime = setTimeout(() => {
          this.activeMenuId = '';
          this.activeMenuRight = false;
        }, 500);
      },
      menuRightEnter () {
        clearTimeout(this.menuOutTime);
      },
      menuRightLeave () {
        this.activeMenuId = '';
        this.activeMenuRight = false;
      },
      addCart (id) {
        console.log(id);
        // if (window.sessionStorage.getItem("userName")) {
        //     this.showModal = true;
        // } else {
        //   this.$router.push({
        //     name: 'login'
        //   })
        // }
        // this.showModal = true;
        // return;
        this.axios.post('/carts',{
          productId:id,
          selected: true
        }).then((res)=>{
          this.showModal = true;
          this.$store.dispatch('ActionsCartCount',res.cartTotalQuantity);
        });
      },
      cancelBtn () {
        this.showModal = false;
      },
      saveBtn () {
        this.showModal = false;
      }
    }
  }
</script>

<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .index{
    margin-top: 20px;
    .index-swiper{
      position: relative;
      .swiperdiv{
        img{
          width: 100%;
          height: auto;
        }
        .swiper-button-prev{
          left: 274px;
        }
      }
      .menudiv{
        display: flex;
        height: 100%;
        .menu-right{
          position: absolute;
          top: 0;
          padding-left: 264px;
          box-sizing: border-box;
          z-index: 1;
          width: 100%;
          height: 100%;
          background: #fff;
          // display: none;
          .menuwrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            .menuchild{
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              div{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  width: 35px;
                  height: auto;
                }
                span{
                  margin-left: 10px;
                  font-size: 12px;
                  color: #333;
                  
                }
              }
            }
          }
        }
        .menu-left{
          width:264px;
          height:100%;
          padding: 20px 0;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          background: #55585a82;
          div{
            height: 50px;
            line-height: 50px;
            position: relative;
            padding: 0 15px;
            box-sizing: border-box;
            &:hover{
              background: #FF6600;
            }
            &:after{
              position: absolute;
              right: 0;
              top: 18px;
              content: '';
              @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              margin-right: 10px;
            }
            span{
              color: #fff;
              font-size: 14px;
            }
          }
          .activeMenu{
            background: #FF6600;
          }
        }
      }
    }
    .ads-box{
      @include flex();
      cursor: pointer;
      margin-top: 20px;
      div{
        width: 296px;
        height: 167px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner{
      margin-top: 20px;
      padding-bottom: 40px;
      img{
        width: 100%;
        height: auto;
      }
    }
    .phone-list{
      background: #F5F5F5;
      padding: 20px 0;
      h3{
        padding-bottom: 20px;
      }
      .list-main{
        @include flex();
        .list-left{
          width: 224px;
          padding-right: 15px;
          img{
            width: 100%;
            height: 620px;
          }
        }
        .list-right{
          flex: 1;
          height: 620px;
          display: flex;
          flex-direction: column;
          .right-wrapper{
            flex: 1;
            @include flex();
            &:first-child{
              padding-bottom: 20px;
            }
            div{
              width: 236px;
              height: 100%;
              text-align: center;
              background: #fff;
              position: relative;
              padding-top: 25px;
              box-sizing: border-box;
              span{
                display: none;
              }
              .new-pro{
                display: block;
                width: 69px;
                padding: 5px 0;
                color: #fff;
                font-size: 12px;
                position: absolute;
                top: 0;
                left: 85px;
                // margin-left: 50%;
                background: #7ECF68;
              }
              img{
                width: 190px;
                height: 195px;
              }
              p{
                font-size: 12px;
                color: #999;
              }
              .price{
                font-size: 12px;
                color: #F20A0A;
                margin-top: 10px;
                cursor: pointer;
                font-weight:bold;
                &:after{
                  content: '';
                  @include bgImg(20px,20px,'/imgs/icon-cart-hover.png');
                  vertical-align: middle;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>