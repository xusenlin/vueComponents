#富文本组件
 
 基于vue-quill-editor定制的富文本，让使用者不去关心图片、音频、视频的上传。
 
 
 # 使用方法
 请先安装vue-quill-editor
 ```
    yarn add vue-quill-editor
 ```

使用v-model双向绑定富文本
```
<RichText :height="200" v-model="form.content"/>

```
# 说明
组件需要组件根据自己的上传接口完善，以及上传完成之后插入具体的HTML字符串