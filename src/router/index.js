import Vue from "vue"
import VueRouter from "vue-router"
import routes from "@/router/routes";

Vue.use(VueRouter)
let newpush=VueRouter.prototype.push
let newreqlace=VueRouter.prototype.replace
VueRouter.prototype.push=function (location,onComplete,onAbort) {
    if (onComplete===undefined&&onAbort===undefined){
        return newpush.call(this,location).catch(()=>{})
    }else {
        newpush.call(this,location,onComplete,onAbort)
    }
}

VueRouter.prototype.replace=function (location,onComplete,onAbort) {
    if (onComplete===undefined&&onAbort===undefined){
        return newreqlace.call(this,location).catch(()=>{})
    }else {
        newreqlace.call(this,location,onComplete,onAbort)
    }
}

const Router=new VueRouter({
    mode:"history",
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})

export default Router



