# 想到、看到什么 css 效果就记录下来

1. 纸张

  （1）纸张折角阴影效果

  ```
  外阴影：box-shadow: X轴  Y轴  Rpx  color;

  属性说明（顺序依次对应）： 阴影的X轴(可以使用负值)    阴影的Y轴(可以使用负值)    阴影模糊值（大小）    阴影的颜色

  内阴影：box-shadow: X轴  Y轴  Rpx  color  inset;

  默认是外阴影   内阴影：inset 可以设置成内部阴影
  ```
  （2）纸张效果

  （3）纸张翻转效果（绕 x 轴、y 轴、z 轴翻转）
  ```
  transform-style: preserve-3d; // 这个神奇的样式，待了解
  ```
  ```
  3D transfrom 三个方法：

  首先明确一点，对象是 3D 物体。
  其次需要知道，电脑屏幕这个平面分为 x 轴和 y 轴，垂直平面为 z 轴
  
  rotateX(angle)：绕 x 轴旋转

  rotateY(angle)：绕 y 轴旋转

  rotateZ(angle)：绕 z 轴旋转
  ```