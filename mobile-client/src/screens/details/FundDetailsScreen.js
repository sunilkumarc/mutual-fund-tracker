import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

class FundDetailsScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    centerElement="Details"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    }
});

export default FundDetailsScreen;