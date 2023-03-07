import React ,{ Component, useCallback, useRef, useMemo, useState } from 'react'

import { Platform, StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator,
Dimensions, Image, TouchableOpacity, ListRenderItem } from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import { color } from 'react-native-reanimated';
import { gql } from 'graphql-tag';

import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { RocketInventoryData, RocketInventory } from '../components/data/rocketData';

//apollo client
import  client from '../services/spaceX_client';
//RocketQuery
import  RocketQuery from '../services/spaceX_Service';

const windowWidth = Dimensions.get('window').width;

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
    const { loading, data, error } = useQuery<RocketInventoryData>(RocketQuery);
    
    const [rocketData, setRocketData] = useState<RocketInventoryData>();
    const [searchText, setSearchText] = useState<string>();
    const [filteredRocketData, setFilteredRocketData] = useState<RocketInventory[]>();
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
                navigation.navigate('Details', {
                    rocketDetails: item,
                    index: index
                })
            }
        />
    );
    
    const renderFilterItem: ListRenderItem<FilterData> = ({item}) => (
        <TouchableOpacity onPress={handlePresentModalPress}>    
            <View style={styles.filterLocationWrapper}>
                <Text style={styles.filterLocation}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )

    // render bottom modal filter options
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
    
    // get all location of rockets data
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

    // bottom sheet modal
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25', '30%'], []);

    const handlePresentModalPress = useCallback(() => {
        getFilterLocation();
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // loading data
    if (loading) return <ActivityIndicator style={styles.loading}/>
    
    // handling errors
    // if (error) return <View style={styles.errorMessage}><Text>{error}</Text></View>
    
    const rocketsList = 
        <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            data={filteredRocketData && (searchText!=null && searchText.length > 0) ? filteredRocketData : data?.rockets}
            renderItem={renderRocketListItem}
            keyExtractor={item => item.name}
            style={styles.flatListView}

        ListHeaderComponent = {
            <>
            <View style={styles.titleWrapper}>
                <Text style={styles.largeTitle}>Rockets</Text>
            </View>

            <View style={styles.divider} />
            
            <View style={styles.searchWrapper}>
                <View style={styles.input}>
                    <Image source={require('../assets/images/search.png')} style={styles.searchIcon}/>
                    <TextInput
                        onChangeText={text => searchFilterFunction(text)}
                        value={searchText}
                        placeholder="search rockets"
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

    return (  
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <SafeAreaView>
                    {rocketsList}
                    <WelcomePopUp />
                </SafeAreaView>
        
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                    >
                    <View style={styles.bottomSheetContainer}>
                        <Text style={styles.bottomViewLargeTitle}>Location</Text>
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
    },

    // loading
    loading: {
        color: "#0000ff",
        marginTop: 400,
        justifyContent: 'space-around',
    },

    // header
    titleWrapper: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    largeTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'gray',
        marginHorizontal: 16,
        marginTop: 16,
    },

    // search and filter
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        paddingVertical: 8,
        paddingHorizontal: 15, 
        borderRadius: 60,
        backgroundColor: '#E5E5E5',
        width: windowWidth*0.55,
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 12,
        width: windowWidth*0.4,
    },
    searchIcon: {
        width: 12,
        height: 12,
    },
    horiFlatListView: {
        width: windowWidth*0.35,
    },
    filterWrapper: {
        marginTop: 20,
    },
    filterLocationWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 10, 
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 60,
        alignItems: 'center',
    },
    filterLocation: {
        fontSize: 12,
        color: 'black',
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
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    bottomViewLargeTitle: {
        width: windowWidth*0.9,
        alignItems: 'flex-start',
        marginTop: 15,
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomSheetFlatListView: {
        flexDirection: 'column',
        marginTop: 15,
    },
    bottomViewDivider: {
        height: StyleSheet.hairlineWidth,
        width: windowWidth * 0.9,
        backgroundColor: 'gray',
        marginHorizontal: 16,
        marginTop: 15,
    },
    
    errorMessage: {
        width: windowWidth*0.5
    }
})


export default HomeScreen