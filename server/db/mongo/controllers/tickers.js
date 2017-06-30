import Ticker from '../models/tickers';

/**
 * List
 */

export function all(req, res) {
    Ticker.find({}).exec((err, tickers) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    console.log("tickers", tickers);
    return res.json(tickers);
  });
}

export function one(succ, errCb){
    Ticker.findOne({}).sort({ date: -1 }).exec((err, ticker) => {
        if (err) {
            console.log('Error in fetching one ticker');
            errCb()
        }
        succ(ticker);
    });
}


/**
 * Add a Ticker
 */
export function add(req) {
    req.arbitrage = req.askB - req.askA;
    req.arbitragePercentage = (100*req.askB)/req.askA - 100
    Ticker.update({currencyPair: req.currencyPair, exchangePair: req.exchangePair},
        req, {upsert: true, setDefaultsOnInsert: true}, () => {
        });
};




export default {
  all,
  add,
  one,
};
