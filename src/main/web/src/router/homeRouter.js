export const home_router = [
  {
    path: '/',
    title: 'home',
    component: resolve => {
      require(['../views/home/home.vue'], resolve);
    },
    children: [
      {
        path: '',
        name: 'home-page',
        title: '网站首页',
        component: resolve => {
          require(['../views/index/index.vue'], resolve);
        }
      },
      {
        path: 'about',
        name: 'about-us',
        title: '关于我们',
        component: resolve => {
          require(['../views/about/about.vue'], resolve);
        }
      },
      {
        path: 'knowledge',
        name: 'maintenance-knowledge',
        title: '维修常识',
        component: resolve => {
          require(['../views/knowledge/knowledge.vue'], resolve);
        }
      },
      {
        path: 'service-center',
        name: 'service-center',
        title: '服务中心',
        component: resolve => {
          require(['../views/service-center/service-center.vue'], resolve);
        }
      },
      {
        path: 'presentation',
        name: 'case-presentation',
        title: '案例展示',
        component: resolve => {
          require(['../views/presentation/presentation.vue'], resolve);
        }
      },
      {
        path: 'contact-us',
        name: 'contact-us',
        title: '联系我们',
        component: resolve => {
          require(['../views/contact-us/contact-us.vue'], resolve);
        }
      }
    ]
  }
]
