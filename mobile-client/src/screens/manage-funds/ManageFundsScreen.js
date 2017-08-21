import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import {
    Toolbar,
    ListItem
} from 'react-native-material-ui';
import FundsList from '../../../constants/mf_data';

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
                    renderItem={({ item }) => <Text style={styles.fundItem}>{item.name}</Text>}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    separator: {
        height: 1,
        backgroundColor: '#6458A8'
    },
    fundItem: {
        paddingBottom: 25,
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#8679CF',
        
    }
})