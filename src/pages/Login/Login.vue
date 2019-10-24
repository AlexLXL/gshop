<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isMessageLogin}" @click="isMessageLogin=true">短信登录</a>
          <a href="javascript:;" :class="{on: !isMessageLogin}" @click="isMessageLogin=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isMessageLogin}">
            <section class="login_message">
              <!-- 手机号 -->
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|phone'"
              />
              <span
                style="color:red"
                v-show="errors.has('phone')"
                class="help is-danger"
              >{{ errors.first('phone') }}</span>
              <button
                :disabled="!isRightPhone || countdown > 0"
                class="get_verification"
                :class="{match: isRightPhone}"
                @click.prevent="sendCode"
              >{{countdown > 0 ? `已发送${countdown}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <!-- 验证码 -->
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required'"
              />
              <span
                style="color:red"
                v-show="errors.has('code')"
                class="help is-danger"
              >{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isMessageLogin}">
            <section>
              <section class="login_message">
                <!-- 名字 -->
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span
                  style="color:red"
                  v-show="errors.has('name')"
                  class="help is-danger"
                >{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <!-- 密码 -->
                <input
                  :type="isShowPwd?'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required|pwd'"
                />
                <span
                  style="color:red"
                  v-show="errors.has('pwd')"
                  class="help is-danger"
                >{{ errors.first('pwd') }}</span>
                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <!-- 图形验证码 -->
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                />
                <span
                  style="color:red"
                  v-show="errors.has('captcha')"
                  class="help is-danger"
                >{{ errors.first('captcha') }}</span>
                <img class="get_verification" ref="captcha1" src="http://localhost:5000/captcha" alt="captcha" @click="getCaptcha"/>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
import { reqCode, reqSmsLogin, reqAccountLogin } from "../../api";
import {RECEIVE_USER} from '../../store/mutation-types.js'
export default {
  data() {
    return {
      isMessageLogin: true,
      phone: "",
      code: "",
      name: "",
      pwd: "",
      captcha: "",
      countdown: 0,
      isShowPwd: false
    };
  },
  computed: {
    isRightPhone() {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        this.phone
      );
    }
  },
  methods: {
    // 获取验证码
    async sendCode() {
      this.countdown = 5;
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.timer);
        }
      }, 1000);

      // 发送请求获取验证码
      const result = await reqCode(this.phone);
      if (result) {
        alert("请求成功");
      } else {
        this.countdown = 0;
        clearInterval(this.timer);
      }
    },
    
    // 登录
    async login() {
      const { isMessageLogin, phone, code, name, pwd, captcha } = this;
      let arr;
      if (isMessageLogin) {
        arr = ["phone", "code"];
      } else {
        arr = ["name", "pwd", "captcha"];
      }
      const success = await this.$validator.validateAll(arr); // 点击登录时校验是否存在表单错误

      if (success) {
        // 登录 - 判断什么方法
        let result;
        if (isMessageLogin) {
          // 手机号登录
           /* 
            {
              phone: "13420104370"
              __v: 0
              _id: "5d2f0c21908e30427c341820"   
            }
          */
          result = await reqSmsLogin(phone, code);
        } else {
          // 账号登录
          /* {
            name: "lang12"
            _id: "5d2f12dbab639c2f5871095b"
          } */
          result = await reqAccountLogin(name, pwd, captcha);
        }
        if (result) {
          // 更新数据
          this.$store.commit(RECEIVE_USER, result)
          // 跳转会profile
          this.$router.replace("./profile");
        }
      }
    },

    // 切换图片验证
    getCaptcha(){
      this.$refs.captcha1.src="http://localhost:5000/captcha?time=" + Date.now()
    }

  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.match
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>