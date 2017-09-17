import axios from 'axios';

class API {
    async getFundData(fundId) {
        let url = `https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=${fundId}&session_token=`;
        console.log('GET - ', url);
        const { data } = await axios.get(url);
        const length = data['data']['graph'].length;
        const mutualFundName = data['data']['bse_master'][0]['scheme_name'];
        const NAV = data['data']['graph'][length - 1]['y'];
        const amcCode = data['data']['bse_master'][0]['amc_code'];
        const dateTime = data['data']['nav_prices'][0]['datetime'];

        const todayValue = data['data']['graph'][length - 1]['y'];
        const yesterdayValue = data['data']['graph'][length - 2]['y'];
        const netPercentageChange = ((todayValue - yesterdayValue) / todayValue * 100).toFixed(2);
        return [mutualFundName, NAV, netPercentageChange, amcCode, fundId, dateTime];
    }
}

export const FundsAPI = new API();