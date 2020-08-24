module.exports={
    lintOnSave:false,//关闭eslint检查
    devServer:{
        port:9527,
        proxy:{
            //http://api.bilibili.com/x/web-interface/nav
            "/x": {
                target:"http://api.bilibili.com",
                changeOrigin:true,
            pathRewrite: {
                "^/login":""
            }
            },
            "/login": {
                target:"http://passport.bilibili.com",
                changeOrigin:true,
                pathRewrite: {
                    "^/login":""
                }
            },
        }
    }
}