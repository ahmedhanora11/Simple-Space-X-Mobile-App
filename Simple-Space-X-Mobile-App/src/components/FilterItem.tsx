import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

export interface Filter {
    id: string,
    filterItem: string
};

export interface FilterData {
    filterData: string[];
};

export type FilterItemProps = {
    filterItemData: string
};

const FilterItem: React.FC<FilterItemProps> = (item) => {
    return (
        <View style={styles.filterItemWrapper}>
            <Text>{item.filterItemData}</Text>
        </View> 
    )
};

const styles = StyleSheet.create ({
    filterItemWrapper: {
        width: windowWidth*0.85,
        marginTop: 15,
        alignItems: 'flex-start',
        marginHorizontal: 16,
    },
})

export default FilterItem;