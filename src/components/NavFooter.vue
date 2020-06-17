<template>
  <div class="nav-footer">
    <div class="footer-logo">
      <p><img src="/imgs/logo-footer.png" alt=""></p>
      <p><a href="">小米商城</a></p>
    </div>
    <div class="footer-link">
      <ul>      
        <li><a href="https://www.imooc.com/u/1343480" target="_blank">河畔一角主页</a></li>
        <li><a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a></li>
        <li><a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a></li>
        <li><a class="bordernone" href="https://coding.imooc.com/class/343.html" target="_blank">微信支付专项课程（H5+小程序+Node+Mongo）</a></li>
      </ul>
      <div class="copyright">
        Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nav-footer"
  }
</script>

<style lang="less" scoped>
  .nav-footer{
    background: #333;
    padding-top: 23px;
    .footer-logo{
      text-align: center;
      p{
        font-size: 10px;
        a{
          color: #999;
          margin-top: 10px;
        }
        img{
          width: 30px;
          height: auto;
        }
      }
    }
    .footer-link{
      ul{
        text-align: center;
        li{
          display: inline-block;
          margin-top: 20px;
          .bordernone{
            border: none;
          }
          a{
            padding:0 10px;
            border-right: 1px solid #999;
            color: #999;
          }
        }
      }
      .copyright{
        padding-top: 10px;
        padding-bottom: 23px;
        color: #999;
        text-align: center;
        .domain{
          color: #FF6600;
        }
      }
    }
  }
</style>