import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ImageBackground, Alert } from 'react-native';
import { Dimensions } from 'react-native'; 




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PopUpWelcome: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(true);

    return (
      <View style={styles.centeredView}>
        <Modal
        // animation type
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
            <View style={styles.centeredView}>
                <ImageBackground source={require('../images/welcomeImage.jpg')} style={styles.backgroundImage}>
                    <View style={styles.welcomeTextWrapper}>
                        <Text style={styles.modalTitle}>Welcome</Text>
                        <Text style={styles.modalText}>Welcome, thanks for using this SpaceX app, we hope you have a pleasant experience using our app</Text>
                    </View>
                    <Pressable
                        style={[styles.buttonStart]}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                          Alert.alert('Thanks, now you can start your journey!');
                        }  
                        }
                    >
                        <Text style={styles.buttonStartText}> Start Here </Text>
                    </Pressable>
                </ImageBackground>  
            </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    // view styles
    centeredView: {
      
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4
      },

      // BG Styles
      backgroundImage: {
        borderColor: 'white',
        borderWidth: 1,
        overflow: 'hidden',
        width: windowWidth*0.86,
        height: windowHeight*0.5,
        backgroundColor: "black",
        alignItems: "center",
        borderRadius: 50,
        elevation: 20,
        
      },

      // Welcome Styles
      welcomeTextWrapper: {
        
        marginRight: windowWidth*0.16,
      },
      
      // Button Styles
      buttonStart: {
        marginTop: 110,
        marginHorizontal: 15,
        width: windowWidth*0.40,
        borderRadius: 45,
        borderWidth: 2.3,
        borderColor: 'white',
        padding: 10,
        paddingVertical: 11,
        elevation: 2,
        alignItems: 'center',
      },
      buttonStartText: {
          fontSize: 14,
          textAlign: 'center',
          color: 'white',
      },

      // Modal Styles

      modalTitle: {
        fontSize: 30,
        color: 'white',
        marginTop: 55,
        marginHorizontal: 20,
      },
      modalText: {
        fontSize: 12,
        color: 'white',
        marginTop: 20,
        marginHorizontal: 22,
      }
  });
  
  export default PopUpWelcome;