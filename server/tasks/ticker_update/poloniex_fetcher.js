import axios from 'axios';
import createRestApiClient from '../../utils/createRestApiClient';

const apiEndpoint = 'https://poloniex.com/public/';

const myTransformResponse = (data) => {
    return data['BTC_ETH'];
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
                myTransformResponse,
            ),

        });
    }
};