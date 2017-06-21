import createRestApiClient from '../../utils/createRestApiClient';

const apiEndpoint = 'https://api.livecoin.net/exchange/';

export class LivecoinFetcher {
    constructor() {
        this.client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    }

    getBtcEth() {
        return this.client.request({
            method: 'GET',
            url: '/ticker',
            params: {currencyPair: 'ETH/BTC'}
        });
    }
}
;
