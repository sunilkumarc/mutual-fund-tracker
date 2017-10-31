import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    AsyncStorage, 
    DeviceEventEmitter,
    ScrollView,
    Image,
    Picker,
} from 'react-native';
import { 
    Toolbar, 
    Card 
} from 'react-native-material-ui';
import { FontAwesome } from '@expo/vector-icons';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryPie, VictoryLabel } from "victory-native";
import { WebBrowser } from 'expo';
import { AdMobBanner } from 'react-native-admob';

class FundDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fundData: null
        };
    }

    async loadData() {
        let fundToShow = JSON.parse(await AsyncStorage.getItem('DETAILS_PAGE_MF'));
        this.setState({ fundData: fundToShow });
    }
    
    async componentDidMount() {
        DeviceEventEmitter.addListener('DETAILS_FUND_UPDATED', (e) => {
            this.loadData();
        });

        this.loadData();
    }

    getYearlyReturnsText(fund) {
        if (fund == 0) {
            return ( <Text style={{color: 'green', fontFamily: 'lato_bold', fontSize: 12}}>{fund}%</Text> );
        }

        return ( fund > 0 ?
                    <Text style={{color: 'green', fontFamily: 'lato_bold', fontSize: 12}}>
                        <FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund}%
                    </Text> :
                    <Text style={{color: 'red', fontFamily: 'lato_bold', fontSize: 12}}>
                        <FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund}%
                </Text> );
    }

    handleBrowserOpen = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }

    render() {
        let fund = this.state.fundData;
        if (fund == null) {
            return (
                <View style={styles.container}>
                    <Toolbar centerElement={<Text style={styles.toolbarTitle}>Fund Details</Text>}/>
                </View>
            );
        }
        let imagePath = 'https://coin.zerodha.com/images/fund_houses/' + fund["amcCode"] + '.jpg';
        let fundPecentTag = fund["netPercentageChange"] > 0 
            ?   <Text style={{color: 'green', fontFamily: 'lato_bold', fontSize: 12, lineHeight: 25}}>
                    <FontAwesome name='rupee' size={13} /> {fund["NAV"]}  ( <FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund["netPercentageChange"]}% )
                    <Text style={{ color: 'grey' }}>   as on {fund["dateTime"]}</Text>
                </Text> 
            :   <Text style={{color: 'red', fontFamily: 'lato_bold', fontSize: 12, lineHeight: 25}}>
                    <FontAwesome name='rupee' size={13} /> {fund["NAV"]}  ( <FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund["netPercentageChange"]}% )
                    <Text style={{ color: 'grey' }}>   as on {fund["dateTime"]}</Text>
                </Text>;
        let fundURL = "https://coin.zerodha.com/funds/" + fund["fundId"];
        return (
            <View style={styles.container}>
                <Toolbar
                    centerElement={<Text style={styles.toolbarTitle}>Fund Details</Text>}
                    />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <AdMobBanner
                            bannerSize="banner"
                            addUnitID={`ca-app-pub-9886802792048958/9950438721`}
                            testDeviceID="0856525c0c859633"
                            didFailToReceiveAdWithError={console.log} />

                    <Card style={{ container: styles.detailsCard }}>
                        <View style={styles.detailsContainer}>
                            <View style={styles.imageContainer}>
                                <Image 
                                    style={styles.fundImage}
                                    resizeMode='stretch'
                                    source={{uri: imagePath}}/>
                            </View>
                            <View style={styles.fundName}>
                                <Text style={{ fontFamily: 'lato_bold', fontSize: 15, lineHeight: 25, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>{fund["mutualFundName"]}</Text>
                            </View>
                            <View>
                                {fundPecentTag}
                            </View>
                            <View style={styles.zerodhaView}>
                                <Text style={styles.zerodhaLink} onPress={() => this.handleBrowserOpen(fundURL)}>
                                    View on Zerodha
                                </Text>
                            </View>
                        </View>

                        <View style={styles.yearlyReturnsContainer}>
                            <View style={styles.yearlyReturnsRow}>
                                <View style={styles.yearlyReturnsItems}><Text style={styles.yearlyReturnsItemsHeader}>1 Year</Text></View>
                                <View style={styles.yearlyReturnsItems}><Text>{this.getYearlyReturnsText(fund["oneYearReturns"])}</Text></View>
                            </View>
                            <View style={styles.yearlyReturnsRow}>
                                <View style={styles.yearlyReturnsItems}><Text style={styles.yearlyReturnsItemsHeader}>3 Years</Text></View>
                                <View style={styles.yearlyReturnsItems}><Text>{this.getYearlyReturnsText(fund["threeYearReturns"])}</Text></View>
                            </View>
                            <View style={styles.yearlyReturnsRow}>
                                <View style={styles.yearlyReturnsItems}><Text style={styles.yearlyReturnsItemsHeader}>5 Years</Text></View>
                                <View style={styles.yearlyReturnsItems}><Text>{this.getYearlyReturnsText(fund["fiveYearReturns"])}</Text></View>
                            </View>
                        </View>

                        <View style={styles.otherDetailsContainer}>
                            <View style={styles.otherDetails}>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} Text>Min Investment</Text></View>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Scheme Class</Text></View>
                                </View>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text>{fund["minimumInvestment"]}</Text></View>
                                    <View style={styles.otherDetailsItems}><Text>{fund["schemeClass"]}</Text></View>
                                </View>
                            </View>
                            <View style={styles.otherDetails}>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Manager Name</Text></View>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Launch Date</Text></View>
                                </View>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text>{fund["manager"]}</Text></View>
                                    <View style={styles.otherDetailsItems}><Text>{fund["launchDate"]}</Text></View>
                                </View>
                            </View>
                            <View style={styles.otherDetails}>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Exit Load</Text></View>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Dividend Payout</Text></View>
                                </View>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text>{fund["exitLoad"]}</Text></View>
                                    <View style={styles.otherDetailsItems}><Text>{fund["dividentPayout"]}</Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.graphContainer} pointerEvents="none">
                            <View style={styles.graphHeader}>
                                <Text style={{ fontFamily: 'lato_bold', fontSize: 15 }}>Statistics</Text>
                            </View>
                            <VictoryChart
                                theme={VictoryTheme.material}>
                                <VictoryLine
                                    data={fund["graphData"]}
                                    labels={(datum) => datum.y}
                                    labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                                    style={{ 
                                        data: { stroke: "#187cd0" },
                                        labels: { fontSize: 10 }
                                    }}
                                />
                            </VictoryChart>
                        </View>
                        <AdMobBanner
                            bannerSize="banner"
                            addUnitID="ca-app-pub-9886802792048958/9950438721"
                            testDeviceID="0856525c0c859633"
                            didFailToReceiveAdWithError={console.log} />
                    </Card>
                    <Card style={{ container: styles.card }} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    toolbarTitle: {
        fontFamily: 'lato_bold',
        color: '#FFF',
        fontSize: 20
    },
    graphHeader: {
        marginTop: 20,
        marginLeft: -30,
    },
    detailsCard: {
        flex: 1,
        height: 1000,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    fundName: {
        marginBottom: 5,
    },
    fundImage: {
        height: 100,
        width: 250,
        margin: 2,
    },
    imageContainer: {
        paddingTop: 30,
        paddingBottom: 25,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderColor: '#EEE',
    },
    graphContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingLeft: 30,
        // backgroundColor: '#EEE',
    },
    otherDetails: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 24,
    },
    otherDetailsRow: {
        flexDirection: 'row',
    },
    yearlyReturnsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 90,
        marginRight: 110,
        marginTop: 8,
    },
    otherDetailsItems: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    yearlyReturnsItems: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherDetailsItemsHeader: {
        color: 'grey',
        fontFamily: 'lato_bold',
        fontSize: 12,
        marginBottom: 5,
    },
    yearlyReturnsItemsHeader: {
        color: 'grey',
        fontFamily: 'lato_bold',
        fontSize: 12,
    },
    otherDetailsContainer: {
        borderBottomWidth: 1,
        borderColor: '#EEE',
        paddingBottom: 30,
    },
    yearlyReturnsContainer: {
        borderBottomWidth: 1,
        borderColor: '#EEE',
        paddingBottom: 15,
    },
    zerodhaView: {
        marginBottom: -10,
        marginTop: 10
    },
    zerodhaLink: {
        fontFamily: 'lato_bold',
        color: '#187cd0',
        fontSize: 15,
        textDecorationLine: 'underline',
    }
});

export default FundDetailsScreen;