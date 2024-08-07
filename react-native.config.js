module.exports = {
  project: {
    ios: {
      sourceDir: './ios',
    },
    android: {
      sourceDir: './android',
    },
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    'react-native-splash-screen': {
      platforms: {
        ios: null,
      },
    },
    'react-native-permissions': {
      platforms: {
        ios: null,
      },
    },
  },
};
