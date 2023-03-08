import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import { RootStackParamList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SocialScreenProps = NativeStackScreenProps<RootStackParamList, 'SocialScreen'>;
const SocialScreen: React.FC<SocialScreenProps> = ( {route}: SocialScreenProps) => {
    const item = route.params;

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
        backgroundColor: 'green'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

export default SocialScreen;