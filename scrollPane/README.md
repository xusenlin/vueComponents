# pagination

当内容超过容器时，可以通过鼠标滚动来左右移动内容

# 使用

```
<ScrollPane class="nav-bar-scroll">
      <router-link :to="v.path" class="nav-bar-tag" v-for="(v,i) in nav"
                   :key="i.path" :class="$route.path == v.path ? ' active':''">
        {{ v.title }}
      </router-link>
</ScrollPane>
```
# 说明
- nav 足够多，以至于内容超出就可以使用鼠标滚动来左右控制了