import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    changeSortBy,
    refetchArbitrageData,
} from '../actions/arbitrage';
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import {FormattedRelative, IntlProvider} from "react-intl";


const TooltipCell = Tooltip(TableCell);
const TooltipRow = Tooltip(TableRow);

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

    componentDidMount() {
        this.startPoll();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    startPoll() {
        this.timeout = setTimeout(() => {
            this.props.refetchArbitrageData();
            this.startPoll();
        }, 500);
    }


    render() {
        const sortedData = this.props.data;
        return (
            <IntlProvider locale="en">
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

                        <TableRow  key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
                            <TooltipCell tooltip={this.getTooltip(item)}>{item.currencyPair}</TooltipCell>
                            <TooltipCell tooltip={this.getTooltip(item)}>{item.exchangePair}</TooltipCell>
                            <TooltipCell numeric tooltip={this.getTooltip(item)}>{item.askA.toFixed(8)}</TooltipCell>
                            <TooltipCell numeric tooltip={this.getTooltip(item)}>{item.askB.toFixed(8)}</TooltipCell>
                            <TooltipCell numeric tooltip={this.getTooltip(item)}>{item.arbitrage.toFixed(8)}</TooltipCell>
                            <TooltipCell numeric tooltip={this.getTooltip(item)}>{item.arbitragePercentage}%</TooltipCell>
                        </TableRow>
                    ))}
                </Table>
            </IntlProvider>
        );
    }

    // bidA: {type: Float},
    // bidB: {type: Float},
    // lastA: {type: Float},
    // lastB: {type: Float},
    // arbitragePercentage: {type: Float, index:true},
    // arbitrage: {type: Float, index:true},
    // date: {type: Date, default: Date.now},

    getTooltip(item) {
        let exchanges = item.exchangePair.split('/');

        return <div>
            <div>
                {`${exchanges[0]} Last: ${item.lastA}`}
            </div>
            <div>
                {`${exchanges[1]} Last: ${item.lastB}`}
            </div>
            <div>
                {`${exchanges[0]} Ask: ${item.askA}`}
            </div>
            <div>
                {`${exchanges[1]} Ask: ${item.askB}`}
            </div>
            <div>
                {`${exchanges[0]} Bid: ${item.bidA}`}
            </div>
            <div>
                {`${exchanges[1]} Bid: ${item.bidB}`}
            </div>
            <div>
                {`Arbitrage: ${item.arbitragePercentage}%`}
            </div>
            <FormattedRelative value={item.date}/>
        </div>;
    }
}

Arbitrage
    .propTypes = {
    data: PropTypes.array.isRequired,
    sortDirection: PropTypes.PropTypes.string,
    sortedColumn: PropTypes.PropTypes.string,
    changeSortBy: PropTypes.func.isRequired,
};

function

mapStateToProps(state) {
    return {
        data: state.arbitrage,
        sortDirection: state.arbitrage.sortDirection,
        sortedColumn: state.arbitrage.sortBy,
        isFetching: state.isFetching,
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export const
    ArbitrageContainer = connect(mapStateToProps, {
        changeSortBy, refetchArbitrageData
    })(Arbitrage);
