//这里定义各种路由
const index=()=>import("@/pages/index")


export default [
    {
        name:"index",
        path:"/index",
        component: index
    },
    // {
    //     path: "",
    //     redirect:"/index"
    // }
]
