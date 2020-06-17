<template>
  <div class="login">
    <div class="container">
      <div class="login-header">
        <img src="/imgs/login-logo.png" alt="">
      </div>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="form">
          <div class="login-form">
            <div class="form-top">
              <p class="user-login" :class="{'active-loginway': loginWay==1}" @click="loginWayFn(1)">账号登录</p>
              <p class="corn-login" :class="{'active-loginway': loginWay==2}" @click="loginWayFn(2)">扫码登录</p>
            </div>
            <div class="form-body" v-show="loginWay==1">
              <div>
                <input type="text" v-model="userName" placeholder="邮箱/手机号码/小米ID">
              </div>
              <div>
                <input type="text" v-model="passWord" placeholder="密码">
              </div>
              <div>
                <button @click="loginFn">登录</button>
              </div>
              <div class="form-mark">
                <p><span class="sign" @click="registerFn">手机短信登录/注册</span></p>
                <span class="now-sign">立即注册</span><span>忘记密码</span>
              </div>
            </div>
            <div class="corn-div" v-show="loginWay==2">
              二维码
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    data () {
      return {
        userName: '',
        passWord: '', 
        loginWay: 1,
      }
    },
    methods: {
      ...mapActions(["ActionsGetUserName"]),
      loginWayFn (val) {
        this.loginWay = val;
      },
      loginFn () {
        // es6 变量结构  
        let {userName, passWord} = this;
        this.axios.post('/user/login',{
          username: userName,
          password: passWord
        }).then((res)=>{
          this.$cookie.set('userId',res.id,{expires:'Session'});
          this.ActionsGetUserName(res.username);
          this.$router.push({
            name: 'index',
            params: {
              from: "login"
            }
          });
          // this.$cookie.set('userId',res.id,{expires:'Session'});
          // this.$store.dispatch('ActionsGetUserName',res.username);
          // this.ActionsGetUserName(res.username);
          // this.$router.push({
          //   name:'index',
          //   params:{
          //     from:'login'
          //   }
          // });
        })
      },
      registerFn () {
        this.axios.post('/user/register',{
          username:'zdd',
          password:'zdd1',
          email:'zdd@163.com'
        }).then(()=>{
          alert("注册成功");
          // this.$message.success('注册成功');
        })
      }
    }
  }
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.login{
  .login-header{
    img{
      width: 205px;
      height: auto;
    }
  }
  .login-body{
    width: 100%;
    height: 576px;
    background:url('/imgs/login-bg.jpg') no-repeat center;
    .form{
      padding-top: 37px;
      display: flex;
      justify-content: flex-end;
      .login-form{
        background: #fff;
        width: 410px;
        height: 510px;
        padding: 40px 31px;
        box-sizing: border-box;
        .form-top{
          @include flex();
          .active-loginway{
            color: #FF6600;
          }
          p{
            text-align: center;
            flex: 1;
            font-size: 20px;
            color: #666;
          }
          .active{
            color: #FF6600;
            font-weight:bold;
          }
          .user-login{
            border-right: 1px solid #D7D7D7;
          }
        }
        .form-body{
          div{
            margin-top: 20px;
            color: #fff;
            font-size: 16px;
            button{
              background: #FF6600;
              width: 100%;
              height: 50px;
              color: #fff;
              border: none;
            }
            input{
              width: 100%;
              height: 50px;
              border: 1px solid #E5E5E5;
              padding: 0 20px;
              box-sizing: border-box;
            }
          }
          .form-mark{
            @include flex();
            color: #999;
            font-size: 14px;
            p{
              flex: 1;
              .sign{
                color: #FF6600;
              }
              
            }
            .now-sign{
              display: inline-block;
              &:after{
                content: '';
                border-right: 1px solid #999;
                margin: 0 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>