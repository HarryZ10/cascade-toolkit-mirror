module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'plugin:vue/essential',
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
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
