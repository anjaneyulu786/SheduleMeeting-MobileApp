import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigation';
import { loadReCaptcha } from 'react-recaptcha-google'

import { Card } from 'react-native-paper';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
