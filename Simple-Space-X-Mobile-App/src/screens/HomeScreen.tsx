import React ,{ Component, useCallback, useRef, useMemo, useState } from 'react'

import { Platform, StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator,
Dimensions, Image, TouchableOpacity, ListRenderItem, SafeAreaView, Alert } from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';

import { gql } from 'graphql-tag';

import { createAppContainer } from 'react-navigation';


import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { RocketInventoryData, RocketInventory } from '../components/data/rocketData';
import { BottomSheetModal, BottomSheetModalProvider, WINDOW_HEIGHT, } from '@gorhom/bottom-sheet';
import PopUpWelcome from '../components/PopUpWelcome';

//apollo client
import  client from '../services/spaceX_client';
//RocketQuery
import  RocketQuery from '../services/spaceX_Service';
//
import RocketListItem from '../components/RocketListItem';
// Filters
import FilterItem from '../components/FilterItem';
import filterData from '../components/data/filterData';
import { FilterData } from '../components/data/filterData';




const windowWidth = Dimensions.get('window').width;

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
    const { loading, data } = useQuery<RocketInventoryData>(RocketQuery);
    
    const [rocketData, setRocketData] = useState<RocketInventoryData>();
    const [searchText, setSearchText] = useState<string>();
    //search
    const [filteredRocketData, setFilteredRocketData] = useState<RocketInventory[]>();
    //location filter
    const [locationFilterData, setLocationFilterData] = useState<string[]>();
    
    // search function
    const searchFilterFunction = (searchText: string) => {
        setRocketData(data)
        setSearchText(searchText) 
        let filteredData = rocketData?.rockets.filter(function (item) {
            return item.name.includes(searchText) || item.country.includes(searchText);
        }); 

        setFilteredRocketData(filteredData);  
    };

    
    
    // render rocket list items
    const renderRocketListItem: ListRenderItem<RocketInventory> = ({ item, index }) => (
        <RocketListItem 
            rocketDetails={item}
            index={index}
            rocketListLength={searchText && filteredRocketData ? filteredRocketData.length : (data==null ? 0 : data.rockets.length)}
            onPress={() => 
                navigation.navigate('DetailsScreen', {
                    rocketDetails: item,
                    index: index
                })
            }
        />
    );
    
    //location filter
    const renderFilterItem: ListRenderItem<FilterData> = ({item}) => (
        <TouchableOpacity onPress={handlePresentModalPress}>    
            <View style={styles.filterLocationWrapper}>
                <Text style={styles.filterLocation}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )

    // render location filter options
    const renderLocationFilter: ListRenderItem<string> = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => searchFilterFunction(item)}>    
                <FilterItem  
                    filterItemData={item}
                />
            </TouchableOpacity>
           <View style={styles.bottomViewDivider} />
        </View>
    );
    
    // rocket filter by location
    const getFilterLocation = () => {
        let filterLocations: string[] = [] 
        if (data != null) {
            for (let i = 0; i < data.rockets.length; i++) { 
                if (!filterLocations.includes(data.rockets[i].country)) {
                    filterLocations.push(data.rockets[i].country)
                }
            }
        }
        setLocationFilterData(filterLocations);
    }

    // loading 
    if (loading) return <ActivityIndicator style={styles.loading}/>

    // bottom sheet modal
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25', '40%'], []);

    const handlePresentModalPress = useCallback(() => {
        getFilterLocation();
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    
    
    const rocketsList = 
        <FlatList
            // search with space among it
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            data={filteredRocketData && (searchText!=null && searchText.length > 0) ? filteredRocketData : data?.rockets}
            // list of rockets
            renderItem={renderRocketListItem}
            keyExtractor={item => item.name}
            style={styles.flatListView}

        ListHeaderComponent = {
            <>
            
            <View style={styles.titleWrapper}>
                <Text style={styles.largeTitle}>SpaceX Rockets</Text>
            </View>
            

            <View style={styles.divider} />
            
            <View style={styles.searchWrapper}>
                <View style={styles.input}>
                    <Image source={require('../images/search.png')} style={styles.searchIcon}/>
                    <TextInput
                        onChangeText={text => searchFilterFunction(text)}
                        value={searchText}
                        placeholder="Search here"
                        style={styles.textInput}
                    />
                </View> 
                <View style={styles.filterWrapper}>
                    <FlatList
                        horizontal
                        data={filterData}
                        renderItem={renderFilterItem}
                        keyExtractor={item => item.id}
                        style={styles.horiFlatListView}
                    />
                </View>
                
            </View>  
            
            </>
        }
    />
    //floating button
    const clickHandler = () => {
        navigation.navigate('SocialScreen')
    }
       
    return (  
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <SafeAreaView>
                    {rocketsList}
                    <PopUpWelcome />
                </SafeAreaView>
                <View>
                {/* floating button */}
            <TouchableOpacity style={styles.TO} onPress={clickHandler}>
                    <Image style={styles.floatingButton}
                    source={{uri: 'https://i.ibb.co/55d6dF0/social.png'}}
                    />
                </TouchableOpacity>
            </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                    >
                    <View style={styles.bottomSheetContainer}>
                        <Text style={styles.bottomViewLargeTitle}>Filter by location</Text>
                        <FlatList
                            data={locationFilterData}
                            renderItem={renderLocationFilter}
                            keyExtractor={(item) => item}
                            showsHorizontalScrollIndicator={false}
                            style={styles.bottomSheetFlatListView}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>



    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        color: 'white',
        backgroundColor: 'black'
    },

    tabIcon: {
        width: 30,
        height: 30,
        
      },
      tabStyle: {
          
        backgroundColor: "#000000",
        
      },

    

    // loading
    loading: {
        color: "white",
        marginTop: 400,
        justifyContent: 'space-around',
    },

    // header
    titleWrapper: {
        marginTop: 36,
        paddingHorizontal: 16,
    },
    largeTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: 'white',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 16,
        
    },

    // search 
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flexDirection: 'row',
        marginTop: 23,
        marginLeft: 20,
        paddingVertical: 8,
        paddingHorizontal: 15, 
        borderRadius: 60,
        backgroundColor: 'white',
        width: windowWidth*0.70,
        height: WINDOW_HEIGHT*0.05,
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 12,
        width: windowWidth*0.4,
    },
    searchIcon: {
        width: 14,
        height: 14,
    },
    horiFlatListView: {
        width: windowWidth*0.4,
    },
    // filter
    filterWrapper: {
        marginTop: 24,
    },
    filterLocationWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 10, 
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 60,
        alignItems: 'center',
    },
    filterLocation: {
        fontSize: 12,
        color: 'white',
    },

    // rocket list
    flatListView: {
        height: '100%',
    },

    // filter options
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
    },    
    // memo sheet
    bottomSheet: {
        shadowColor: "white",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 20,
      },
    bottomViewLargeTitle: {
        width: windowWidth*0.5,
        alignItems: 'flex-start',
        marginTop: 15,
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomSheetFlatListView: {
        flexDirection: 'column',
        marginTop: 15,
        width: windowWidth*1,
    },
    bottomViewDivider: {
        height: StyleSheet.hairlineWidth,
        width: windowWidth * 0.9,
        backgroundColor: 'gray',
        marginHorizontal: 16,
        marginTop: 18,
    },
    
    //
    errorMessage: {
        width: windowWidth*0.5
    },

    // floating button TO
    TO: {
        position: 'absolute',
        width: 50,
        height: 50,
        right: 24,
        bottom: 30,
        elevation: 10
    },

    // floating button image
    floatingButton: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    },
})




export default HomeScreen