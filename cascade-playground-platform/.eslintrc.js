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
            // unix is not included - best practice is use environment variable
            // n.b., NODE_PLATFORM=windows
            'error', 'windows' 
        ],
    },
};
