<h1>flex兼容性</h1>
<h2>背景</h2>
<p class="danger">
  随访聊天界面,flex属性IOS10以上版本样式OK,以下NG;Android样式OK,
</p>
<h2>解决方案</h2>
原因就是:webpack利用postcss打包,npm run test生成的代码OK,npm run build 成功的代码浏览器内核前缀处理的不完善;导致样式在测试环境中OK,在线上环境不行,具体如下:
npm run test 
```
.flex {
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
}   
```
npm run build 
```
.flex {
    display: -webkit-box;
    display: flex;
}   
```
<p class="warning">
  In some cases the minification is destructive to the css, so you can provide your own options to the cssnano-based minifier if needed
</p>
解决方案:
- 1:为兼容多端平台,flex相关的新属性,慎用
- 2: 修改webpack cssLoader配置,不使用minimize
```
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: false,
      sourceMap: options.sourceMap
    }
  }
```