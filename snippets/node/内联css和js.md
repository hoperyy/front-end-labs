```javascript
function* _inline(htmlContent, { rootReg, srcReg, replaceReg, inlineCallback, htmlFolder }) {
    const inlineReg = /\svinline\s/;

    let maxCount =  20;
    let subContent = htmlContent;
    let newHtmlContent = '';

    if (rootReg.test(subContent)) {
        while (subContent && (rootReg.test(subContent))) {
            // 最多 inline 20 个资源
            if (--maxCount <= 0) {
                break;
            }

            // 找到匹配的字符串
            const tagStr = subContent.match(rootReg)[0];

            const startIndex = subContent.indexOf(tagStr);

            // 以匹配到的字符串为界限，拆解 subContent 为 left / middle / right 三部分
            let left = subContent.substring(0, startIndex);
            let middle = tagStr;
            let right = subContent.substring(startIndex + tagStr.length);

            // left 部分直接充值
            newHtmlContent += left;

            // 处理 middle 部分
            if (srcReg.test(tagStr) && inlineReg.test(tagStr)) {
                let src = tagStr.match(srcReg)[0].replace(replaceReg, '').replace(/[\'\"]$/, '');

                let resourceContent;
                // 如果是相对路径
                if (/^\./.test(src)) {
                    resourceContent = yield _readLocalFile(path.join(htmlFolder, src));
                } else {
                    if (/^\/\//.test(src)) {
                        src = `https:${src}`;
                    } else if (!/^\/\//.test(src)) {
                        src = `https://${src}`;
                    }

                    resourceContent = yield _fetchResource(src);
                }

                // 从远程获取到内容后才会进行替换，否则不替换
                if (resourceContent) {
                    const inlineStr = inlineCallback(src, resourceContent);
                    middle = inlineStr;
                }
            }

            // 修正过的 middle 部分充值
            newHtmlContent += middle;

            // right 部分赋值给 subContent
            subContent = right;
        }
    }

    newHtmlContent += subContent;

    return newHtmlContent;
}

function inlineCss(htmlContent, htmlFolder) {
    return _inline(htmlContent, {
        rootReg: /\<link(\s)([\s\S]*?)\>/,
        srcReg: /href=[\'\"]\S+?(\.css)[\'\"]/,
        replaceReg: /^href=[\'\"]/,
        htmlFolder,
        inlineCallback: (src, content) => {
            return `<style type="text/css">/* inline from ${src} */\n${content || '/* inline failed by url: ' + src + ' */'}</style>`;
        }
    });
}

function inlineJs(htmlContent, htmlFolder) {
    return _inline(htmlContent, {
        rootReg: /\<script(\s)([\s\S]*?)\>/,
        srcReg: /src=[\'\"]\S+?(\.js)[\'\"]/,
        replaceReg: /^src=[\'\"]/,
        htmlFolder,
        inlineCallback: (src, content) => {
            return `<script type="text/javascript">/* inline from ${src} */\n${content || '/* inline failed by url: ' + src + ' */'}</script>`;
        }
    });
}
```