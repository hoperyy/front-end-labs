<style>
.markdown-section iframe[data-id="0"],
.markdown-section iframe[data-id="1"],
.markdown-section iframe[data-id="2"] {
    height: 150px;
}
</style>

## 1

[](../../_iframe/前端实验室/transform-translate-0.html ':include data-id=0')

<!-- run -->
```html

<style>
	div.demo {
		width: 100px;
		height: 100px;
		background: #000;
		transition: 1s all ease;
	}

	div.demo:hover {
		transform: translate(200px, 0);
	}
</style>

<div class="demo"></div>
```

## 2

[](../../_iframe/前端实验室/transform-translate-1.html ':include data-id=1')

<!-- run -->
```html
<style>
	div.demo {
		width: 100px;
		height: 100px;
		background: #000;
		transition: 1s all ease;
	}

	div.demo:hover {
		transform: translateX(200px);
	}
</style>

<div class="demo"></div>
```
