export const images = (isDarkMode?: boolean) => {
  return {
    default_user: isDarkMode
      ? require('./default_user_dark.jpg')
      : require('./default_user_light.jpg'),
  };
};
