import { RocketInventory } from '../components/data/rocketData';

export type RootStackParamList = {
    Home: undefined;
    DetailsScreen: {
        rocketDetails: RocketInventory,
        index: number
    };
};