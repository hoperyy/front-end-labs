# Node 安装依赖

定义：

```javascript
function writePkg(pkgPath, obj) {
    writeFileSync(pkgPath, JSON.stringify(obj), null, '\t');
}

function ensureModule(packageNames, cwd) {
    if (!fs.existsSync(path.join(cwd, 'package.json'))) {
        writePkg(path.join(cwd, 'package.json'), {
            name: 'install-modules'
        });
    }

    const uninstalled = [];
    packageNames.forEach((packageName) => {
        try {
            require(path.join(cwd, 'node_modules', packageName));
        } catch (err) {
            uninstalled.push(`${packageName}@latest`);
        }
    });

    if (uninstalled.length) {
        console.log(`\ninstall modules start...\n`);
        require('child_process').execSync(`cd ${cwd} && npm install ${uninstalled.join(' ')} --force`, {
            stdio: 'inherit',
        });
        console.log(`\ninstall modules done.\n`);
    }
}
```

举例：

```javascript
ensureModule([
    'eslint',
    'babel-eslint',
    'eslint-config-airbnb-base',
    'eslint-config-vue',
    'eslint-plugin-import',
    'eslint-plugin-vue',
    'eslint-plugin-html',
    'eslint-plugin-react'
], process.cwd());
```