
import React ,{} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native'; 


import { imageSelect } from '../images/rocketImage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ( {route, navigation}: DetailsScreenProps) => {
    const item = route.params;

    const upperBackground =
        <ImageBackground source={imageSelect(item.rocketDetails.name)} style={styles.backgroundImage}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/images/left-arrow.png')} style={styles.arrowBack}/>
            </TouchableOpacity>
        </ImageBackground>

    const rocketSatus = 
        <View style={[styles.rocketStatus, item.rocketDetails.active ? styles.rocketActiveStatus : styles.rocketInactiveStatus]}>  
            {item.rocketDetails.active ? 
            <Text style={styles.rocketActiveText}>
                active
            </Text> : 
            <Text style={styles.rocketInactiveText}>
                inactive
            </Text>}
        </View>; 
    
    const lowerTopDetails = 
        <View style={styles.titlesWrapper}>
            <View style={styles.bigTitlesWrapper}>
                <Text style={styles.rocketTitle}>{item.rocketDetails.name}</Text>
                {rocketSatus}
            </View>
            <View style={styles.subTitlesWrapper}>
                <View style={styles.rocketSubtitleWrapper}>
                    <Image source={require('../assets/images/rocket.png')} style={styles.icon}/>
                    <Text style={styles.rocketSubtitle}>{item.rocketDetails.type}</Text>
                </View>
                <View style={styles.rocketCountrySubtitleWrapper}>
                    <Image source={require('../assets/images/map-black.png')} style={styles.icon}/>
                    <Text style={styles.rocketSubtitle}>{item.rocketDetails.country}</Text>
                </View>
            </View>
        </View>

    const lowerBottomDetails =
        <View style={styles.infoWrapper}>
            <View style={styles.rocketDescriptionWrapper}>
                <Text style={styles.infoTitle}>DESCRIPTION</Text>
                <Text style={styles.rocketDescription}>{item.rocketDetails.description}</Text>
            </View>

            <View style={styles.horiInfo}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>HEIGHT</Text>
                    <Text style={styles.infoText}>{item.rocketDetails.height.meters} m</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>DIAMETER</Text>
                    <Text style={styles.infoText}>{item.rocketDetails.diameter.meters} m</Text>
                </View>                
            </View>

            <View style={styles.horiInfo}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>MASS</Text>
                    <Text style={styles.infoText}>{item.rocketDetails.mass.kg} kg</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>SUCCESS PCT</Text>
                    <Text style={styles.infoText}>{item.rocketDetails.success_rate_pct} %</Text>
                </View>                
            </View>
        </View>
    
    const lowerDetails =
        <View style={styles.infoWrapper}>
            {lowerTopDetails}
            {lowerBottomDetails}
        </View>

    return (  
        <View style={styles.container}>
            {/* Upper background */}
            {upperBackground}

            {/* Lower details */}
            {lowerDetails}
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    // Upper part image background
    backgroundImage: {
        height: windowHeight * 0.5,
        justifyContent: 'space-between',
    },
    arrowBack: {
        width: 20,
        height: 20,
        marginLeft: 20,
        marginTop: 60,
    },

    // Lower part detail descriptions
    titlesWrapper: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    bigTitlesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rocketStatus: {
        paddingVertical: 7,
        paddingHorizontal: 15, 
        borderWidth: 1,
        borderRadius: 35,
    },
    rocketStatusText: {
        fontSize: 11,
    },
    rocketActiveStatus: {
        borderColor: '#1AA65A',
    },
    rocketActiveText: {
        color: '#1AA65A',
    },
    rocketInactiveStatus: {
        borderColor: '#E74B1A',
    },
    rocketInactiveText: {
        color: '#E74B1A',
    },
    rocketTitle: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
    },
    subTitlesWrapper: {
        flexDirection: 'row',
    },
    rocketSubtitleWrapper: {
        flexDirection: 'row',
        marginTop: 15, 
        alignItems: 'center',
    },
    rocketCountrySubtitleWrapper: {
        flexDirection: 'row',
        marginTop: 15, 
        marginLeft: 20, 
        alignItems: 'center',
    },
    rocketSubtitle: {
        fontSize: 13,
        color: 'black',
        marginLeft: 8, 
        alignItems: 'center',
    },
    icon: {
        width: 12,
        height: 12,
    },
    infoWrapper: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: -20,
        borderRadius: 25,
        paddingTop: 10,
    },
    rocketDescriptionWrapper: {
        marginTop: 25, 
        marginHorizontal: 20,
    },
    rocketDescription: {
        fontSize: 13,
        color: 'gray',
        marginTop: 5, 
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    horiInfo: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 20,
    },
    infoItem: {
        width: windowWidth * 0.5
    },
    infoText: {
        fontSize: 16,
        marginTop: 5,
    },
});
 
export default DetailsScreen;