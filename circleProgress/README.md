# circleProgress
所有的圆形进度组件都不支持开口的方式，自己用canvas实现一个


# 说明
需要注意的是canvas  style的width和height 与 canvas的style和width是两个不同的东西。一个是样式的宽高，一个是画布的大小。
在移动端我们需要2北来绘制图像，否则会模糊。
```html
<canvas style="width: 123px;height: 123px" height="246" width="246" ref="canvas"></canvas>
```

```javascript
circleProgress(this.$refs.canvas, 88, "#fff", "8/28");
```