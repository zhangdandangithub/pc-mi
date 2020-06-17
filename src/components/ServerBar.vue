<template>
  <div class="server-bar">
    <div class="container">
      <ul>
      <li><span class="icon-setting"></span>预约维修服务</li>
      <li><span class="icon-7day"></span>7天无理由退货</li>
      <li><span class="icon-15day"></span>15天免费换货</li>
      <li><span class="icon-post"></span>满150元包邮</li>
    </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'server-bar'
}
</script>

<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .server-bar{
    background: #fff;
    ul{
      display: flex;
      padding: 10px 0;
      text-align: center;
      justify-content: space-between;
      li{
        border-right: 1px solid #E5E5E5;
        color: #666666;
        text-align: center;
        padding-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          display: inline-block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        .icon-setting{
          @include bgImg(20px,20px,'/imgs/icon-setting.png');
        }
        .icon-7day{
          @include bgImg(20px,20px,'/imgs/icon-7day.png');
        }
        .icon-15day{
          @include bgImg(20px,20px,'/imgs/icon-15day.png');
        }
        .icon-post{
          @include bgImg(20px,20px,'/imgs/icon-post.png');
        }
      }
    }
  }
</style>
