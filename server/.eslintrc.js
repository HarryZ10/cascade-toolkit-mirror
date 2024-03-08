module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'extends': [
        'google',
        'plugin:vue/vue3-essential',
    ],
    'overrides': [
        {
            'env': {
                'node': true,
            },
            'files': [
                '.eslintrc.{js,cjs}',
            ],
            'parserOptions': {
                'sourceType': 'script',
            },
        },
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'indent': ['error', 4],
        'linebreak-style': [
            'error', process.platform === 'win32' ? 'windows' : 'unix',
        ],
    },
};
