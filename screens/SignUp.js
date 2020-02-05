import * as React from 'react';
import {
  KeyboardAvoidingView, View, Button, Alert, Text,TouchableOpacity, AsyncStorage, StyleSheet, TextInput, Dimensions
} from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import ConfirmGoogleCaptcha  from 'react-recaptcha-google'

const siteKey = '6Lf41K0UAAAAAHd3FeZbJsMbL00-Beqyk33NHqtp';
const baseUrl = 'https://google.com';


export default class SignUp extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      email: '',
      mobileNumber: '',
      conformPassword: '',
      password: '',
      spinner: false,
      code: ''
    };

    this._signInHandler = this._signInHandler.bind(this);
  }
  onMessage = event => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        this.setState({ code: event.nativeEvent.data });
        setTimeout(() => {
          this.captchaForm.hide();
          // do what ever you want here
        }, 1500);
      }
    }
  };


  _signInHandler = async () => {
    const { email, mobileNumber, firstName, conformPassword, password } = this.state;

    var formData = new FormData();
    formData.append('emailAddress', email);
    formData.append('password', password);
    formData.append('mobileNumber', mobileNumber);
    formData.append('firstName', firstName);
    formData.append('conformPasswoed', conformPassword);

    this.setState({ spinner: true });

    const response = await fetch(`https://mopwash-api.herokuapp.com/ui/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'firstName': this.state.firstName,
        'mobileNumber': this.state.mobileNumber,
        'conformPassword': this.state.conformPassword,
        'emailAddress': this.state.email,
        'password': this.state.password
      })
    })
      .then(resp => {
        this.setState({ spinner: false });
        return resp.json();
      })
      .catch(error => {
        this.setState({ spinner: false });
        throw error;
      });

    if (typeof response.message != "undefined") {
      await Alert.alert('Error', response.message);
    }
    else {
      await AsyncStorage.setItem('userToken', response.result[0].token);
      await AsyncStorage.setItem('userName', response.result[0].firstName);
      this.props.navigation.navigate('App');
    }
  }

  render() {
    let { code } = this.state.code;
    return (
      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior="padding" enabled>
        <View style={style.container}>
          <TextInput
            keyboardType="default"
            onChangeText={firstName => this.setState({ firstName })}
            style={style.input}
            placeholder="First Name"
            value={this.state.firstName}
          />
          <TextInput
            keyboardType="email-address"
            onChangeText={email => this.setState ({ email })}
            style={style.input}
            placeholder="Email Address"
            value={this.state.email}
          />
          <TextInput
            keyboardType="phone-pad"
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            style={style.input}
            placeholder="Mobile Number"
            value={this.state.mobileNumber}
          />
          <TextInput
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            style={style.input}
            placeholder="Password"
            value={this.state.password}
          />
          <TextInput
            secureTextEntry={true}
            onChangeText={conformPassword => this.setState ({ conformPassword })}
            style={style.input}
            placeholder="Conform Password"
            value={this.state.conformPassword}
          />

          {this.state.spinner &&
            <ActivityIndicator animating={true} color={Colors.red800} />
          }
          {!this.state.spinner &&
            <Button
            style = { style.signUpbtn }
              title="SignUp!"
              onPress={this._signInHandler}
            />
          }

          
        {/* <ConfirmGoogleCaptcha
          ref={_ref => (this.captchaForm = _ref)}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode="us-eng"
          onMessage={this.onMessage}
        />
        <TouchableOpacity
          onPress={() => {
            this.captchaForm.show();
          }}>
          <Text style={style.paragraph}>Click</Text>
        </TouchableOpacity>
        <Text>{code}
        </Text> */}
      

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
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});