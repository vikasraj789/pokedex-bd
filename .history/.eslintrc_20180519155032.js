module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        es6: true,
        jquery: true,
        jest: true,
    },
    extends: "airbnb",
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "comma-dangle": ["error", "always-multiline"],
        "spaced-comment": ["warn", "never"],
        indent: [2, 4],
        "linebreak-style": ["error", "unix"],
        "max-len": [
            2,
            {
                code: 150,
                ignoreTemplateLiterals: true,
                ignoreComments: true,
            },
        ],
        "array-element-newline": 1,
        "jsx-a11y/href-no-hash": 0,
        "eol-last": 0,
        quotes: 0,
        semi: ["error", "always"],
        "func-names": ["warn", "as-needed"],
        "object-shorthand": ["warn", "never"],
        "quote-props": [1, "as-needed"],
        "import/no-extraneous-dependencies": [
            2,
            {
                devDependencies: true,
            },
        ],
        "react/prefer-stateless-function": [
            1,
            {
                ignorePureComponents: true,
            },
        ],
        "no-unused-expressions": [2],
        "no-restricted-syntax": ["warn", "ForInStatement"],
        "jsx-a11y/label-has-for": 1,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/no-danger": 0,
        "react/no-did-mount-set-state": 1,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "react/prop-types": 0,
        "no-unused-expressions": 2,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/jsx-indent": 0,
        "react/no-array-index-key": 0, //need to be removed once actual data arrive from api's
        "react/jsx-indent-props": [2, 4],
        "react/no-render-return-value": 0,
        "no-plusplus": 0,
        "react/prop-types": 0,
        "arrow-body-style": 0,
        "no-lonely-if": 0,
        "no-new": 0,
        "no-nested-ternary": 0,
        "react/jsx-filename-extension": 0,
        "no-console": "error",
        "no-useless-concat": "warn",
        "block-scoped-var": "error",
        "consistent-return": "warn",
    },
};
