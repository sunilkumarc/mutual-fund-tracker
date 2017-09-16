import React, { Component } from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Platform,
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {
    Table,
    TableWraper,
    Row,
    Rows,
    Col,
    Cols,
    Cell
} from 'react-native-table-component';
import {
    getTheme,
} from 'react-native-material-kit';
import axios from 'axios';
import styled from 'styled-components/native';
import { Toolbar, COLOR, ThemeProvider, Card, Button, ActionButton } from 'react-native-material-ui';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FundsAPI } from '../../../constants/api';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

const theme = getTheme();

class TrackFundsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tableData: []
        };
    }

    async loadData() {
        this.setState({ isLoading: true, tableData: [] });
        const storedFundsData = JSON.parse(await AsyncStorage.getItem('MF_DATA'));

        if (storedFundsData != null) {
            this.setState({ tableData: storedFundsData });
        }

        this.setState({ isLoading: false });
    }

    async componentDidMount() {
        DeviceEventEmitter.addListener('FundAddedEvent', (e) => {
            this.loadData();
        });

        this.loadData();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Toolbar
                        rightElement="add-circle-outline"
                        centerElement="Mutual Funds"
                        onRightElementPress={() => this.props.navigation.navigate('Manage')}
                    />
                    <ActivityIndicator
                        style={[styles.centering, { height: 500 }]}
                        size="large" />
                </View>
            );
        }
        let cards = this.state.tableData.map((fund) => {
            let imagePath = 'https://coin.zerodha.com/images/fund_houses/' + fund[3] + '.jpg';
            let fundPecentTag = fund[2] > 0 
                                        ? <Text style={{color: 'green', fontWeight: 'bold'}}><FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund[2]}%</Text> 
                                        : <Text style={{color: 'red', fontWeight: 'bold'}}><FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund[2]}%</Text>;
            return <Card
                        onPress={() => {}}
                        tyle={{ container: styles.card }} key={fund[0]}>
                        <View style={styles.cardMain}>
                            <View style={styles.cardImage}>
                                <Image 
                                    style={{height: 60, margin: 2}}
                                    resizeMode='stretch'
                                    source={{uri: imagePath}}/>
                            </View>
                            <View style={styles.cardContent}>
                                <View style={styles.fundName}>
                                    <Text style={{ fontFamily: 'roboto', fontSize: 12, lineHeight: 22 }}>{fund[0]}</Text>
                                </View>
                                <View style={styles.fundDesc}>
                                    <View style={styles.fundNAV}>
                                        <Text><FontAwesome name='rupee' size={13} /> {fund[1]}</Text>
                                    </View>
                                    <View style={styles.fundPercent}>
                                        {fundPecentTag}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Card>;
        });
        return (
            <View style={styles.container}>
                <Toolbar
                    rightElement="add-circle-outline"
                    centerElement="Mutual Funds"
                    onRightElementPress={() => this.props.navigation.navigate('Manage')}
                />
                <ScrollView 
                    showsVerticalScrollIndicator={false}>
                    <View>
                        {cards}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbarTitle: {
        fontFamily: 'roboto'
    },
    cardMain: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    cardImage: {
        flex: 0.4,
        height: 94, 
        justifyContent: 'center',
        borderRightColor: '#D3D3D3', 
        borderRightWidth: 1,
        paddingRight: 4
    },
    cardContent: {
        flex: 0.6, 
        marginLeft: 5
    },
    fundNAV: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRightColor: '#D3D3D3', 
        borderRightWidth: 1,
    },
    fundPercent: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    fundName: {
        flex: 0.7,
        borderBottomColor: '#D3D3D3', 
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderColor: '#000',
        padding: 5,
    },
    fundDesc: {
        flex: 0.3,
        flexDirection: 'row',
        borderColor: '#000'
    },
    card: {
        height: 120,
        padding: 5,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
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

const FlexContainer = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    alignSelf: stretch;
`;

export default TrackFundsScreen;