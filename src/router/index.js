import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// main page
import PostList from "@/pages/post/PostList";
import PostIndex from "@/pages/post/PostIndex"
import PostItem from "@/pages/post/PostItem"
import PostNew from "@/pages/post/PostNew"
import PostEdit from "@/pages/post/PostEdit"

// admin page
import AdminLogin from "@/pages/admin/AdminLogin"
import AdminIndex from "@/pages/admin/AdminIndex"
import AdminHome from "@/pages/admin/AdminHome"
import AdminList from "@/pages/admin/AdminList"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "post-index",
    component: PostIndex,
    meta: { title: 'Pullog'},
    children: [
      {     
        path: "",
        name: "post-home",
        component: PostList,
      },
      {     
        path: "list",
        name: "post-list",
        component: PostList,
        children: [
          {     
            path: "/tag/:tagName",
            name: "post-list-tag",
          },
          {     
            path: "/search/:search",
            name: "post-list-search",
          },
          {     
            path: "/month/:month",
            name: "post-list-month",
          }
        ]
      },
      {     
        path: "post/:postId",
        name: "post-item",
        component: PostItem,
      },
    ],
  },
  {
    path: "/admin",
    name: "admin-index",
    component: AdminIndex,
    meta: { title: 'Pullog', requiresAuth: true},
    children: [
      {     
        path: "/admin/home",
        name: "admin-home",
        component: AdminHome,
      },
      {
        path: "/admin/newpost",
        name: "admin-post-new",
        component: PostNew,
      },
      {
        path: "/admin/edit/:postId",
        name: "admin-post-edit",
        component: PostEdit,
      },
      {
        path: "/admin/list",
        name: "admin-post-list",
        component: AdminList,
      },
    ],
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLogin,
    meta: { checkLogined: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const DEFAULT_TITLE = 'Pullog';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

 router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    store.dispatch('authModule/loadUser').then(() => {
      if (!store.getters['authModule/isAuthenticated']) {
        next({
          path: '/admin/login',
        })
      } else {
        next();
      }  
    });
  } else if (to.matched.some(record => record.meta.checkLogined)) {
    store.dispatch('authModule/loadUser').then(() => {
      if (store.getters['authModule/isAuthenticated']) {
        next({
          path: '/admin/home',
        })
      } else {
        next();
      }  
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }

});

export default router;
