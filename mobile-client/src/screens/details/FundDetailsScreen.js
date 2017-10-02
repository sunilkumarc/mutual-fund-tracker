import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    AsyncStorage, 
    DeviceEventEmitter,
    ScrollView,
    Image
} from 'react-native';
import { 
    Toolbar, 
    Card 
} from 'react-native-material-ui';
import { FontAwesome } from '@expo/vector-icons';

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
        console.log(fundToShow);
    }
    
    async componentDidMount() {
        DeviceEventEmitter.addListener('DETAILS_FUND_UPDATED', (e) => {
            this.loadData();
        });

        this.loadData();
    }

    render() {
        let fund = this.state.fundData;
        if (fund == null) {
            return (
                <View style={styles.container}>
                    <Toolbar centerElement="Fund Details"/>
                </View>
            );
        }
        let imagePath = 'https://coin.zerodha.com/images/fund_houses/' + fund[3] + '.jpg';
        let fundPecentTag = fund[2] > 0 
            ?   <Text style={{color: 'green', fontFamily: 'lato_bold', fontSize: 12, lineHeight: 25}}>
                    <FontAwesome name='rupee' size={13} /> {fund[1]}  ( <FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund[2]}% )
                    <Text style={{ color: 'grey' }}>   as on {fund[5]}</Text>
                </Text> 
            :   <Text style={{color: 'red', fontFamily: 'lato_bold', fontSize: 12, lineHeight: 25}}>
                    <FontAwesome name='rupee' size={13} /> {fund[1]}  ( <FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund[2]}% )
                    <Text style={{ color: 'grey' }}>   as on {fund[5]}</Text>
                </Text>;
        return (
            <View style={styles.container}>
                <Toolbar centerElement="Fund Details"/>
                <ScrollView>
                    <Card style={{ container: styles.detailsCard }}>
                        <View style={styles.detailsContainer}>
                            <View style={styles.imageContainer}>
                                <Image 
                                    style={styles.fundImage}
                                    resizeMode='stretch'
                                    source={{uri: imagePath}}/>
                            </View>
                            <View style={styles.fundName}>
                                <Text style={{ fontFamily: 'lato_bold', fontSize: 15, lineHeight: 25, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>{fund[0]}</Text>
                            </View>
                            <View>
                                {fundPecentTag}
                            </View>
                        </View>

                        <View style={styles.otherDetailsContainer}>
                            <View style={styles.otherDetails}>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} Text>Min Investment</Text></View>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Scheme Class</Text></View>
                                </View>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text>{fund[6]}</Text></View>
                                    <View style={styles.otherDetailsItems}><Text>{fund[7]}</Text></View>
                                </View>
                            </View>
                            <View style={styles.otherDetails}>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Manager Name</Text></View>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Launch Date</Text></View>
                                </View>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text>{fund[8]}</Text></View>
                                    <View style={styles.otherDetailsItems}><Text>{fund[9]}</Text></View>
                                </View>
                            </View>
                            <View style={styles.otherDetails}>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Exit Load</Text></View>
                                    <View style={styles.otherDetailsItems}><Text style={styles.otherDetailsItemsHeader} >Dividend Payout</Text></View>
                                </View>
                                <View style={styles.otherDetailsRow}>
                                    <View style={styles.otherDetailsItems}><Text>{fund[10]} %</Text></View>
                                    <View style={styles.otherDetailsItems}><Text>{fund[11]} %</Text></View>
                                </View>
                            </View>
                        </View>
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
    detailsCard: {
        flex: 1,
        height: 900,
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
        margin: 2
    },
    imageContainer: {
        paddingTop: 30,
        paddingBottom: 25
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderColor: '#EEE'
    },
    otherDetails: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 24
    },
    otherDetailsRow: {
        flexDirection: 'row'
    },
    otherDetailsItems: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherDetailsItemsHeader: {
        color: 'grey',
        fontFamily: 'lato_bold',
        fontSize: 12,
        marginBottom: 5
    },
    otherDetailsContainer: {
        borderBottomWidth: 1,
        borderColor: '#EEE',
        paddingBottom: 30,
        // backgroundColor: '#E7DEEC'
    }
});

export default FundDetailsScreen;