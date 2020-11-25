import Vue from "vue";
import Router from "vue-router";
import LogUpload from "./../components/LogUpload.vue";
import NewLogUpload from "./../components/NewLogUpload.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: LogUpload,
        },
        {
            path: "/index",
            component: LogUpload,
        },
        {
            path: "/logupload",
            name: "log",
            component: NewLogUpload,
        },
    ],
});
