import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
// router を使うという宣言
Vue.use(Router);

// routing の設定をする
const router = new Router({
    mode: process.env.CORDOVA_PLATFORM ? "hash" : "hash",
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
            path: "/profile",
            name: "profile",
            component: () =>
                import ("@/components/Profile.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/work",
            name: "work",
            component: () =>
                import ("@/components/Work.vue"),
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
        },
        {
            path: "/gnavi",
            name: "gnavi",
            component: () =>
                import ("@/components/Gnavi.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/paycard",
            name: "paycard",
            component: () =>
                import ( /* webpackChunkName: "Main" */ "@/components/PaycardMain.vue"),
            meta: {
                AuthSms: true
            }
        },
        {
            path: "/contact",
            name: "contact",
            component: () =>
                import ( /* webpackChunkName: "Main" */ "@/components/Contact.vue"),
            meta: {
                AuthSms: true
            }
        },
        {
            path: "/signup",
            name: "signup",
            component: () =>
                import ("@/components/Signup.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/authsms",
            name: "authsms",
            component: () =>
                import ("@/components/AuthSms.vue"),
            meta: {
                AuthSms: false
            }
        },
        {
            path: "/newsjp",
            name: "newsjp",
            component: () =>
                import ("@/components/NewsJP.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/gmap",
            name: "gmap",
            component: () =>
                import ("@/components/Gmap.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "*",
            name: "notfound",
            component: () =>
                import ("@/components/NotFound.vue"),
            meta: {
                isPublic: true
            }
        },
        {
            path: "/covid-19",
            name: "covid-19",
            beforeEnter() {
                window.location = process.env.VUE_APP_COVID19_URL;
            },
            meta: {
                isPublic: true
            }
        },
        {
            path: "/privacy",
            name: "privacy",
            component: () =>
                import ("@/components/Privacy.vue"),
            meta: {
                isPublic: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
    if (
        to.matched.some(record => !record.meta.isPublic) &&
        !store.getters.getAuth
    ) {
        next({
            path: "/login",
            query: {
                redirect: to.fullPath
            }
        });
    } else if (
        to.matched.some(record => record.meta.AuthSms) &&
        !store.getters.getAuthSms
    ) {
        next({
            path: "/authsms",
            query: {
                redirect: to.fullPath
            }
        });
    } else {
        next();
    }
});

export default router;