import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    AsyncStorage, 
    DeviceEventEmitter 
} from 'react-native';
import { 
    Toolbar, 
    Card 
} from 'react-native-material-ui';

class FundDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fundData: {}
        };
    }

    async loadData() {
        let fundToShow = JSON.parse(await AsyncStorage.getItem('DETAILS_PAGE_MF'));
        this.setState({ fundData: fundToShow });
    }
    
    async componentDidMount() {
        DeviceEventEmitter.addListener('DETAILS_FUND_UPDATED', (e) => {
            this.loadData();
        });

        this.loadData();
    }

    render() {
        let fund = this.state.fundData;
        return (
            <View style={styles.container}>
                <Toolbar centerElement="Fund Details"/>
                <Card style={{ container: styles.card }} />
                <Card style={{ container: styles.card }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    card: {
        height: 300,
        paddingLeft: 0,
        paddingRight: 0,
    }
});

export default FundDetailsScreen;