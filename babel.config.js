module.exports = function (api) {
  api.cache(true);

  console.log("Загрузка babel конфигурации")

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development'
        }
      ],
    ]
  };
};
