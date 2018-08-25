<style>
.markdown-section iframe[data-id="0"],
.markdown-section iframe[data-id="1"],
.markdown-section iframe[data-id="2"],
.markdown-section iframe[data-id="3"] {
    height: 200px;
}
</style>

## 1

[](../../_iframe/前端实验室/transform-scale-0.html ':include data-id=0')

<!-- run -->
```html

<style>
div.demo {
	position: relative;
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transition: 1s all ease;
	margin: 0 auto;
	top: 50%;
	margin-top: -50px;
}

div.demo:hover {
	transform: scaleY(2);
}
</style>

<div class="demo"></div>
```

## 2

[](../../_iframe/前端实验室/transform-scale-1.html ':include data-id=1')

<!-- run -->
```html

<style>
div.demo {
	position: relative;
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transform: scale(1, -1);
	margin: 0 auto;
	top: 50%;
	margin-top: -50px;
}
</style>

<div class="demo">
	scale
</div>
```


## 2

[](../../_iframe/前端实验室/transform-scale-2.html ':include data-id=2')

<!-- run -->
```html

<style>
div.demo {
	margin-bottom: 120px;
}
div.demo div {
	position: relative;
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transform-origin: center bottom;
	transform: scale(1, -1);
	margin: 0 auto;
	top: 50%;
	margin-top: -50px;
}
</style>

<div class="demo">
	<div>
		scale
	</div>
</div>
```


## 3

[](../../_iframe/前端实验室/transform-scale-3.html ':include data-id=3')

<!-- run -->
```html
<style>
div.demo {
	position: relative;
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transition: 1s all ease;
	margin: 0 auto;
	top: 50%;
	margin-top: -50px;
}

div.demo:hover {
	transform: scaleY(2);
}
</style>

<div class="demo"></div>
```