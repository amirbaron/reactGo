import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    changeSortBy,
} from '../actions/arbitrage';
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';



{/*<TableCell onClick={this.handleCurrencySortClick} sorted={this.getCurrencySorting()}>Currency Pair</TableCell>*/
}
{/*<TableCell >Source Pair</TableCell>*/
}
{/*<TableCell numeric>Price A</TableCell>*/
}
{/*<TableCell numeric>Price B</TableCell>*/
}
{/*<TableCell numeric>Arbitrage</TableCell>*/
}
{/*<TableCell numeric>Arbitrage %</TableCell>*/
}


const TooltipCell = Tooltip(TableCell);

const sortByCaloriesAsc = (a, b) => {
    if (a.calories < b.calories) return -1;
    if (a.calories > b.calories) return 1;
    return 0;
};

const sortByCaloriesDesc = (a, b) => {
    if (a.calories > b.calories) return -1;
    if (a.calories < b.calories) return 1;
    return 0;
};


class Arbitrage extends Component {
    state = {
        selected: ['Donut'],
        currencySorted: 'asc',
        sortedColumn: '',
    };

    getSortedData = () => {
        const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
        return data.sort(compare);
    }

    handleRowSelect = selected => {
        const sortedData = this.getSortedData();
        this.setState({selected: selected.map(item => sortedData[item].name)});
    };

    handleSortClick = () => {
        const {sorted} = this.state;
        const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
        this.setState({sorted: nextSorting});
    };

    handleCurrencySortClick = () => {
        const {sortDirection, sortedColumn} = this.state;
        let nextSorting;
        if (sortedColumn == 'currency') {
            nextSorting = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            nextSorting = 'asc';
        }

        this.setState({sortDirection: nextSorting, sortedColumn: 'currency'});
    }

    getCurrencySorting = () => {
        let {sortDirection, sortedColumn} = this.state;
        if (sortedColumn == 'currency') {
            return sortDirection;
        }
        return null;
    }

    render() {
        const sortedData = this.props.data;
        return (
            <Table selectable={false} style={{marginTop: 10}}>
                <TableHead>
                    <TableCell onClick={this.handleCurrencySortClick} sorted={this.getCurrencySorting()}>Currency
                        Pair</TableCell>
                    <TableCell >Exchange Pair</TableCell>
                    <TableCell numeric>Ask A</TableCell>
                    <TableCell numeric>Ask B</TableCell>
                    <TableCell numeric>Arbitrage</TableCell>
                    <TableCell numeric>Arbitrage %</TableCell>
                </TableHead>
                {sortedData.map((item, idx) => (
                    <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
                        <TableCell>{item.currencyPair}</TableCell>
                        <TableCell>{item.exchangePair}</TableCell>
                        <TableCell numeric>{item.askA}</TableCell>
                        <TableCell numeric>{item.askB}</TableCell>
                        <TableCell numeric>{item.arbitrage}</TableCell>
                        <TableCell numeric>{item.arbitragePercentage}%</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}

Arbitrage.propTypes = {
    data: PropTypes.array.isRequired,
    sortDirection: PropTypes.PropTypes.string,
    sortedColumn: PropTypes.PropTypes.string,
    changeSortBy: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        data:state.arbitrage,
        sortDirection: state.arbitrage.sortDirection,
        sortedColumn: state.arbitrage.sortBy,
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export const ArbitrageContainer = connect(mapStateToProps, {
    changeSortBy,
})(Arbitrage);
