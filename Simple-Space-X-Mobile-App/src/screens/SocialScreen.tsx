import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, Linking, Alert, Button, TouchableOpacity, ImageBackground} from 'react-native'
import { RootStackParamList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-navigation';
import { color } from 'react-native-reanimated';

export type SocialScreenProps = NativeStackScreenProps<RootStackParamList, 'SocialScreen'>;
const SocialScreen: React.FC<SocialScreenProps> = ( {route, navigation}: SocialScreenProps) => {
    const item = route.params;
     

    const links = [
        {
            id: 1,
            name: 'SpaceX Website',
            image: require('../images/website.png'),
            URL: 'https://www.spacex.com/'
        },
        {
            id: 2,
            name: 'SpaceX Shop     ',
            image: require('../images/shop.png'),
            URL: 'https://shop.spacex.com/'
        },
        {
            id: 3,
            name: 'SpaceX News    ',
            image: require('../images/news.png'),
            URL: 'https://www.spacex.com/updates/'
        },
        {
            id: 4,
            name: 'SpaceX Mission',
            image: require('../images/mission.png'),
            URL: 'https://www.spacex.com/mission/'
        },
    ];

    const oneLink = ({item}) => (
        <View style={styles.item}>
        <View style={styles.iconContainer}>
            <Image source={item.image} style={styles.icon} />
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.button}>
        <Button title="💫Visit💫" onPress={() => {
                    Linking.openURL(item.URL)
                }} color="black" /> 
        </View>
        </View>
        
    )

    const itemSeperator = () => {
        return <View style={styles.seperator} />
    }

    const openUrl = async (URL) => {
        const isSupported = await Linking.canOpenURL(URL);
        if (isSupported) {
            await Linking.openURL(URL);
        } else {
            Alert.alert(`Don't know how to open this url: ${URL}`);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.navigation}>
            
                <Text style={styles.title}> Links 🚀 </Text>
                
            </View>
            <View style={styles.body}>
                <SafeAreaView>
                <FlatList 
                data = {links}
                renderItem = { oneLink }
                ItemSeparatorComponent={itemSeperator}
                />
                </SafeAreaView>
            </View>
            <View style={styles.footer}>
                <Text> Footer </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../images/backw.png')} style={styles.arrowBack}/>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    navigation: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 45,
        
        
    },
    body: {
        flex: 9,
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: 'black',
        
    },
    footer: {
        flex: 1,
        backgroundColor: 'black'
    },
    seperator: {
        height: 1,
        width: '94%',
        backgroundColor: 'white'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        textShadowColor: 'white'
    },
    icon: {
        height: 55,
        width: 55
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 74,
        width: 74,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 20,
        color: 'white'
    },
    button: {
        marginLeft: 8,
        borderRadius: 18,
        borderWidth: 5,
        borderColor: 'black',
        
    },
    arrowBack: {
       
        width: 20,
        height: 20,
        marginLeft: 30,
        marginBottom: 10
    },
})

export default SocialScreen;