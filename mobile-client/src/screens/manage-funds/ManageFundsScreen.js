import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
    Toolbar,
    ListItem
} from 'react-native-material-ui';

class ManageFundsScreen extends Component {

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
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <ListItem divider centerElement="Test" />
                    <ListItem divider centerElement="Test" />
                    <ListItem divider centerElement="Test" />
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