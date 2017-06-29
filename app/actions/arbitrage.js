import * as types from '../types';


function sortBy(column, asc) {
    return { type: types.CHANGE_ARBITRAGE_SORTING, column: column, asc:asc};
}

export function changeSortBy(column, asc) {
    return (dispatch) => {
        dispatch(sortBy(column, asc));
    }
}
