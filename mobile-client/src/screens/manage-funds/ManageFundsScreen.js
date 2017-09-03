import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    FlatList, 
    ActivityIndicator, 
    TouchableOpacity,
    AsyncStorage,
    Alert,
    ToastAndroid
} from 'react-native';
import {
    Toolbar,
    ListItem,
} from 'react-native-material-ui';
import FundsList from '../../../constants/mf_data';
import { Card } from 'react-native-material-ui';

class ManageFundsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { CurrentFundsList: FundsList.slice(0, 40) };
    }

    filterFunds(value) {
        if (value != "") {
            var str = new RegExp(value, "i");

            var matches = FundsList.filter(function (mf) {
                var res = mf.name.match(str);
                return res;
            });
            this.setState({ CurrentFundsList: matches.slice(0, 20) });
        } else {
            this.setState({ CurrentFundsList: FundsList.slice(0, 40) });
        }
    }

    async onPressItem(item) {
        await Alert.alert(
            'Add this fund?',
            'This fund will be added in your profile. This can be undone later.',
            [
                {text: 'OK', onPress: () => this.addFund(item)},
                {text: 'Cancel', onPress: () => {}},                
            ]
        );
        
    }

    async addFund(item) {
        const storedMFIds = JSON.parse(await AsyncStorage.getItem('mf_ids'));
        await storedMFIds.push(item.key);
        await AsyncStorage.removeItem('mf_ids');
        await AsyncStorage.setItem('mf_ids', JSON.stringify(storedMFIds));
        ToastAndroid.show('Fund is added. Refresh the homescreen to see the changes!', ToastAndroid.LONG);
    }

    fundItem = ({ item }) => {
        // return <Text style={styles.fundItem}>{item.name}</Text>
        return (<TouchableOpacity
                    onPress={() => this.onPressItem(item)}> 
            <Card style={{ container: styles.card }}>
                <Text>{item.name}</Text>
                <Text>({item.desc})</Text>
            </Card>
        </TouchableOpacity>);
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    centerElement="Add Funds"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search Funds',
                        onChangeText: value => this.filterFunds(value),
                    }}
                    onLeftElementPress={() => this.props.navigation.goBack()}
                />
                <FlatList
                    data={this.state.CurrentFundsList}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.fundItem}
                />
            </View>
        );
    }
}
export default ManageFundsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fundItem: {
        paddingBottom: 25,
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#8679CF',
    },
    card: {
        height: 70,
        padding: 10,
        marginTop: 2
    }
})