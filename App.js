import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigation';
import { loadReCaptcha } from 'react-recaptcha-google'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Card } from 'react-native-paper';

export default class App extends React.Component {
  // const [dataLoaded, setDataLoaded] = useState(false);
  // if (!dataLoaded) {
  //   return (
  //     <AppLoading
  //     startAsync = {fetchFonts}
  //     onFinish = {() => setDataLoaded(true)}
  //     />
  //   )
  // }
  render() {
    return (
      <AppNavigator />
    );
  }
}
