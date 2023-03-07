import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import * as ReactDOM from 'react-dom/client';
import React from 'react';
import HomeScreen  from './src/screens/HomeScreen';
import { SocialScreen } from './src/screens/SocialScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { LandingScreen } from './src/screens/LandingScreen';

import { Provider } from 'react-redux';
import { space } from './src/redux';


import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ApolloClient, gql, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';



//apollo
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://spacex-production.up.railway.app/',
    }),
    cache: new InMemoryCache(),
  });

  const RocketQuery = gql`
  query Rockets($rocketName: String){
    rockets(byName:$rocketName){
      boosters
      company
      country
      description
      name
      type
      id
    }
  }
  `

const switchNavigator = createSwitchNavigator({
    landingStack: {
        screen: createStackNavigator({
            //landing screen
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
              
                HomePage: HomeScreen,
                
            },
            {
                defaultNavigationOptions: {
                  headerShown: false
                }
              }),
              
            navigationOptions: {
                
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
                    return <Image source={icon} style={styles.tabIcon} />
                    
                }
            },
            
            
            
        },

        // social tab icon
        social: {
            screen: createStackNavigator({
                SocialPage: SocialScreen,
            },
            {
                defaultNavigationOptions: {
                  headerShown: false
                }
              }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/social_icon.png') : require('./src/images/social_n_icon.png')
                    return <Image source={icon} style={styles.tabIcon} />
                    
                }
            }
        },

        //Account Tab Icon
        // Account: {
        //     screen: createStackNavigator({
        //         AccountPage: AccountScreen
        //     },
        //     {
        //         defaultNavigationOptions: {
        //           headerShown: false
        //         }
        //       }),
        //     navigationOptions: {
        //         tabBarIcon: ({ focused, tintColor }) => {
        //             let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
        //             return <Image source={icon} style={styles.tabIcon} />
        //         }
        //     }
        // }


    })
        
 });


 const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    //Provider containd appNavigation
    <ApolloProvider client={client}>
    
    <AppNavigation />
    
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
    
  },
  tabStyle: {
      
    backgroundColor: "#000000",
    
  },
  },
  
);
