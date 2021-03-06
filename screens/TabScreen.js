import React from 'react'
import { View, Text, AsyncStorage, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'

import HomeScreen from './Home';
import SignUp from './SignUp';
import Business from './BusinessScreen';
import SettingScreen from './Profile';

const SignoutScreen = () => { }

export const TabScreen = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-home" color={tintColor} size={30} />
            )
        }
    },
    Services: {
        screen: Business,
        navigationOptions: {
            tabBarLabel: 'Business',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-card" color={tintColor} size={30} />
            )
        }
    },
    Settings: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-person" color={tintColor} size={30} />
            )
        }
    },
    Signout: {
        screen: SignoutScreen,
        navigationOptions: {
            tabBarLabel: 'Signout',
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons name="logout" color={tintColor} size={20} />
            ),
            tabBarOnPress: async ({ navigation }) => {
                await AsyncStorage.clear();
                navigation.navigate('Auth');
            }
        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: '#0c91e0',
            inactiveTintColor: 'grey',
            showIcon: true,
        },
        headerMode: 'none',
    });