import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

class TrackFundsScreen extends Component {

    render() {
        const tableHead = ['Mutual Fund', 'Current NAV', 'Percentage Change'];
        const tableData = [
            ['DSP BlackRock Tax Saver Fund - Direct Plan - Growth', '2', '3'],
        ];

        return (
            <View style={styles.container}>
                <Table style={styles.fundsTable}>
                    <Row data={tableHead} flexArr={[2, 1, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWraper style={{ flexDirection: 'row' }}>
                        <Rows data={tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWraper>
                </Table>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
    },
    fundsTable: {
        marginTop: 5
    },
    head: {
        height: 40,
        backgroundColor: '#fff'
    },
    text: {
        marginLeft: 5
    },
    row: {
        backgroundColor: '#fff'
    }
});

export default TrackFundsScreen;