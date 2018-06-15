[issue](https://github.com/hoperyy/blog/issues/41)

# day 12 - linux 命令 : `less`

`less` 类似 `more`。

`less` 不同的是允许用户向前或向后浏览文件，而 `more` 命令只能向前浏览

## 语法

```
less [选项] 文件……
```

## 选项
    
+   `-N`：每行行首显示行号
+   `-s`：将连续多个空行压缩成一行显示
        
## 实例
    
+   显示行号

    `less -N a.log`
