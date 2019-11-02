import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
// router を使うという宣言
Vue.use(Router);

// routing の設定をする
const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "home",
            component: () =>
                import ( /* webpackChunkName: "Main" */ "@/components/Home.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/counter",
            name: "counter",
            component: () =>
                import ( /* webpackChunkName: "Main" */ "@/components/Counter.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ("@/components/Login.vue"),
            meta: { isPublic: true }
        },
        {
            path: "/about",
            name: "about",
            component: () =>
                import ("@/components/About.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/link",
            name: "link",
            beforeEnter() {
                window.location = process.env.VUE_APP_VUEGUIDE_URL;
            },
            meta: {
                isPublic: true
            }
        },
        {
            path: "/github",
            name: "github",
            beforeEnter() {
                window.location = process.env.VUE_APP_GITHUB_URL;
            },
            meta: {
                isPublic: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
    if (to.matched.some(record => !record.meta.isPublic) && !(store.getters.getAuth)) {
        next({
            path: "/login",
            query: {
                redirect: to.fullPath
            }
        });
    } else if ((to.path === '/login') && (store.getters.getAuth)) {
        next({
            path: "/about",
            query: {
                redirect: to.fullPath
            }
        });
    } else {
        next();
    }
});

export default router;