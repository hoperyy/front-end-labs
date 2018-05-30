[issue](https://github.com/hoperyy/blog/issues/41)

# day 15 - linux 命令 : `which`

我们经常在 linux 要查找某个文件，但不知道放在哪里了，可以使用下面的一些命令来搜索： 

`which`  查看可执行文件的位置。
`whereis` 查看文件的位置。 
`locate`   配合数据库查看文件位置。
`find`   实际搜寻硬盘查询文件名称。

`which` 命令的作用是，在 `PATH` 变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。也就是说，使用 `which` 命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。

## 语法

```
which 可执行文件
```

`which` 指令会在 `PATH` 变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。
        
## 实例
    
+   获取安装的第三方全局命令位置

    `which node`
    
+   `which cd`: `cd: shell built-in command`

