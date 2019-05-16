# pagination

基于 element ui 二次封装的分页组件

# 使用

```
<Pagination
    :params="searchParams"
    :requestFunc="requestFunc"
    @returnData="returnData"
/>
```
# 说明
- searchParams是你其他的搜索参数（不包括pageSize和page）
- requestFunc是你的请求函数
- returnData是响应数据的函数，一般我们会将返回的数组赋值到表格上
- 改变参数可以调用组件内Refresh()方法刷新数据，如
```
<el-button type="success"  @click="$refs.pagination.Refresh()">查询</el-button>
```