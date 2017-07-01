import {apiEndpoint} from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    return {
        getArbitrage: (sortBy, asc) => {
            let params = null;
            if (sortBy) {
                let params = {sortBy: sortBy, asc: asc};
            }
            let resp = client.request({
                method: 'GET',
                url: '/arbitrages',
                params: params,
            });
            return resp;
        },
    };
};