[issue](https://github.com/hoperyy/blog/issues/41)

## 了解 web 及网络基础

+   HTTP 全称：HyperText Transfer Protocol 超文本传输协议，或者叫 超文本转移协议
    
    web 是建立在 HTTP 协议上通信的。
    
+   HTTP 的诞生史

    最初的设想：借助多文档之间相互关联形成的超文本（HyperText），连成可相互参阅的 WWW（World Wide Web，万维网）。

    WWW 这一名称，是 Web 浏览器当年用来浏览超文本的客户端应用程序的名称。现在则用来表示这一系列的集合，也可简称为 Web。
    
    现在已提出了 3 项 WWW 构建技术，分别是：
    
    +   把 SGML（Standard Generalized Markup Language，超文本标记语言）作为页面的文本标记语言的 HTML（HyperText Transfer Protocol）
    +   作为文档传递协议的 HTTP
    +   指定文档所在地址的 URL（Uniform Resource Locator，统一资源定位符）

+   HTTP 变化史
    
    +   HTTP/0.9
        
        HTTP 与 1990 年问世，那时的 HTTP 没有作为正式的标准被建立，其实含有 HTTP/1.0 之前版本的意思，因此被称为 HTTP/0.9。
    
    +   HTTP/1.0

        这是 HTTP 作为标准被公布的版本，被称为 HTTP/1.0，公布在 1996 年 5 月。
        
    +   HTTP/1.1
        
        该版本公布于 1997 年 1 月，是目前主流的 HTTP 协议版本。
        
+   HTTP 的现状
    
    现状 HTTP 协议已经超出了 Web 这个框架的局限，被运用到了各种场景里。
    
+   TCP/IP

    +   TCP / IP 是什么

        HTTP 是 TCP/IP 协议族的子集。

        TCP/IP 包含：IEEE 802.3 / FDDI / ICMP / TCP / IP / PPPoE / DNS / UDP / FTP / SNMP / HTTP ...
        
        TCP/IP 协议中存在各种各样的内容。从电缆的规格到 IP 地址的选定方法、寻找异地用户的方法、双方建立通信的顺序，以及 Web 页面显示需要处理的步骤，等等。
        
    +   TCP/IP 的分层管理

        TCP/IP 协议族里重要的一点就是分层。TCP/IP 协议族按层次分别分为以下 4 层：应用层、传输层、网络层和数据链路层。
        
        以一个 Web 页面的 HTTP 请求为例：
        
        +   应用层（HTTP 协议）

            +   动作

                客户端在应用层（HTTP 协议）发出了一个想看某个 Web 页面的 HTTP 请求。
            
                    HTTP 数据
                    
            +   该层的协议：HTTP、DNS
                
            +   HTTP 协议的职责：
                +   发送时：生成对模板 Web 服务器的 HTTP 请求报文。
                +   接收时：对 Web 服务器请求的内容进行处理
            
            +   DNS 协议
             
                和 HTTP 协议一样，DNS（Domain Name Synstem）服务位于应用层，它提供域名到 IP 地址之间的解析服务。
            
        +   传输层（TCP 协议）

            +   动作

                把从应用层处收到的数据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端口号后转发给网络层。
            
                    TCP 首部 + HTTP 数据   
                
            +   TCP 协议的职责
                
                +   发送时：提供可靠的字节流服务。所谓的字节流服务是指为了方便传输，将打开数据分割成以报文段（segment）为单位的数据包进行管理。而可靠的传输服务是指，能够把数据准确可靠地传给对方。
                +   接收时：重组接收到的报文段，按序号以原来的顺序重组请求报文
            
                简言之，TCP 协议为了更容易地传送大数据才把数据分割，而且 TCP 协议能够确认数据最终是否送达到对方。
            
                为了准确无误地将数据送达目标处，TCP 协议采用了三次握手策略：
                
                +   发送端发送一个带 SYN 标志的数据包给对方。
                +   接收端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。
                +   发送端再回传一个带 ACK 标志的数据包，代表”握手“结束

                简言之：

                +   A 发，B 收， B 知道 A 能发
                +   B 发，A 收， A 知道 B 能发收
                +   A 发，B 收， B 知道 A 能收
                            
        +   网络层（IP 协议）
            
            +   动作
            
                增加作为通信目的地的 MAC 地址后转发给链路层。
            
                到此为止，发往网络的通信请求就准备齐全了。
            
                    IP 首部 + TCP 首部 + HTTP 数据
            
            +   IP 协议的职责

                搜索对方的地址，一边中转一边传送
                
                IP 协议（Internet Protocol）的作用是把各种数据包传送给对方。要保证确实传送到对方那里，则需要满足各类条件。其中两个重要的条件是 IP 地址和 MAC 地址（Media Access Control Address）。
            
                IP 地址指明了节点被分配到的地址，MAC 地址是网卡所属的固定地址。
            
                IP 间的通信依赖 MAC 地址，根据通信方的 IP 地址反查出对应的 MAC 地址的协议是 ARP 协议。
            
        +   链路层

            接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。
            
            当传输到应用层，才能算真正接收到由客户端发过来的 HTTP 请求。
            
                以太网首部 + IP 首部 + TCP 首部 + HTTP 数据
                
    +   URI 和 URL

        +   URL：Uniform Resource Locator 统一资源定位符
        +   URI：Uniform Resource Identifier

            +   Uniform：规定统一的格式可方便处理多种不同类型的资源，而不用根据上下文环境来识别资源指定的访问方式。
            +   Resource：资源的定义是 “可标识的任何东西”。
            +   Identifier：标识可标识的对象，也成为标识符。

            综上，URL 就是由某个协议方案标识的资源的定位标识符。
            
            采用 HTTP 协议时，协议方案就是 http。除此之外，还要 ftp、mailto、telnet、file 等。标准的 URI 协议方案有 30 种左右。
            
            URL 是 URI 的子集，URI 用字符串标识某一互联网资源，而 URL 标识资源的地点（互联网上所处的位置）。
            
        +   URI 格式

                协议方案名 + 登录信息 +  服务器地址 + 服务器端口号 + 带层次的文件路径 + 查询字符串 + 片段标识符
                
## 简单的 HTTP 协议

+   HTTP 协议用于客户端和服务端之间的通信
+   通过请求和相应的交换达成通信

    先从客户端开始建立通信，服务端在没有接收到请求之前不会发送响应。
    
    请求报文由：请求方法、请求 URI、协议版本、可选的请求首部字段和内容实体构成。
    
    接收到请求的服务器，会将请求内容的处理结果以响应的形式返回。
    
    响应报文由：协议版本、状态码、用以解释状态码的原因短语、可选的响应首部字段以及实体主体构成。
    
+   HTTP 特点
    +   HTTP 是不保存状态的协议

        HTTP 是无状态（stateless）协议，协议对于发送过的请求或响应都不做持久化处理。
    
        这样做的好处是：更快、确保协议的可伸缩性、减轻服务器的 CPU 及内存消耗。
    
        HTTP/1.1 虽然是无状态协议，但为了实现期望的保持状态功能，于是引入了 Cookie 技术。有了 Cookie 再用 HTTP 协议通信，就可以管理状态了。
    
    +   建立在 tcp 协议之上
    +   无连接（连接复用后就可以了）
    +   支持客户端/服务器模型
    +   多内容格式
    
+   请求 URI （request-URI）定位资源

    当客户端请求访问资源而发送请求时，URI 需要将作为请求报文中的请求 URI 包含在内。
    
    指定请求 URI 的方式有很多：
    
    +   URI 为完整的请求 URI

        ```
        GET http://hackr.jp/index.htm HTTP/1.1
        ```
        
    +   在首部字段 Host 中写明网络域名或 IP 地址

        ```
        GET /index.htm HTTP/1.1
        Host: hackr.jp
        ```
        
    +   其他：如果不是访问特定资源而是对服务器本身发起请求，可以用一个 * 代替请求 URI。

        ```
        OPTIONS * HTTP/1.1
        ```
        
+   告知服务器意图的 HTTP 方法

    +   GET：获取资源

        GET 方法用来请求访问已被 URI 识别的资源。指定的资源经服务器解析后返回响应内容。
        也就是说，如果请求的资源是文本，则保持原样返回；如果是像 CGI（Common Gateway Interface，通用网关接口）那样的程序，则返回经过执行后的输出结果。
        
    +   POST：传送实体主体

        POST 方法用来传输实体的主体。
        
        虽然用 GET 方法也可以传输实体的主题，但一般不用 GET 方法进行传输，而是用 POST 方法。
        
        虽然 POST 的功能和 GET 类似，但 POST 的主要目的并不是获取。
        
    +   PUT：传输文件

        PUT 方法用来传输文件。就像 FTP 协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置。
        
        但是，鉴于 HTTP/1.1 的 PUT 方法资深不带验证机制，任何人都可以上传文件，存在安全性问题，因此一般的 Web 网站不使用该方法。如果配合 Web 应用程序的验证机制，或架构设计采用 REST 标准的同类 Web 网站，就可能会开放使用 PUT 方法。
        
    +   HEAD：获得报文头部

        HEAD 和 GET 一样，只不过不返回报文主体部分。用于确认 URI 的有效性以及资源更新的日期时间等。
        
    +   DELETE：删除资源

        这是和 PUT 相反的方法，DELETE 按照请求 URI 删除资源。
        
        同样的有安全性问题，处理方法和 PUT 一致。
        
    +   OPTIONS：询问支持的方法

        OPTIONS 用来查询针对请求 URI 指定的资源支持的方法。
        
        ```
        OPTIONS * HTTP/1.1
        ```
        
+   持久连接

    +   HTTP 初始版本：每进行一次 HTTP 通信就要断开一次 TCP 连接。

        以当年的通信情况看，因为都是些容量很小的文本传输，所以即使这样也没有多大问题。但是随着 HTTP 的普及，文档中包含大量图片的情况多了起来，这样的机制下，通信量是很大的。
        
    +   HTTP/1.1 和 一部分的 HTTP/1.0 提出了持久连接（HTTP Persistent Connection，也成为 HTTP keep-alive 或 HTTP connection reuse）的方法

        持久连接的特点是，只要任意一端没有明确提出端口连接，则保持 TCP 连接状态。
        
        持久连接的好处在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻了服务端的负载；另外也减少了请求和响应的时间。
        
        在 HTTP/1.1 中，所有的连接默认都是持久连接，但在 HTTP/1.0 内并未标准化。服务器不一定能够支持持久连接，而且，客户端也需要支持持久连接
        
+   管线化

    持久连接使得多数请求以管线化（pipelining）方式发送成为可能。这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待响应了。
    
+   使用 Cookie 做状态管理
    
    Cookie 技术通过在请求和响应报文中写入 Cookie 信息来控制客户端的状态。
    
    服务器发送：Cookie 会根据从服务器发送的响应报文内的一个叫做 Set-Cookie 的首部字段信息，通知客户端保存 Cookie。
    
    客户端发送：客户端再往该服务器发送请求时，会自动在请求报文中加入 Cookie 值然后发送出去。
    
    服务器接收：服务器接收到 Cookie 后，会检查究竟是从哪个客户端发送来的请求，然后对比服务器上的记录，最后得到之前的状态信息。
    
## HTTP 报文内的 HTTP 信息

+   HTTP 报文是什么

    HTTP 报文分为请求报文和响应报文。HTTP 报文是本身由多行（用 CR + LF 作换行符）数据构成的字符串文本。

    HTTP 报文大致可以分为报文首部和报文主体两块，二者由最初出现的空行（CR + LF）来划分，通常，并不一定要有报文主体。

    CR：Carriage Return，回车符，16 进制 0x0d
    LF：Line Feed，换行符，16 进制 0x0a

    报文首部：服务器或客户端需要出来的请求或响应的内容及属性。
    报文主体：应被发送的数据。

+   HTTP 包含哪些报头信息
    +   内容协商
    +   缓存控制
    +   客户端信息
    +   cookie
    +   跨域头(cross-domain)

+   请求报文及响应报文的结构

    +   报文首部
        +   请求行/状态行
        +   首部字段（请求/响应首部字段、通用首部字段、实体首部字段）
        +   其他：可能包含 HTTP 的 RFC 里未定义的首部（Cookie 等）
    +   空行（CR + LF）
    +   报文主体

+   报文主体和实体主体

    通常，报文主体等于实体主体。只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异。

+   编码提升传输效率
    +   压缩传输的内容编码

        HTTP 协议中有一种被称为内容编码的功能能够进行压缩操作。
        
        内容编码指明应用在实体内容上的编码格式，并保持实体信息原样压缩，由客户端接收并负责解码。
        
        常用的内容编码有以下几种：
        
        +   gzip（GNU zip）
        +   compress（UNIX 系统的标准压缩）
        +   deflate（zlib）
        +   identity（不进行编码）

    +   分割发送的分块传输编码

        把实体主体分块的功能称为分块传输编码（Chunked Transfer Coding）。
        
        每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用 “0（CR + LF）”
来标记。

        HTTP/1.1 中存在一种称为传输编码（Transfer Coding）的机制，它可以在通信时按某种编码方式传输，但只定义作用域分块传输编码中。
        
    +   发送多种数据的多部分对象集合

        邮件中，使用了 MIME（Multipurpose Internet Mail Extensions）机制来发送多种不同类型的数据，如文本、图片、视频等。
        
        MIMI 扩展中会使用一种称为多部分对象集合（Multipart）的方法，来容纳多份不同类型的数据。
        
        HTTP 协议中也采纳了多部分对象集合，发送的报文主体里可以含有多种类型的实体，通常是在图片或者文本文件等上传时使用。
        
        多部分对象集合包含的对象如下：
        
        +   multipart/form-data：在 Web 表达文件上传时使用
        +   multipart/byteranges：状态码 206（Partial Content，部分内容）响应报文中包含了多个范围的内容时使用
    
        在 HTTP 报文中使用多部分对象集合时，需要在首部字段里加上 Content-type。
        
        ```
        Content-type: multipart/form-data;
        ```
        
        使用 `boundary` 字符串来花费多部分对象集合指明的各类实体。每个部分类型中，都可以含有首部字段。另外，可以在某个部分中嵌套使用多部分对象集合。
        
    +   获取部分内容的范围请求

        执行范围请求时，会用到首部字段 `Range` 来指定 byte 范围。
        
        ```
        Range: bytes=5001-10000
        Range: bytes=5001-
        Range: bytes=-3000. 5000-7000
        ```
        
        针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文。
        
        另外，对于多重范围的请求，响应会在首部字段 Content-Type 标明 multipart/byteranges 后返回响应报文。
        
        如果服务器无法响应范围要求，则会返回状态码 200 OK 和完整的实体内容。

## HTTP Header

+   Encoding
    +   请求：Accept-Encoding
    +   响应：Content-Encoding
    +   取值：gzip、deflate、sdch
    +   作用：对请求体和响应体进行压缩，压缩文本数据能减少带宽并加快显示速度。压缩的时间会远小于传输的时间，所以不用担心压缩。

+   Connection
    +   请求：Connection
    +   响应：Connection
    +   取值范围：Keep-Alive、Close
    +   作用：
        +   Keep-Alive：可以减少TCP建立成本，销毁成本。（长连接），但是占用端口时间长，高并发时需要考虑。
        +   Close：每次连接将使用新的TCP连接

    在请求一个网址时，返回最终页面的内容大多数有多个请求组成(css、js、png等资源的请求），所以如果开启keep-alive可以让页面的所有请求都在一次tcp连接建立后传输。

+   Cookie

    +   响应：Set-Cookie

        如：sid = test; path=/; 键值对形式
        请求：Cookie
        如：sid = test;

    +   特殊值：
        +   expires：失效时间
        +   path: 该 Cookie 适用于哪些请求路径
        +   domain：试用于哪些域名。

    +   当服务端 Set-Cookie 时，浏览器记录此键值对的值并在下次请求时提交上去。
    +   session 通过 Cookie 实现
    +   Cookie 大小客户端服务端实现有可能不一样，一般4K.

    ![](imgs/2018-04-30-17-58-26.png)

    ![](imgs/2018-04-30-17-58-36.png)

+   Accept-Language

    +   请求：Accept-Language
    +   取值范围：

        en,zh-CN,zh;q=0.8,zh;q=0.6,zh-TW;q=0.4

        其中 q 代表权重，en 默认权重为 1

    +   作用：客户端接收的语言。根据此值做本地化判断，如：英文与中文页面的切换。

    ![](imgs/2018-04-30-17-59-43.png)

+   Referer

    +   请求：Referer
        
        客户端请求时添加此值，标识从哪个网站跳过来的。

    +   可做资源防盗链时使用。

+   User-Agent

    +   请求：User-Agent
    +   值如：
        
        ```
        Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36
        ```

        客户端的一些信息，包括：客户端硬件信息，操作系统，浏览器信息等。

    +   作用：根据这个值做一些数据统计分析，如果是手机端则推送适合手机的内容。

+   Modified-Since

    +   请求：If-Modified-Since
    +   响应：Last-Modified
    +   值如：`Fri, 23 Oct 2015 05:36:06 GM`
    +   作用：
        
        客户端先保存服务端的Last-Modified与此资源信息到本地，当此资源以后请求时，把此值设为 
        `If-Modified-Since` 并请求到服务器。

        服务端判断此值未变或不需要更新时返回 304，表明客户端可直接使用缓存。

+   Cache-Control

    +   响应：cache-control
    +   值如：`max-age=121737619` 或 `private, max-age=0, no-cache`
        +   max-age（单位为s）

            指定设置缓存最大的有效时间，定义的是时间长短。当浏览器向服务器发送请求后，在 max-age 这段时间里浏览器就不会再向服务器发送请求了。

            max-age=0 就是没有缓存。
        
        +   public

            指定响应可以在代理缓存中被缓存，于是可以被多用户共享。如果没有明确指定private，则默认为 public。

        +   private

            响应只能在私有缓存中被缓存，不能放在代理缓存上。对一些用户信息敏感的资源，通常需要设置为 private。

        +   no-cache

            表示必须先与服务器确认资源是否被更改过（依靠 If-None-Match 和 Etag），然后再决定是否使用本地缓存。

        +   no-store

            绝对禁止缓存任何资源，也就是说每次用户请求资源时，都会向服务器发送一个请求，每次都会下载完整的资源。通常用于机密性资源。

            关于 Cache-Control 的使用，见下面这张图：

            ![](imgs/2018-04-30-18-34-59.png)

    +   作用：控制缓存时间，相对时间长度。

+   Expires

    +   响应：Expires
    +   值如：`Wed, 25 Oct 2017 09:05:12 GMT` 设置绝对时间
    +   作用：指定到特定时间过期。

+   Cache-Control 和 Expires

    +   Cache-Control 是 HTTP1.1 中新增的响应头
    +   Expires 是 HTTP1.0 中的响应头
    +   Cache-Control 使用的是相对时间
    +   Expires 指定的是具体的过期日期而不是秒数。因为很多服务器跟客户端存在时钟不一致的情况，所以最好还是使用 Cache-Control.
    +   Cache-Control 和 Expires 同时使用的话，Cache-Control 会覆盖 Expires

+   Etag

    +   响应：Etag
    +   请求：if-none-match
    +   值如：“zdsfsdf”
    +   作用：
        
        与 `Last-Modified` 类似，服务端给文件生成一个标识，下次客户端存在 `if-none-match` 中提交到服务端，服务端进行比较来判断文件是否改变，从而做出是否缓存决定。

        Etag 主要为了解决 Last-Modified 无法解决的一些问题。

        比如： 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET;

+   Via

    +   响应：via
    +   作用：存放路由信息,CDN中常用。

+   Content-Length
    +   请求：Content-Length
    +   响应：content-length
    +   值：数字
    +   作用：代表请求体的大小，或者响应体内容的大小。

+   Content-Range

    +   请求：Range
        
        格式： `Range:(unit=first byte pos)-[last byte pos]`

        指定第一个字节的位置和最后一个字节的位置

    +   响应：Content-range，

        格式：`Content-Range: bytes (unit first byte pos) - [last byte pos]/[entity legth]`

        指定整个实体中的一部分的插入位置，他也指示了整个实体的长度

    +   值如：

        ```
        Range:bytes=0-801
        Content-Range: bytes 0-800/801
        ```

    +   作用：可指定传入文件的第几个字节读取，可用于实现端点下载。

+   Content-Type

    +   作用：表明在 HTTP 请求时所采用数据格式
    +   格式：数据类型/子类型[; 字符编码算法]
    +   普通表单提交 和 文件上传时采用的两种数据格式
        +   w-www-form-urlencoded 编码采用 URLComponent + 空格特殊处理
        +   multipart 用于大数据提交，分段发送/接受，以防内存占用过大，阻塞导致性能低下等问题


## 返回结果的 HTTP 状态码

+   状态码有 60 多种，常用的大约 14 种
+   状态码的类别
    +   1XX：Informational（信息性状态码），接收的请求正在处理
    +   2XX：Success（成功状态码），请求正常处理完毕
        +   200

            表示请求在服务器被正常处理了。
    
            响应报文内，随状态码一起返回的信息会因方法的不同而发生改变。
            
        +   204

            表示服务器接收的请求已成功处理。
            
            和 200 的区别是，204 响应不会返回任何实体的主体。
            
            一般用在只需要从客户端网服务器发送信息，而对客户端不需要发送新信息的情况下。
            
        +   206 Partial Content
            
            该状态码表示服务器成功处理了客户端发来的范围请求，响应报文中包含由 Content-Range 指定范围的实体内容。    
            
    +   3XX：Redirection（重定向状态码），需要进行附加操作以完成请求
        
        +   301 Moved Permanently

            永久重定向。表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。
            
        +   302 Found

            临时重定向。表示希望用户（本次）能使用新的 URI 访问。
            
            302 禁止 POST 变换成 GET，但实际使用时大家并不遵守。
            
        +   303 See Other

            表示请求的资源存在另一个 URI，应该使用 GET 方法定向获取资源。
            
            和 302 的差别是 303 明确表示客户端应该用 GET 方法获取资源。
            
        +   304 Not Modified

            表示客户端发送附带条件的请求时，服务器允许请求访问资源，但如果为满足条件，则直接返回 304 Not Modified。
            
            返回时，不包含任何响应的主体部分。
            
        +   307 Temporary Redirect

            临时重定向，和 302 类似。
    
    +   4XX：Client Error（客户端错误状态码），服务器无法处理请求
        
        +   400 Bad Request

            表示请求报文中存在语法错误。另外，浏览器会像 200 OK 一样对待该状态码。
            
        +   401 Unauthorized

            表示发送的请求需要通过 HTTP 认证（BASIC 认证、DIGEST 认证）。
            
            如果之前已请求过一次，则表示用户认证失败。
            
            返回的 401 响应必须包含一个适用于被请求资源的 WWW-Authenticate 首部用以质询（challenge）用户信息。
            
            当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。
            
        +   403 Forbidden

            表示请求资源的访问被服务器拒绝了，原因并不是必须展示的，当然也可以在响应的实体主体部分描述。
            
        +   404 Not Found

            表示服务器上无法找到请求的资源。
            
            除此之外，也可以在服务器拒绝请求且不想说吗理由时使用。
    
    +   5XX：Server Error（服务器错误状态码），服务器处理请求出错
        
        +   500 Internal Server Error

            表示服务器在执行请求时发生了错误。
            
        +   503 Service Unavailable

            表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

## 参考

+   《图解 HTTP》
+   https://www.jianshu.com/p/59d36b01608d
+   https://juejin.im/entry/5ae36365f265da0b886d28c2
+   https://juejin.im/post/5ae2711bf265da0b873a3657https://juejin.im/post/5ae2711bf265da0b873a3657
+   https://juejin.im/post/5ad7e6c35188252ebd06acfa
