<template>
  <div class="product">
    <ProductParam :title="product.name">
      <template v-slot:buy>
        <button @click="buyFn">立即购买</button>
      </template>
    </ProductParam>
    <div class="banner-one">
        <p class="product-title">{{product.name}}</p>
        <p class="detail">{{product.subtitle}}</p>
        <p class="details">
          <a href="" id="">全球首款双频 GP</a>
          <a href="" id="">骁龙845</a>
          <a href="" id="">AI 变焦双摄</a>
          <a href="" id="">红外人脸识别</a>
        </p>
        <p class="price">
          <span>￥{{product.price}}</span><u>￥29999</u>
        </p>
    </div>
    <div class="container banner-two"></div>
    <div class="banner-three"></div>
    <div class="item-swiper">
      <swiper :options="swiperOption">
          <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <p class="desc">小米8 AI变焦双摄拍摄</p>
    </div>
    <div class="item-video">
      <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
      <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
      <div class="video-bg container" @click="showSlideFn"></div>
    </div>
    <transition name="slide">
      <div class="video-box" v-show="showSlide">
        <div class="container video" v-bind:class="showSlide">
          <span class="icon-close" @click="closeVideo">X</span>
          <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ProductParam from '../components/ProductParam';
  export default {
    name: 'product',
    components: {
      Swiper,
      SwiperSlide,
      ProductParam
    },
    data () {
      return {
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        },
        showSlide: false,
        product: ""
      }
    },
    mounted () {
      this.getProductInfo();
    },
    methods: {
      getProductInfo(){
        let id = this.$route.params.id;
        this.axios.get(`/products/${id}`).then((res)=>{
          this.product = res;
        })
      },
      buyFn () {
        let id = this.$route.params.id;
        this.$router.push(`/detail/${id}`);
      },
      showSlideFn () {
        this.showSlide = true;
      },
      closeVideo () {
        this.showSlide = false;
      }
    }
  }
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.product{
  .banner-one{
    width: 100%;
    height: 718px;
    padding-top: 55px;
    box-sizing: border-box;
    background: url('/imgs/product/product-bg-1.png') no-repeat center;
    background-size: cover;
    @include flex();
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: #333;
    .product-title{
      font-size: 80px;
      font-weight: bold;
      line-height: 80px;
    }
    .detail{
      font-size: 24px;
      letter-spacing: 23px;
      margin-top: 10px;
    }
    .details{
      font-size: 16px;
      margin-top: 15px;
      a{
        border-right: 1px solid #BFAB9D;
        padding-right: 10px;
        margin-right: 10px;
        color: #333;
        &:last-child{
          border: none;
        }
      }
    }
    .price{
      font-size: 38px;
      margin-top: 10px;
      u{
        text-decoration: line-through;
        font-size: 26px;
        margin-left: 10px;
      }
    }
  }
  .banner-two{
    background:url('/imgs/product/product-bg-2.png') no-repeat center;
    height:480px;
    background-size:1226px 397px;
  }
  .banner-three{
    background:url(/imgs/product/product-bg-3.png) no-repeat center;
    height:638px;
    background-size:cover;
  }
  .item-swiper{
    margin:36px auto 52px;
    .desc{
      font-size:18px;
      color:#333333;
      text-align:center;
      margin-top: 50px;
    }
    .swiper-container{
      height: 330px;
    }
    .swiper-pagination{
      bottom: 0px;
      z-index: 99999;
      span{
        display: inline-block;
        width: 27px;
        height: 3px;
        border: none;
        content: ' ';
      }
    }
    img{
      width:100%;
    }
  }
  .item-video{
    width: 100%;
    height: 1044px;
    background: #000;
    color: #fff;
    padding: 82px 0;
    box-sizing: border-box;
    margin-bottom: 30px;
    h2{
      text-align: center;
      font-size: 60px;
    }
    p{
      text-align: center;
      font-size: 24px;
      margin-top: 20px;
    }
    .video-bg{
      background:url('/imgs/product/gallery-1.png') no-repeat center;
      background-size:cover;
      height:540px;
      cursor:pointer;
      margin-top: 40px;
    }
    
  }
  .video-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #00000087;
    @include flex();
    // vue自带的动画效果做动画
    // transition: all .5s;
    // &.slide-enter-active{
    //   top:0;
    // }
    // &.slide-leave-active{
    //   top:-100%;
    // }
    // &.slide-enter{
    //   top:-100%;
    // }
    .video{
      position: relative;
      .icon-close{
        display: inline-block;
        font-size: 30px;
        border-radius: 50%;
        color: #fff;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 999999;
      }
      video{
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>