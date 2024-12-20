// Composables
import {createRouter, createWebHistory} from "vue-router";
import {useAppStore} from "@/store/app";
import {getCookie} from "@/utils/cookies";

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
      requiresAuth: false,
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "Página inicial",
          requiresAuth: true,
        },
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/forest_management",
        name: "forest_management",
        meta: {
          title: "Manejo Florestal",
          requiresAuth: true,
        },
        component: () => import("../views/ForestManagement.vue"),
      },
      {
        path: "/production",
        name: "production",
        meta: {
          title: "Produção",
          requiresAuth: true,
        },
        component: () => import("../views/Production.vue"),
      },
      {
        path: "/movement",
        name: "movement",
        meta: {
          title: "Movimentação",
          requiresAuth: true,
        },
        component: () => import("../views/Movement.vue"),
      },
      {
        path: "/export_import",
        name: "export_import",
        meta: {
          title: "Exportação/Importação",
          requiresAuth: true,
        },
        component: () => import("../views/ExportImport.vue"),
      },
      {
        path: "/source",
        name: "source",
        meta: {
          title: "Origem dos Dados",
          requiresAuth: true,
        },
        component: () => import("../views/Source.vue"),
      },
      {
        path: "/version",
        name: "version",
        meta: {
          title: "Atualização",
          requiresAuth: true,
        },
        component: () => import("../views/Version.vue"),
      },
      {
        path: "/legal",
        name: "legal",
        meta: {
          title: "Base Legal",
          requiresAuth: true,
        },
        component: () => import("../views/Legal.vue"),
      },
      {
        path: "/lgpd",
        name: "LGPD",
        meta: {
          title: "lgpd",
          requiresAuth: true,
        },
        component: () => import("../views/LGPD.vue"),
      },
      {
        path: "/ped",
        name: "ped",
        meta: {
          title: "Pesquisa & Desenvolvimento",
          requiresAuth: true,
        },
        component: () => import("../views/PeD.vue"),
      },
      {
        path: "/faq",
        name: "faq",
        meta: {
          title: "Perguntas Frequentes",
          requiresAuth: true,
        },
        component: () => import("../views/FAQ.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  const store = useAppStore();
  store.user.fromCookies();

  if (to.path === "/" || (to.path === "/login" && store.user.isAuthenticated)){
    console.log("Redirecting to /home");
    return {
      path: "/home",
    };
  } else if (to.meta.requiresAuth && !store.user.isAuthenticated && to.path !== "/login") {
    return {
      path: "/login",
    };
  }

  document.title = `LAPEXMAD ${to.meta.title ? " - " + to.meta.title: ""}`;
});

export default router;
