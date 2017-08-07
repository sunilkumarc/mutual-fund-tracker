import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {
    getTheme,
} from 'react-native-material-kit';
import axios from 'axios';

const theme = getTheme();

class TrackFundsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tableHead: ['Mutual Fund', 'NAV', '% Change'],
            tableData: []
        };
    }

    async componentDidMount() {
        const storedMFIds = ['14058353.00206600', '14058358.00206600', '14057817.00206600'];
        this.setState({ isLoading: true });

        for (let i = 0; i < storedMFIds.length; ++i) {
            
            const fundId = storedMFIds[i];
            const url = "https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=" + fundId + "&session_token=";
            const { data } = await axios.get(url);
            const length = data['data']['graph'].length;
            const mutualFundName = data['data']['bse_master'][0]['scheme_name'];
            const NAV = data['data']['graph'][length - 1]['y'];

            const todayValue = data['data']['graph'][length - 1]['y'];
            const yesterdayValue = data['data']['graph'][length - 2]['y'];
            const netPercentageChange = ((todayValue - yesterdayValue) / todayValue * 100).toFixed(2);
            let tableData = this.state.tableData;
            tableData.push([mutualFundName, NAV, netPercentageChange]);
            this.setState({ tableData: tableData });
        }
        console.log(this.state.tableData);

        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        style={[styles.centering, { height: 80 }]}
                        size="large" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={theme.cardStyle}>
                    <Table style={styles.fundsTable} borderStyle={{ borderWidth: 0, borderColor: '#454545' }}>
                        <Row data={this.state.tableHead} flexArr={[3, 1, 1]} style={styles.head} textStyle={styles.headText} />
                        <TableWraper style={{ flexDirection: 'row' }}>
                            <Rows data={this.state.tableData} flexArr={[3, 1, 1]} style={styles.row} textStyle={styles.dataText} />
                        </TableWraper>
                    </Table>
                </View>
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
        backgroundColor: '#454545',
    },
    headText: {
        marginLeft: 5,
        color: '#fff',
        textAlign: 'center'
    },
    dataText: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center'
    },
    row: {
        backgroundColor: '#fff'
    }
});

export default TrackFundsScreen;