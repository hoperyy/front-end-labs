```js
"files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/*.js": { "when": "$(basename).ts"},
    "**/*.js.map": true
}
```