import axios from 'axios';
import createRestApiClient from '../../utils/createRestApiClient';

const apiEndpoint = 'https://api.hitbtc.com/api/1/public/';

const myTransformResponse = (data) => {
    return {exchange: 'Hitbtc', last: parseFloat(data.last), ask: parseFloat(data.ask), bid: parseFloat(data.bid)};
}


export class HitbtcFetcher {
    constructor() {
        this.client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    }

    getBtcEth() {
        return this.client.request({
            method: 'GET',
            url: '/ETHBTC/ticker',
            transformResponse: [].concat(
                axios.defaults.transformResponse,
                myTransformResponse,
            ),
        });
    }
}
;