import { ImageSourcePropType } from "react-native";

export const imageSelect = (network: string) => {
  const networkArray: Record<string, ImageSourcePropType>  = {
    'Falcon 9': rocketImage.image['Falcon 9'],
    'Falcon 1': rocketImage.image['Falcon 1'],
    'Falcon Heavy': rocketImage.image['Falcon Heavy'],
    'Starship': rocketImage.image['Starship'],

  };
  return networkArray[network];
};

export const rocketImage = {
  image: {
    "Falcon 1": require('../../images/Falcon1.jpg'),
    "Falcon 9": require('../../images/Falcon9.jpg'),
    "Falcon Heavy": require('../../images/FalconH.png'),
    "Starship": require('../../images/Starship.png')
  }
}
