import * as types from '../types';
import {fetchArbitrageData} from '../fetch-data';


function sortBy(column, asc) {
    return {type: types.CHANGE_ARBITRAGE_SORTING, column: column, asc: asc};
}

export function changeSortBy(column, asc) {
    return (dispatch) => {
        dispatch(sortBy(column, asc));
    }
}

export function refetchArbitrageData() {
    return (dispatch) => {
        dispatch({type: types.CREATE_REQUEST});
        fetchArbitrageData().then((data) => {
            return dispatch({type: types.REQUEST_SUCCESS, data});
        });
    }
}
