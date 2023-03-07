import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'


export const SocialScreen = () => {
    
    return(
        <View style={styles.container}>
            <View style={styles.navigation}>
                <Text> up </Text>
            </View>
            <View style={styles.body}>
                <Text> Social Screen </Text>
            </View>
            <View style={styles.footer}>
                <Text> Footer </Text>
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
        flex: 1,
        backgroundColor: 'red'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})