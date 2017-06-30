import schedule from 'node-schedule';
import {LivecoinFetcher} from './livecoin_fetcher';
import {PoloniexFetcher} from './poloniex_fetcher';

import {controllers} from '../../db';

const tickersController = controllers && controllers.tickers;

import axios from 'axios';
import {polyfill} from 'es6-promise';
polyfill();

// currencyPair: { type: [String], index: true },
// exchangePair: { type: [String], index: true },
// askA: { type: [Float], index: true },
// askB: { type: [Float], index: true },
// bidA:   { type: [Float]},
// bidB:   { type: [Float]},
// lastA: { type: [Float]},
// lastB: { type: [Float]},
// date: { type: Date, default: Date.now },

let buildTicker = (currencyPair, dataA, dataB) => {
    return {
        currencyPair: currencyPair, exchangePair: `${dataA.exchange}/${dataB.exchange}`,
        askA: dataA.ask,
        bidA: dataA.bid,
        lastA: dataA.last,
        askB: dataB.ask,
        bidB: dataB.bid,
        lastB: dataB.last,
    };
};

export const tickerUpdate = () => {
    const livecoinFetcher = new LivecoinFetcher();
    const poloniexFetcher = new PoloniexFetcher();
    schedule.scheduleJob('0-59 * * * * *', function () {
        axios.all([livecoinFetcher.getBtcEth(), poloniexFetcher.getBtcEth()])
            .then(axios.spread(function (...args) {
                for (let i = 0; i < args.length; i += 2) {
                    tickersController.add(buildTicker('BTC/ETH', args[i].data, args[i + 1].data));
                }
            })).catch((err) => console.log(err));
    });
};



