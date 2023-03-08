import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import React from 'react';
import HomeScreen  from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SocialScreen  from './src/screens/SocialScreen';
// import { LandingScreen } from './src/screens/LandingScreen';
//
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ApolloClient, gql, InMemoryCache, ApolloProvider, HttpLink, useLazyQuery } from '@apollo/client';
// Apollo client from services
import client from './src/services/spaceX_client';
// Rockets Query from services
import RocketQuery from './src/services/spaceX_Service';
//
import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './src/utils/types';


const Stack = createNativeStackNavigator<RootStackParamList>();



export default function App() {
  return (
    //Provider by Apollo
    
    <ApolloProvider client={client}>
      
    <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} /> */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown: false}} />
          <Stack.Screen name="SocialScreen" component={SocialScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      
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
