# breadcrumb
面包屑


# 说明
这个面包屑也没有什么封装的，使用了vue-route 的matched来简单实现。但是，由于我们一般的后台二级以后的路由都要展示在主layout上，那怎么实现三级以后的路由不在二级路由的<router-view></router-view>里展示就变得至关重要了，这里有一个小技巧，可以通过一个Empty来实现，如

```
export default {
    path: '/evaluation',
    name: 'Evaluation',
    meta: {
        title: '测评管理',
        keepAlive: false
    },
    component: Layout,
    redirect: '/evaluation/index',
    children: [
        {
            path: 'index',
            name: 'EvaluationIndex',
            meta: {
                title: '测评列表',
                keepAlive: true
            },
            component: resolve => require(['@/views/evaluationManage/index/Index.vue'], resolve),
        },
        {
            path: 'index',
            meta: {
                title: '测评列表',
            },
            component: Empty,
            children: [
                {
                    path: 'evaluation_edit',
                    alias:'/evaluation_edit_3',
                    name: 'EvaluationEdit',
                    meta: {
                        title: '测评编辑',
                        keepAlive: true
                    },
                    component: resolve => require(['@/views/evaluationManage/evaluationEdit/Index.vue'], resolve),
                },
                //其他测评列表的三级路由，或者4级更多。。。
            ]
        },
        {
            path: 'exam_paper',
            name: 'EvaluationExamPaper',
            meta: {
                title: '试卷列表',
                keepAlive: true
            },
            component: resolve => require(['@/views/evaluationManage/examPaper/Index.vue'], resolve),
        },
    ]
}
```


我们的Empty组件就只有

```
<template>
    <router-view></router-view>
</template>
```