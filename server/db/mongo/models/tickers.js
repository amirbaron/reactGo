/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 8);


const TickerSchema = new mongoose.Schema({
    currencyPair: {type: String, index: true},
    exchangePair: {type: String, index: true},
    askA: {type: Float, index: true},
    askB: {type: Float, index: true},
    bidA: {type: Float},
    bidB: {type: Float},
    lastA: {type: Float},
    lastB: {type: Float},
    arbitragePercentage: {type: Float, index:true},
    arbitrage: {type: Float, index:true},
    date: {type: Date, default: Date.now},
});


TickerSchema.index({currencyPair: 1, exchangePair: 1});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Ticker', TickerSchema);

