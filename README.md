### 前言
本示例是看了[这篇文章](https://juejin.im/post/5e3664e16fb9a0300300899e)后，复刻自[border-1px](https://github.com/border-1px/2019-nCov)的案例，感觉做的很好，借鉴来练习Vue。仍然还有一些小bug，但是在下不打算改了😂。

### 基本介绍
1. 数据同border-1px来自腾讯新闻
2. 主要使用了Vue、ElementUI、Webpack、Echarts
3. [线上示例](http://120.25.204.190/dist/)
4. [本人博客](https://tonyteachers.gitee.io/)

### 结构
```  
├─dist
│  ├─index.html
│  ├─main.bundle.js
│  └─source
│      └─images
│          ├─element-icons.53587.woff
│          ├─element-icons.73238.ttf
│          └─nCoV.fb8c0.png      
├─src                      # 源码文件夹
│  ├─App.vue                  # 入口组件
|  ├─data.js                  # 数据处理文件
│  ├─element.js               # Element UI按需加载文件
│  ├─index.html               # 入口html模板
│  ├─index.js                 # 入口函数
│  ├─nameMap.js               # 地名映射
│  ├─province.js              # 各省份拼音对应字典
│  ├─route.js                 # 路由文件
│  ├─assets                # 资源文件夹
│  |   └─img
|  │      └─nCoV.png     
|  └─components            # 子组件文件夹
|       ├─echarts.vue         # 地图子组件
|       └─head.vue            # 表格化数据子组件
├─.babelrc                 # babel配置文件
├─package-lock.json
├─package.json
├─README.md
├─webpack.config.js        # webpack配置文件
```