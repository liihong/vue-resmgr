import Home from '../views/Home.vue'

export default [{
        path: '/',
        name: '主页',
        component: Home,
        children: [{
                path: '/',
                name: '资源管理',
                component: () =>
                    import ('@/views/resConfig/index'),
                children: [{
                    path: '/',
                    name: '数据表',
                    component: () =>
                        import ('@/views/resConfig/resTableList')
                }, {
                    path: '/resConfigList',
                    name: '资源字段列表',
                    hidden: true,
                    component: () =>
                        import ('@/views/resConfig/resConfigList.vue')
                }]
            },
            {
                path: '/resDisplay',
                name: '资源呈现',
                component: () =>
                    import ('@/views/resMgr/index.vue'),
                children: [{
                    path: '/',
                    name: '资源呈现',
                    component: () =>
                        import ('@/views/resMgr/ResList.vue'),
                }]
            },
            {
                path: '/resRelation',
                name: '资源关系',
                component: () =>
                    import ('@/views/resConfig/resConfigList.vue')
            },
            {
                path: '/resConfig',
                name: '系统设置',
                component: () =>
                    import ('@/views/resConfig/resConfigList.vue')
            },
            {
                path: '/resEdit',
                name: '资源修改',
                hidden: true,
                component: () =>
                    import ('@/views/resMgr/ResEdit.vue')
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        hidden: true,
        component: () =>
            import ('@/views/login/login')
    }
]