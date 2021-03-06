import Vue from "vue";
import Router from "vue-router";
// import store from "../store/index";

import Layout from "../../layout/index.vue";

Vue.use(Router);

const constantRoutes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home/index"),
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/uploads",
    component: Layout,
    children: [
      {
        path: "/Uploads",
        name: "Uploads",
        component: () => import("../views/Uploads/index"),
        meta: {
          title: "手动发送"
        }
      }
    ]
  },
  {
    path: "/mailconfig",
    component: Layout,
    children: [
      {
        path: "/mailConfig",
        name: "mailConfig",
        component: () => import("../views/mailConfig/index"),
        meta: {
          title: "设置"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index"),
    meta: {
      title: "登陆",
      first: true
    }
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("../views/Register/index"),
  //   meta: {
  //     title: "注册",
  //     first: true
  //   }
  // },
  {
    path: "/404",
    component: () => import("../views/NotFoundPage/index")
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

// router.beforeEach((to, from, next) => {
//   // 监听登陆状态
//   if (to.meta.title) {
//     document.title = `${to.meta.title} - Auto Report`;
//     if (to.name == "Home") document.title = "Auto Report";
//   }

//   // 每次路由变化时候，关闭所有高亮
//   store.commit("changeActive");
//   // 当下一个路由在菜单所列路由之内，开启其高亮
//   if (Object.keys(store.state.active).indexOf(to.name.toLowerCase()) != -1) {
//     store.commit("changeActive", to.name.toLowerCase());
//   }

//   next();
// });

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
