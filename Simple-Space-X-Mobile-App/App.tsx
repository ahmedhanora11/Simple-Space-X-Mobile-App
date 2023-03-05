import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'

import React from 'react';
import { HomeScreen } from './src/screens/HomeScreen';
import { LandingScreen } from './src/screens/LandingScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


const switchNavigator = createSwitchNavigator({
    landingStack: {
        screen: createStackNavigator({
            //Search screen
            Landing: LandingScreen,
        }, {
            defaultNavigationOptions: {
                headerShown: false,
            },
        })
        
    },

    homeStack: createBottomTabNavigator({

        // Home tab icon
        home: {
            screen: createStackNavigator({
                HomePage: HomeScreen
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
                    return <Image source={icon} style={styles.tabIcon} />
                }
            }
        },

        // Home tab icon
        Like: {
            screen: createStackNavigator({
                LikePage: HomeScreen
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
                    return <Image source={icon} style={styles.tabIcon} />
                }
            }
        },

        Account: {
            screen: createStackNavigator({
                AccountPage: HomeScreen
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
                    return <Image source={icon} style={styles.tabIcon} />
                }
            }
        }


    })
        
 });


 const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30
  }
});
