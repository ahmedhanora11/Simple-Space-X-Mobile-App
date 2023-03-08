import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { RocketInventory } from '../components/data/rocketData';
import { imageSelect } from './data/rocketImage';


export type RocketListItemProps = {
  rocketDetails: RocketInventory,
  index: number,
  rocketListLength: number,
  onPress: () => void; 
};

const RocketListItem: React.FC<RocketListItemProps> = (item) => {
  return (
    <TouchableOpacity onPress={item.onPress}> 
      <View style={styles.itemWrapper}>
          <Image source={imageSelect(item.rocketDetails.name)} style={styles.image}/>
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{item.rocketDetails.name}</Text>
            <View style={styles.subtitleWrapper}>
              <View style={styles.locationWrapper}>
                <Image source={require('../images/map.png')} style={styles.locationIcon}/>
                <Text style={styles.location}>{item.rocketDetails.country}</Text>
              </View>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop: 45,
    flexDirection: 'column',
    marginHorizontal: 20,
  },

  image: {
    height: 116.5,
    width: 140,
    borderRadius: 20,
  },

  titlesWrapper: {
    marginTop: 12,
    flexDirection: 'column',
    alignItems: 'center'
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    color: 'white'
  },

  subtitleWrapper: {
    width: 130,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  type: {
    fontSize: 12,
    color: 'gray',
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: 'center',
  },
  locationIcon: {
    width: 11,
    height: 11,
    marginRight: 8,
  },
  location: {
    fontSize: 11,
    color: 'gray',
  },
  
})

export default RocketListItem
