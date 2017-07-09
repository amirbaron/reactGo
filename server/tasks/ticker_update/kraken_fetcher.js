import axios from 'axios';
import createRestApiClient from '../../utils/createRestApiClient';
import * as dsjs from 'dsjslib';

var Cache = dsjs.Cache;
const apiEndpoint = 'https://api.kraken.com/0/public/Ticker';

export class KrakenFetcher {
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

    transformResponse = (data) => {
        const allData = data.result;
        const transformed = {};

        Object.keys(allData).forEach((key) => {
            let data = allData[key];
            transformed[key] = {
                exchange: 'Kraken',
                last: parseFloat(data.c[0]),
                ask: parseFloat(data.a[0]),
                bid: parseFloat(data.b[0])
            }
        });
        return transformed;
    }

    onRemove = (key) => {
        console.info(key, "removed from KrakenFetcher");
        this.getBtcEthAsync().then().catch(reason => console.log(reason));
    }

    load = (key, onCompleteCallback) => {
        return this.client.request({
            method: 'GET',
            params: {pair: 'ETHXBT,LTCXBT'},
        }).then(res => onCompleteCallback(null, this.transformResponse(res.data)))
            .catch((err) => onCompleteCallback(err, null));
    };

    translateName(tickerName){
        switch (tickerName) {
            case "BTC/ETH": return "XETHXXBT";
            case "BTC/LTC": return "XLTCXXBT";
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