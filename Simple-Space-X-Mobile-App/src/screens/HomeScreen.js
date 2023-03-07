import React ,{ Component } from 'react'

import { Platform, StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, } from 'react-native'
import { ApolloClient, InMemoryCache, graphql, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import { color } from 'react-native-reanimated';
import { gql } from 'graphql-tag';
import { RocketRenderItem } from '../components/RocketRenderItem';

//apollo
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://spacex-production.up.railway.app/',
    }),
    cache: new InMemoryCache(),
  });

//RocketQuery

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

class HomeScreen extends Component {

    render(){

        console.log(this.props)
        const { rockets, refetch, loading } = this.props.data

        if (loading) {
            return (
                <ActivityIndicator style = { styles.activityIndicator }/>
            )
        } else {


    return (
       
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text> up </Text>
                </View>
                <ApolloProvider client={client}>
                <View style={styles.search}>
                    <TextInput 
                    style = { styles.searchBox }
                    placeholder='Search here'
                    onChangeText={rocket => refetch({ rocketName: rocket.length > 0 ? rocket : " " })}
                    />
                </View>
                </ApolloProvider>

                <FlatList 
                        data={rockets}
                        renderItem={({ item }) => RocketRenderItem(item)}
                        keyExtractor={this.keyExtractor}
                        ListEmptyComponent={<View><Text>No Rockets with this name</Text></View>}
                />

                <View style={styles.body}>
                    <Text> Home Screen </Text>
                </View>

            </View>
      
         )
        }
    }

keyExtractor = item => item.id

}



const RocketQueryExecutor = graphql(RocketQuery, {
    options: props => ({
        variables: { rocketName: props.rocket }
    })
})

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black'
        
    },
    navigation: {
        flex: 0.5,
        backgroundColor: 'black'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    search: {
        flex: 0.90,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    searchBox: {
        width: '96%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        // marginLeft: 8,
        marginTop: 4,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
    }
})

HomeScreen = (RocketQueryExecutor)(HomeScreen)
export default HomeScreen