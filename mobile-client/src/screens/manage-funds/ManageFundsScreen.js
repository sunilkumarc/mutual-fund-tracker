import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
    Toolbar,
    ListItem
} from 'react-native-material-ui';
import TempList from '../../../constants/temp';

class ManageFundsScreen extends Component {

    render() {
        let funds = TempList.map((fund) => {
            return <ListItem divider centerElement={fund.name} key={fund.code}/>
        });

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
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {funds}
                </ScrollView>
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