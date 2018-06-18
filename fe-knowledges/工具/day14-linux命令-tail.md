[issue](https://github.com/hoperyy/blog/issues/41)

#  day 14 - linux 命令 : `tail`

`tail` 命令从指定点开始将文件写到标准输出

## 语法

```
tail [选项] 文件……
```

## 选项
    
+   `-n <行数>`
        
    显示最后 * 行内容
    
+   `-n +<行数>`
        
    从第 * 行开始显示文件
    
+   `-f`

    循环读取文件内容，不断刷新
    
+   `-c <数目>`

    显示的字节数
        
## 实例
    
+   显示最后 10 行

    `tail -n 10 readme.md`
    
+   从第 10 行开始显示

    `tail -n +10 readme.md`
    
+   循环读取文件内容

    `tail -f readme.md`