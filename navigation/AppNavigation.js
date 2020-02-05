// import { createStackNavigator } from 'react-navigation-stack';

// import { createAppContainer } from 'react-navigation';

// import Home from '../screens/Home';
// import Profile from '../screens/Profile';

// const AppNavigator = createStackNavigator({
//   Home: { screen: Home },
//   Profile: { screen: Profile },

// });

// export default createAppContainer(AppNavigator);

import { TabScreen } from '../screens/TabScreen';
import SignScreen from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ForgotPass from '../screens/ForgotPassScreen';
import OTPScreen from '../screens/OTPScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({ TabScreen });
const AuthStack = createStackNavigator({
  Signin: SignScreen,
  SignUp: { screen: SignUp },
});

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Starter: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      ForgotPass: ForgotPass,
      OTPScreen: OTPScreen
    },
    {
      initialRouteName: 'Starter',
    }
  )
);

export default AppNavigator;
