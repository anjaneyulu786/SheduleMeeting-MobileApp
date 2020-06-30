import React from 'react';
import {
  KeyboardAvoidingView, View, Button, Alert, Text, AsyncStorage, StyleSheet, TextInput, Dimensions
} from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';


export default class ForgotPass extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileNumber: '',
      spinner: false
    };

    this._forgotPassHandler = this._forgotPassHandler.bind(this);
  }

  _forgotPassHandler = async () => {
    const { mobileNumber } = this.state;

    var formData = new FormData();
    formData.append('mobileNumber', mobileNumber);

    alert(" forgot button press ::", JSON.stringify(formData));
    this.setState({ spinner: true });
    const response = await fetch(`https://schedulemeetings.herokuapp.com/ui/forgotPassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: this.state.mobileNumber
      }),
    })
      .then(resp => {
        this.setState({ spinner: false });
        return resp.json();
      })
      .catch(error => {
        this.setState({ spinner: false });
        throw error;
      });

    if (typeof response.message != 'undefined') {
      await Alert.alert('Error', response.message);
    } else {
      this.props.navigation.navigate('OTPScreen');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior="padding" enabled>
        <View style={style.container}>
          <TextInput
            keyboardType="phone-pad"
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            style={style.input}
            placeholder="Mobile Number"
            value={this.state.mobileNumber}
          />
          {this.state.spinner &&
            <ActivityIndicator animating={true} color={Colors.red800} />
          }
          {!this.state.spinner &&
            <Button
              style={style.signUpbtn}
              title="GET OTP!"
              onPress={this._forgotPassHandler}
            //onPress={() => this.props.navigation.navigate('OTPScreen')}
            />
          }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(200, 80%, 90%)'
  },
  input: {
    backgroundColor: '#00b5ec',
    width: DEVICE_WIDTH - 100,
    height: 45,
    marginHorizontal: 20,
    borderRadius: 20,
    color: '#333333',
    marginBottom: 30,
    paddingLeft: 15
  },
  signUpbtn: {
    backgroundColor: 'red',
    margin: 20,
  }
});