<template>
    <div class="nav-bar">
      <div class="empty" v-show="isFixed">
      </div>
      <div :class="{'isfixed' : isFixed}">
        <!-- 吸顶效果 -->
        <div class="container">
          <div class="bar-left">
            <!-- <a>小米8  透明探索版</a>
            <a>小米8</a>
            <a>小米8  SE</a> -->
            <a>{{ title }}</a>
          </div>
          <div class="bar-right">
            <a>概述</a>
            <a>参数</a>
            <a>用户评价</a>
            <slot name="buy"></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'nav-bar',
    props: ["title"],
    data() {
      return {
        isFixed: false
       };
    },
    mounted () {
      window.addEventListener('scroll', this.initHeight);
    },
    methods: {
      initHeight () {
        let scrolltop = window.pageYOffset || window.documentElement.scrollTop || window.body.scrollTop;
        this.isFixed = scrolltop > 152 ? true : false;
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.initHeight);
    }
  }
</script>

<style lang='scss' >
@import '../assets/scss/mixin.scss';
.nav-bar{
  // 吸顶效果 
  .empty{
    width: 100%;
    height: 70px;
  }
  .isfixed{
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 5 5 5 red;
    background: #fff;
    z-index: 10;
  }
  .container{
    @include flex();
    color: #666;
    .bar-left{
      padding: 20px 0;
      a{
        display: inline-block;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        font-size: 12px;
        padding: 0 10px;
        &:first-child{
          font-size:18px;
          font-weight:bold;
          color: #333333;
          border: none;
        }
        &:last-child{
          border: none;
        }
      }
    }
    .bar-right{
      @include flex("flex-end");
      padding: 20px 0;
      a{
        display: inline-block;
        padding: 0 10px;
        font-size: 12px;
        &:nth-child(2){
          border-left: 1px solid #999;
          border-right: 1px solid #999;
        }
      }
      button{
        width: 110px;
        height: 30px;
        border: none;
        color: #fff;
        background: #FF7301;
      }
    }
  }
}
</style>