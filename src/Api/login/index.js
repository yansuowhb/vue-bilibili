//定义登录时发送的请求函数
import axios from "@/Api/axios"

//定义公共路径
const passport="/login"
/*
获取验证码参数
http://passport.bilibili.com/web/captcha/combine?plat=6
* */
function getGt() {
    return axios(`${passport}/web/captcha/combine?plat=6`)
}

/*
获取加密公钥及盐值
http://passport.bilibili.com/login?act=getkey
* */
function getHash() {
    return axios(`${passport}/login?act=getkey`)
}



/*
发送登录请求
http://passport.bilibili.com/web/login/v2 POST
captchaType	num	6	必要	必须为6
username	str	用户登录账号	必要	手机号或邮箱地址
password	str	加密后的带盐密码	必要	base64格式
keep	    bool	true	必要	必须为true
key	        str	登录秘钥	必要	从B站API获取
challenge	str	极验challenge	必要	从B站API获取
validate	str	极验结果	必要	从极验获取
seccode
* */
function login(info) {
    return axios.post(`${passport}/web/login/v2`,info,{
        xhrFields: {
            withCredentials: true
        }
    })
}

//http://api.bilibili.com/x/web-interface/nav 获取信息
function getinfo() {
    return axios(`/x/web-interface/nav`)
}

export default {
    getGt,getHash,login,getinfo
}