import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Alert,
  Text,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet,
  styles,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';

import { Button } from 'react-native-paper';

import { Card, ActivityIndicator, Colors } from 'react-native-paper';

import imageLogo from '../assets/mop.png';

export default class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileNumber: '',
      password: '',
      spinner: false,
    };

    this._signInHandler = this._signInHandler.bind(this);
  }

  _signInHandler = async () => {
    const { mobileNumber, password } = this.state;

    var formData = new FormData();
    formData.append('mobileNumber', mobileNumber);
    formData.append('password', password);

    this.setState({ spinner: true });

    const response = await fetch(`https://schedulemeetings.herokuapp.com/ui/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: this.state.mobileNumber,
        password: this.state.password,
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
      var user = response.result[0];
      await AsyncStorage.setItem('userName', JSON.stringify (user.firstName)); console.log('test session setItems ::', user.firstName);
      await AsyncStorage.setItem('token', JSON.stringify(user.token)); console.log('test session setItems ::', user.token);
      await AsyncStorage.setItem("userId", JSON.stringify(user.userId)); console.log('test session setItems ::', user.userId);
      await AsyncStorage.setItem('emailAddress', JSON.stringify(user.emailAddress)); console.log('test session setItems ::', user.emailAddress);
      await AsyncStorage.setItem('mobileNumber', JSON.stringify(user.mobile)); console.log('test session setItems ::', user.mobile);
      await AsyncStorage.setItem('userType', JSON.stringify(user.userType)); console.log('test session setItems ::', user.userType);
      // await AsyncStorage.setItem('img', JSON.stringify(user.img)); console.log('test session setItems ::', user.img);
      await AsyncStorage.setItem('businessId', JSON.stringify(user.businessId)); console.log('test session setItems ::', user.businessId);
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
        {/* <Image source={imageLogo} style={style.logo} /> */}

        <View style={style.form}>
          <Text
            style={style.title}>
            SheduleApp
          </Text>

          <TextInput
            keyboardType="phone-pad"
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            style={style.input}
            placeholder="Mobile Number"
            value={this.state.mobileNumber}
            returnKeyType={"next"}
          />
          <TextInput
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            style={style.input}
            placeholder="Password"
            value={this.state.password}
            returnKeyType={"done"}
          />
          {this.state.spinner && (
            <ActivityIndicator animating={true} color={Colors.red800} />
          )}
          {!this.state.spinner && (
            <Button icon="login" mode="outlined" onPress={this._signInHandler}>
              Sign In
            </Button>
          )}
        </View>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('ForgotPass')}>
          <Text>Forgot your password ?</Text>
        </TouchableHighlight>


        <View style={style.signUpbtn}>
          <Button
            mode="outlined"
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{ color: '#0c91e0' }}>Sign Up</Text>
          </Button>
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
    backgroundColor: 'hsl(200, 80%, 90%)',
  },
  input: {
    backgroundColor: '#00b5ec',
    width: DEVICE_WIDTH - 120,
    height: 45,
    marginHorizontal: 20,
    borderRadius: 20,
    color: '#333333',
    marginBottom: 30,
    paddingLeft: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'red',
    marginLeft: 60,
    marginBottom: 10
  },
  signUpbtn: {
    backgroundColor: '#ff7f50',
    margin: 20,
    width: DEVICE_WIDTH - 150,
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
});