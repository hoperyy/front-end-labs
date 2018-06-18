<style>
.markdown-section iframe[data-id="0"],
.markdown-section iframe[data-id="1"],
.markdown-section iframe[data-id="2"] {
    height: 450px;
}
</style>

[](../../_iframe/labs/css3选择器-0.html ':include data-id=0')

<!-- run -->
```html
<style>
.demo *:nth-of-type(1){
    background: #ccc;
}
</style>

<div class="demo">
    <div>div1</div>
    <div>div2</div>
    <ul> 						
        <li>1</li>  
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <p>p1</p>				
    <p>p2</p>
    <p>p3</p>
    <ul>
        <li>1</li>	
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
</div>
```