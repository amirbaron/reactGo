import React, { Component } from 'react';
import Page from '../pages/Page';
import {ArbitrageContainer} from '../containers/Arbitrage';

export class Arbitrage extends Component {
    getMetaData() {
        return {
            title: this.pageTitle(),
            meta: this.pageMeta(),
            link: this.pageLink()
        };
    }

    pageTitle = () => {
        return 'Arbitrage | reactGo';
    };

    pageMeta = () => {
        return [
            { name: 'description', content: 'Arbitrage between crypto currencies' }
        ];
    };

    pageLink = () => {
        return [];
    };

    render() {
        return (
            <Page {...this.getMetaData()}>
                <ArbitrageContainer {...this.props} />
            </Page>
        );
    }
}

