import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image,
} from 'react-native';

const RocketRenderItem = (item) => {
    return (
        <View style = { styles.container }>
            <Image style={ styles.imageView } source = { { uri : item.image.length > 0 ? item.image : 'https://dummyimage.com/300' }  } />
            <Text style = { styles.rocketName } > { item.name }  </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageView: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    rocketName: {
        marginLeft: 12,
        fontSize: 16,
    }

})

export { RocketRenderItem };