#Element UI 中国省市区级联数据
 
基于Element UI和element-china-area-data数据的中国省市区级联数据组件
 
 
 # 使用方法
 请先安装element-china-area-data和Element UI
 ```
    npm install element-china-area-data -S
 ```

使用v-model双向绑定省市区数组
```
<CityCascader v-model="cityList" size="middle"></CityCascader>

```
# 说明
除了使用element-china-area-data数据,也可以根据自己Api来拼装数据