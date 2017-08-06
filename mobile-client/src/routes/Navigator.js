import { TabNavigator } from 'react-navigation';
import {
    TrackFundsScreen,
    AddFundsScreen
} from '../screens';
import Exponent from 'expo';

const MyNavigator = TabNavigator({
    Track: {
        screen: TrackFundsScreen,
        navigationOptions: {
            title: 'Track Funds'
        }
    },
    Manage: {
        screen: AddFundsScreen,
        navigationOptions: {
            title: 'Manage Funds'
        }
    }
}, {
    tabBarOptions: {
        upperCaseLabel: false,
        style: {
            marginTop: Exponent.Constants.statusBarHeight,
            backgroundColor: '#3F7289',
        }
    }
});

export default MyNavigator;