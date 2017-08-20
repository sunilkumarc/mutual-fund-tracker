import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
    Toolbar,
    ListItem
} from 'react-native-material-ui';
import TempList from '../../../constants/temp';
import FundsList from '../../../constants/mf_data';

class ManageFundsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {CurrentFundsList: FundsList};
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
                    }}
                    onLeftElementPress={() => this.props.navigation.goBack()}
                />
                <FlatList
                    data={this.state.CurrentFundsList}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                />
            </View>
        );
    }
}
export default ManageFundsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})