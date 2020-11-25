import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/index",
            // 可以直接在component中将组件通过箭头函数返回,省去了在头部import引入
            component: () => import("../components/LogUpload.vue"),
        },
        {
            path: "/logupload",
            name: "log",
            // 可以直接在component中将组件通过箭头函数返回,省去了在头部import引入
            component: () => import("../components/NewLogUpload.vue"),
        },
    ],
});
