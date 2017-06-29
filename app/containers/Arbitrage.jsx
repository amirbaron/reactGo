import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    changeSortBy,
} from '../actions/arbitrage';
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';


// const data = [
//     {name: 'Cupcake', calories: 305, fat: 3.7, sodium: 413, calcium: '3%', iron: '8%'},
//     {name: 'Donut', calories: 452, fat: 25.0, sodium: 326, calcium: '2%', iron: '22%'},
//     {name: 'Eclair', calories: 262, fat: 16.0, sodium: 337, calcium: '6%', iron: '7%'},
//     {name: 'Frozen yogurt', calories: 159, fat: 6.0, sodium: 87, calcium: '14%', iron: '1%'},
//     {name: 'Gingerbread', calories: 356, fat: 16.0, sodium: 327, calcium: '7%', iron: '16%'},
//     {name: 'Ice cream sandwich', calories: 237, fat: 9.0, sodium: 129, calcium: '8%', iron: '1%'},
//     {name: 'Jelly bean', calories: 375, fat: 0.0, sodium: 50, calcium: '0%', iron: '0%'},
//     {name: 'KitKat', calories: 518, fat: 26.0, sodium: 54, calcium: '12%', iron: '6%'}
// ];

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

const data = [
    {
        currencyPair: 'BTC/ETH',
        exchangePair: 'poloniex/livecoin',
        priceA: '100',
        priceB: '150',
        arbitrage: '-50',
        arbitragePercentage: -50
    },
    {
        currencyPair: 'BTC/ETH',
        exchangePair: 'poloniex/hitbtc',
        priceA: '100',
        priceB: '120',
        arbitrage: '-20',
        arbitragePercentage: -20
    }
]


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
        const sortedData = data;
        return (
            <Table selectable={false} style={{marginTop: 10}}>
                <TableHead>
                    <TableCell onClick={this.handleCurrencySortClick} sorted={this.getCurrencySorting()}>Currency
                        Pair</TableCell>
                    <TableCell >Exchange Pair</TableCell>
                    <TableCell numeric>Price 1</TableCell>
                    <TableCell numeric>Price 2</TableCell>
                    <TableCell numeric>Arbitrage</TableCell>
                    <TableCell numeric>Arbitrage %</TableCell>
                </TableHead>
                {sortedData.map((item, idx) => (
                    <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
                        <TableCell>{item.currencyPair}</TableCell>
                        <TableCell>{item.exchangePair}</TableCell>
                        <TableCell numeric>{item.priceA}</TableCell>
                        <TableCell numeric>{item.priceB}</TableCell>
                        <TableCell numeric>{item.arbitrage}</TableCell>
                        <TableCell numeric>{item.arbitragePercentage} %</TableCell>
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
        data:state.arbitrage.data,
        sortDirection: state.arbitrage.sortDirection,
        sortedColumn: state.arbitrage.sortBy,
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export const ArbitrageContainer = connect(mapStateToProps, {
    changeSortBy,
})(Arbitrage);
