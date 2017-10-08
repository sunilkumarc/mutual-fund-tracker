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

        const manager = data['data']['master'][0]['manager'];
        const schemeClass = data['data']['master'][0]['scheme_class'];
        let minimumInvestment = parseFloat(data['data']['bse_master'][0]['min_purchase_amt']);
        minimumInvestment = Math.round(minimumInvestment * 100) / 100;
        const launchDate = data['data']['master'][0]['launch_date'];
        let exitLoad = data['data']['master'][0]['exit_load'];
        if (exitLoad != 'Nil') {
            exitLoad += " %";
        }
        let dividentPayout = parseFloat(data['data']['master'][0]['dividend_percentage']);
        if (dividentPayout == "")
            dividentPayout = "N/A";
        else {
            dividentPayout = Math.round(dividentPayout * 100) / 100 + "%";
        }
        let oneYearReturns = data['data']['nav_prices'][0]['year_per'];
        oneYearReturns = Math.round(oneYearReturns * 100) / 100;
        
        let threeYearReturns = data['data']['nav_prices'][0]['three_year_comp_per'];
        threeYearReturns = Math.round(threeYearReturns * 100) / 100;

        let fiveYearReturns = data['data']['nav_prices'][0]['five_year_comp_per'];
        fiveYearReturns = Math.round(fiveYearReturns * 100) / 100;

        return [mutualFundName, NAV, netPercentageChange, amcCode, fundId, dateTime, minimumInvestment, schemeClass, manager, launchDate, exitLoad, dividentPayout, oneYearReturns, threeYearReturns, fiveYearReturns];
    }
}

export const FundsAPI = new API();