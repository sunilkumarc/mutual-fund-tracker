import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
    Toolbar,
    ListItem
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

    onPressItem(item) {
        console.log(item);
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