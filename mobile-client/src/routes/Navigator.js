import { TabNavigator } from 'react-navigation';
import {
    TrackFundsScreen,
    ManageFundsScreen
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
        screen: ManageFundsScreen,
        navigationOptions: {
            title: 'Manage Funds'
        }
    }
}, {
    tabBarOptions: {
        upperCaseLabel: false,
        indicatorStyle: { backgroundColor: '#06D6A0' },
        style: {
            marginTop: Exponent.Constants.statusBarHeight,
            backgroundColor: '#129490',
        }
    }
});

export default MyNavigator;