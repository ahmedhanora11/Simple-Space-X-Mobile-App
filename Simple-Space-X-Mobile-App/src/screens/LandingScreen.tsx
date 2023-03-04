import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'


export const LandingScreen = () => {
    
    return(
        <View style={styles.container}>
            <View style={styles.navigation}>
                
            </View>
            <View style={styles.body}>
                <Image source={require('../images/SpaceX.jpg')} style={styles.spaceX} />
                <Text> Landing Screen </Text>
            </View>
            <View style={styles.footer}>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    navigation: {
        flex: 0,
        backgroundColor: 'black'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    spaceX:{
        width: 340,
        height: 340,
    },

    footer: {
        flex: 1,
        backgroundColor: 'black'
    }
})