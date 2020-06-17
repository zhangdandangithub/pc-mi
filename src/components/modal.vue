<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="modal-dialog">
        <div class="modal-header">
          {{ title }}
          <span @click="cancelBtn"></span>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer" v-show="btnflag.btnType==0">
          <button class="save" @click="saveBtn">{{ btnflag.btnTxt[0] }}</button>
          <button class="cancel" @click="cancelBtn">{{ btnflag.btnTxt[1] }}</button>
        </div>
        <div class="modal-footer" v-show="btnflag.btnType==1">
          <button class="save" @click="saveBtn">{{ btnflag.btnTxt[0] }}</button>
        </div>
        <div class="modal-footer" v-show="btnflag.btnType==2">
          <button class="cancel" @click="cancelBtn">{{ btnflag.btnTxt[0] }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      title: String,
      btnflag: Object,
      showModal: Boolean
    },
    data() {
      return {

       };
    },
    methods: {
      cancelBtn () {
        this.$emit("cancelBtn");
      },
      saveBtn () {
        this.$emit("saveBtn");
      }
    }
  }
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.modal{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #00000087;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .5s;
  &.slide-enter-active{
    top:0;
  }
  &.slide-leave-active{
    top:-100%;
  }
  &.slide-enter{
    top:-100%;
  }
  .modal-dialog{
    background: #fff;
    width: 660px;
    height: auto;
    .modal-header{
      background: #F5F5F5;
      font-size: 16px;
      color: #333;
      padding: 22px 26px;
      position: relative;
      span{
        display: inline-block;
        width: 16px;
        height: 14px;
        background: url('/imgs/icon-close.png') no-repeat;
        background-size: contain;
        position: absolute;
        right: 26px;
        top: 22px;
      }
    }
    .modal-body{
      padding: 21px 26px;
    }
    .modal-footer{
      background: #F5F5F5;
      font-size: 16px;
      padding: 21px 26px;
      display: flex;
      justify-content: center;
      button{
        background: #FF6600;
        width: 160px;
        height: 40px;
        text-align: center;
        vertical-align: middle;
        border: none;
        color: #fff;
        font-size: 16px;
        border-radius: 2px;
      }
      .save{
        margin-right: 14px;
      }
      .cancel{
        background: #B0B0B0;
      }
    }
  }
}
</style>