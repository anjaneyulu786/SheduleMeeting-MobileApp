import React from 'react';
import {
  KeyboardAvoidingView, View, Button, Alert, Text, AsyncStorage, StyleSheet, TextInput, Dimensions
} from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';


export default class OTPScreen extends React.Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileNumber: '',
      spinner: false
    };

    this._resetPasswordHandler = this._resetPasswordHandler.bind(this);
  }

  _resetPasswordHandler = async () => {
    const { otp, NewPassword, ConformPassword } = this.state;

    var formData = new FormData();
    formData.append('otp', otp);
    formData.append('NewPassword', NewPassword);
    formData.append('ConformPassword', ConformPassword)

    this.setState({ spinner: true });
    const response = await fetch(`https://schedulemeetings.herokuapp.com/ui/user/forgotPasswordOTP`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: this.state.otp,
        NewPassword: this.state.NewPassword,
        ConformPassword: this.state.ConformPassword
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
      this.props.navigation.navigate('Signin');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior="padding" enabled>
        <View style={style.container}>
          <TextInput
            keyboardType="phone-pad"
            onChangeText={mobileNumber => this.setState ({ mobileNumber })}
            style={style.input}
            placeholder="Enter OTP"
            value={this.state.mobileNumber}
          />
           <TextInput
            secureTextEntry={true}
            onChangeText={NewPassword => this.setState({ NewPassword })}
            style={style.input}
            placeholder="New Password"
            value={this.state.NewPassword}
            returnKeyType = { "done" }
          />
           <TextInput
            secureTextEntry={true}
            onChangeText={ConformPassword => this.setState({ ConformPassword })}
            style={style.input}
            placeholder="Conform Password"
            value={this.state.ConformPassword}
            returnKeyType = { "done" }
          />
          {this.state.spinner &&
            <ActivityIndicator animating={true} color={Colors.red800} />
          }
          {!this.state.spinner &&
            <Button
            style = { style.signUpbtn }
              title="RESET PASSWORD"
              onPress={this._resetPasswordHandler}
              //onPress={() => this.props.navigation.navigate('App')}
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