/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notificationManager } from './src/services/notification';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

notificationManager.configure();
notificationManager.createChannel();

const Root = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Root);
