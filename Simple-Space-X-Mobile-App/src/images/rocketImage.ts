import { ImageSourcePropType } from "react-native";

export const imageSelect = (network: string) => {
  const networkArray: Record<string, ImageSourcePropType>  = {
    'Falcon 1': rocketImage.image['Falcon 1'],
    'Falcon 9': rocketImage.image['Falcon 9'],
    'Falcon Heavy': rocketImage.image['Falcon Heavy'],
    'Starship': rocketImage.image['Starship']
  };

  return networkArray[network];
};

export const rocketImage = {
  image: {
    "Falcon 1": require('../images/rocket1.png'),
    "Falcon 9": require('../images/rocket2.png'),
    "Falcon Heavy": require('../images/rocket3.png'),
    "Starship": require('../images/rocket4.png')
  }
}
