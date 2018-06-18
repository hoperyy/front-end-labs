`package.json`

```javascript
{
  "name": "xxx",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "build": "babel index.js -d dist",
    "postpublish": "npm run build"
  },
  "author": "liuyuanyang",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-plugin-transform-object-assign": "^6.22.0",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1"
  }
}
```

`.babelrc`

```javascript
{
    "plugins": [
        "add-module-exports",
        "transform-object-assign",
        [
            "transform-object-rest-spread",
            {
                "useBuiltIns": true
            }
        ]
    ],
    "presets": [
        "env",
        "es2015",
        "stage-2"
    ]
}
```