import axios from 'axios';
import createRestApiClient from '../../utils/createRestApiClient';


const apiEndpoint = 'https://poloniex.com/public/';

const myTransformResponse = (pair, allData) => {
    let data = allData[pair];
    return {exchange: 'Poloniex', last: parseFloat(data.last), ask: parseFloat(data.lowestAsk), bid:parseFloat(data.highestBid)};
}

export class PoloniexFetcher {
    constructor() {
        this.client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    }

    getBtcEth() {
        return this.client.request({
            method: 'GET',
            params: {command: 'returnTicker'},
            transformResponse: [].concat(
                axios.defaults.transformResponse,
                myTransformResponse.bind(this, 'BTC_ETH'),
            ),

        });
    }
};