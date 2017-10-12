<h1>querySelectorAll兼容性</h1>
<h2>背景</h2>
<p class="danger">
  随访聊天界面,使用document.querySelectorAll('.previewer-demo-img')获取元素,Android APP,web,微信端OK,但是在IOS App内获取不到元素,导致点击图片JS报错,页面卡死!
</p>
<h2>解决方案</h2>
<p class="tip">
    使用document.getElementsByClassName('previewer-demo-img')获取元素;
</p>