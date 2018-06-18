
<style>
.markdown-section iframe[data-id="0"],
.markdown-section iframe[data-id="1"],
.markdown-section iframe[data-id="2"] {
    height: 400px;
}
</style>

[](../../_iframe/fe-labs/transform-多值-0.html ':include data-id=0')

<!-- run -->
```html

<style>
div.demo {
	position: relative;
	height: 300px;
}

div.demo .x-line,
div.demo .y-line {
	position: absolute;
	background: black;
}

div.demo .x-line {
	left: 5px;
	top: 0;
	height: 1px;
	width: 100%;
}

div.demo .y-line {
	left: 0;
	top: 9px;
	height: 100%;
	width: 1px;
}

div.demo div {
	position: absolute;
	top: 0;
	left: 0;
	width: 100px;
	height: 100px;
}
div.demo .red {
	background: red;
	transform: rotate(45deg) translate(100px, 100px);
}

div.demo .green {
	background: green;
	transform: translate(100px, 100px) rotate(45deg);
}
</style>

<div class="demo">
	<span class="x-line"></span>
	<span class="y-line"></span>
	<div class="red"></div>
	<div class="green"></div>
</div>
```
