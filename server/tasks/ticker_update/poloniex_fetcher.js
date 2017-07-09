import createRestApiClient from '../../utils/createRestApiClient';
import * as dsjs from 'dsjslib';

var Cache = dsjs.Cache;

const apiEndpoint = 'https://poloniex.com/public/';


export class PoloniexFetcher {
    constructor() {
        this.client = createRestApiClient().withConfig({baseURL: apiEndpoint});
        this.cache = new Cache(
            {
                'maximumSize': 1,
                'expiresAfterWrite': 1,
                'loaderFunction': this.load,
                'onRemove': this.onRemove
            }
        );
    }

    onRemove = (key) => {
        console.info(key, "removed from PoloniexFetcher");
        this.getBtcEthAsync().then().catch(reason => console.log(reason));
    }

    transformResponse = (allData) => {
        const transformed = {};
        Object.keys(allData).forEach((key) => {
            let data = allData[key];
            transformed[key] = {
                exchange: 'Poloniex',
                last: parseFloat(data.last),
                ask: parseFloat(data.lowestAsk),
                bid: parseFloat(data.highestBid)
            }
        });
        return transformed;
    }

    load = (key, onCompleteCallback) => {
        return this.client.request({
            method: 'GET',
            params: {command: 'returnTicker'},
        }).then(res => onCompleteCallback(null, this.transformResponse(res.data)))
            .catch((err) => onCompleteCallback(err, null));
    };

    translateName(tickerName){
        switch (tickerName) {
            case "BTC/ETH": return "BTC_ETH";
            case "BTC/LTC": return "BTC_LTC";
        }
    }

    get(tickerName) {
        const name = this.translateName(tickerName);
        return new Promise((resolve, reject) => {
            this.cache.get("value", (err, value) => {
                if (err) {
                    reject(err, value);
                } else {
                    resolve(value[name]);
                }
            });
        });
    }
}
;