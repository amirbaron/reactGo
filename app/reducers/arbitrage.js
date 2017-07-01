import * as types from '../types';


export default function message(state = {
    data: [],
    type: 'SUCCESS',
}, action = {}) {
    switch (action.type) {
        case types.REQUEST_SUCCESS:
            if (action.data) return action.data;
            return state;
        case types.CHANGE_ARBITRAGE_SORTING:
            return state;
        default:
            return state;
    }
}
