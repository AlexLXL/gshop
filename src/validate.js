import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate);

// vee-validate提示语汉化（使用中文、设置提示的名字）
Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: "手机号",  // 这里的东西都是input的name属性的值，组件html里的也是用的name的值，拿表单的值这些操作都是插件自己封装好的
    code: "验证码",
    name: "账号",
    pwd: "密码",
    captcha: "图形验证码"
  }
});

// 验证方法扩展
Validator.extend('phone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) =>{
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      return reg.test(value) 
  }  
});

Validator.extend('pwd', {
  getMessage: (field) => `请输入合法的` + field,
  validate: (value) =>{
      const reg = /^\w{4,12}/;
      return reg.test(value) 
  }  
});

