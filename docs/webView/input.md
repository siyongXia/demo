<h1>ios input框挡住键盘</h1>
<h2>背景</h2>
<p class="danger">
  IOS app里面.input固定定位到底部,获取焦点拉起虚拟键盘,挡住输入框,导致看不见键盘输入的内容:如下图:
</p>
<img src="/webView/images/iosInput.png" alt="">
<h2>解决方案</h2>
```
document.getElementById('input').addEventListener("click", function() {
    setTimeout(function(){ 
        document.body.scrollTop = document.body.scrollHeight; 
    },300); 
})
```