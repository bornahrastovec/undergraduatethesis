
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/member-area',
    component: () => import('layouts/MemberLayout.vue'),
    children: [
      {path: '/overview', component: () => import('pages/member-area/Index.vue')},
      {path: '/diary', component: () => import('pages/member-area/Diary.vue')},
      {path: '/goals', component: () => import('pages/member-area/Goals.vue')},
      {path: '/mood', component: () => import('pages/member-area/Mood.vue')},
      {path: '/profile', component: () => import('pages/member-area/Profile.vue')},
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
