<template>
  <div>

    <el-form  class="demo-form-inline" style="width: 400px;margin: 150px auto">
      <el-form-item label="账户">
        <el-input v-model="username" placeholder="手机号或邮箱" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" placeholder="密码" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="machine">人机验证</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    <div >
      <div id="captcha">

      </div>
    </div>
  </div>

</template>

<script>
  import JSEncrypt from "jsencrypt"
  import querystring from "querystring"
export default {
  name: 'App',
  data(){
    return{
      //由gt和challenge经过人机验证生成validate和seccode
      gt:'',
      challenge:'',
      //key为密钥
      key:'',
      validate:'',
      seccode:'',
      username:'15639719589',
      password:'31415926',
      //密文
      psw:'',
      //用来完成人机校验
      captchaObj:''
    }
  },
  async mounted() {
  //  开始发送请求
    let result=await this.$API.login.getGt()
    result=result.data.result
    this.gt=result.gt
    this.challenge=result.challenge
    this.key=result.key
    /*try {
      const data=await this.$API.login.getinfo()
      console.log(data)
    }catch (e) {
      console.log(e)
    }*/
    $.ajax({
      url: '/x/web-interface/nav',
      method: 'GET',
      headers:{
        Cookie:{
          SESSDATA:"ad299509%2C1613530895%2C00541*81"
        }
      },
      // data: {
        // coin_type: 'metal',
        // master_uid: uid,
        // platform: 'android',
      //   csrf_token: 'a499d8f497180d0cb02d5adc9fc2364f',
      //   csrf: 'a499d8f497180d0cb02d5adc9fc2364f'
      // },
      success: function (result) {
        console.log(result)
      },
      error: function () {
        console.log("请求失败")
      },
      crossDomain: true,
      dataType: 'json',
      xhrFields: {
        withCredentials: true,
      },
    });
  },
  methods:{
    //点击展示二维码
    machine(){
      initGeetest({
        // 以下 4 个配置参数为必须，不能缺少
        gt: this.gt,
        challenge: this.challenge,
        offline: false, // 表示用户后台检测极验服务器是否宕机
        new_captcha: true, // 用于宕机时表示是新验证码的宕机

        product: "popup", // 产品形式，包括：float，popup
        width: "300px",
        https: true

        // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
      }, this.handler);
    },
    async login(){
    //  点击登录
     /* {
        "hash":"07c6501690c1af85",
              "key":"-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjb4V7EidX/ym28t2ybo0U6t0n\n6p4ej8VjqKHg100va6jkNbNTrLQqMCQCAYtXMXXp2Fwkk6WR+12N9zknLjf+C9sx\n/+l48mjUU8RqahiFD1XT/u2e0m2EN029OhCgkHx3Fc/KlFSIbak93EH/XlYis0w+\nXl69GV6klzgxW6d2xQIDAQAB\n-----END PUBLIC KEY-----\n"
      }*/
      var result = this.captchaObj.getValidate();
      const encrypt =new JSEncrypt()
      const {password,username,challenge}=this
      // console.log(result)
      if (!result) {
        return alert('请完成验证');
      }
      const validate=result.geetest_validate
      const seccode=result.geetest_validate
      this.validate = validate;
      this.seccode = seccode;
      const {hash,key}=await this.$API.login.getHash()
      //进行RSA加密
      encrypt.setPublicKey(key)
      const encrypted = encrypt.encrypt(hash+password)
      //密文
      this.psw=encrypted

      const info={
        captchaType:6,
        username,
        password:encrypted,
        keep:true,
        key:this.key,
        challenge,
        validate,
        seccode:seccode,
      }
      // const info=`captchaType=6&username=${username}&password=${encrypted}&keep=true&key=${this.key}&challenge=${challenge}&validate=${validate}&seccode=${seccode}|jordan`
      try {
        const data=await this.$API.login.login(querystring.stringify(info))
        console.log(data)
        console.log(document.cookie)
      }catch (e) {
        this.$message(e.message)
      }
    },
    //用来做人机验证
    handler(captchaObj) {
      // captchaObj.onReady( ()=>{
      captchaObj.appendTo("#captcha")
        // this.$refs.captcha.innerHtml=captchaObj
      // });
      // console.log(captchaObj)
      // this.captchaObj=cloneDeep(captchaObj)
      this.captchaObj=captchaObj
    }
  }
}
</script>

<style>

</style>
