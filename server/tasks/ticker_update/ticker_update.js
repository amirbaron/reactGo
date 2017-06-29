import schedule from 'node-schedule';
import {LivecoinFetcher} from './livecoin_fetcher';
import {PoloniexFetcher} from './poloniex_fetcher';
import axios from 'axios';
import {polyfill} from 'es6-promise';
polyfill();

export const tickerUpdate = () => {
    const livecoinFetcher = new LivecoinFetcher();
    const poloniexFetcher = new PoloniexFetcher();
    schedule.scheduleJob('0-59 * * * * *', function () {
        axios.all([livecoinFetcher.getBtcEth()])
            .then(axios.spread(function (livecoin) {
               console.log(livecoin.data)
               // console.log(poloniex.data);
            })).catch(() => []);
    });
};



