import * as React from 'react';
import { Text, View, Button, StyleSheet, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Card, TextInput } from 'react-native-paper';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      name: '',
      emailAdress: ''
    };
    this._bootstrap();
  }

  _bootstrap = async () => {
    const firstName = await AsyncStorage.getItem('firstName');
    this.setState(
      {
        name: firstName
      }
    );

  }
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Text> {this.state.name}</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});