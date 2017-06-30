import axios from 'axios';
import createRestApiClient from '../../utils/createRestApiClient';

const apiEndpoint = 'https://api.livecoin.net/exchange/';


const myTransformResponse = (data) => {
    return {exchange: 'Livecoin', last: data.last, ask: data.best_ask, bid: data.best_bid};
}


export class LivecoinFetcher {
    constructor() {
        this.client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    }

    getBtcEth() {
        return this.client.request({
            method: 'GET',
            url: '/ticker',
            params: {currencyPair: 'ETH/BTC'},
            transformResponse: [].concat(
                axios.defaults.transformResponse,
                myTransformResponse,
            ),
        });
    }
}
;
