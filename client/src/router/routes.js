
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'blog', component: () => import('pages/main-layout/Blog.vue')},
      { path: 'blog/:id', component: () => import('pages/main-layout/Article.vue')},
    ]
  },
  {
    path: '/member-area',
    component: () => import('layouts/MemberLayout.vue'),
    children: [
      {path: '', component: () => import('pages/member-area/Index.vue')},
      {path: 'overview', component: () => import('pages/member-area/Index.vue')},
      {path: 'diary', component: () => import('pages/member-area/Diary.vue')},
      {path: 'goals', component: () => import('pages/member-area/Goals.vue')},
      {path: 'mood', component: () => import('pages/member-area/Mood.vue')},
      {path: 'profile', component: () => import('pages/member-area/Profile.vue')},
    ],
    meta: {
      requiresAuth: true,
      allowAdmin: false,
    },
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {path: '', component: () => import('pages/admin/Index.vue')},
    ],
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
    meta: {
      requiresGuest: true
    }
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/unauthorized',
    component: () => import('pages/Error404.vue')
  }

]

export default routes
