import { RocketInventory } from '../components/data/rocketData';
import { useContext } from "react";
import { NavigationScreenProp, NavigationRoute, NavigationContext, NavigationParams} from 'react-navigation';

export type RootStackParamList = {
    SocialScreen: undefined;
    HomeScreen: undefined;
    DetailsScreen: {
        rocketDetails: RocketInventory,
        index: number
    };
};

export function useNavigation(){

    return useContext(NavigationContext) as NavigationScreenProp<NavigationRoute, NavigationParams>
}
