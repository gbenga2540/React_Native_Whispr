function getAliasesFromTsConfig () {
  const tsConfig = require('./tsconfig.json');
  const paths = tsConfig.compilerOptions.paths;
  return Object.keys(paths).reduce((acc, key) => {
    return {
      ...acc,
      [key]: `./${paths[key][0]}`,
    };
  }, {});
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['.'],
        alias: getAliasesFromTsConfig(),
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
