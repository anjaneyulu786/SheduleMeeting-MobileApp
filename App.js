import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigation';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Card } from 'react-native-paper';

export default class App extends React.Component {
  
  render() {
    return (
      <AppNavigator />
    );
  }
}
