+   typescript 配置

    `.babelrc`

    ```json
    {
        "plugins": [
            "transform-vue-jsx",
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