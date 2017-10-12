<h1>file btn兼容性</h1>

<h2>背景</h2>
<p class="danger">
 Android内嵌H5网页,通过```<input type="file">```获取手机本地图片上传,会报错:如下图:
</p>
<img src="/webView/images/file_btn.png" alt="file_btn">
<h2>解决方案</h2>
原因就是Android webview屏蔽了input file按钮的功能,我们公司Android已经做处理了,但是前端需要配合加上accept属性
```
<img src="/webView/images/file_btn.png" alt="file_btn" accept="images/*">
```