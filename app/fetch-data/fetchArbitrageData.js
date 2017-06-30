import {arbitrageService} from '../services';

const fetchData = () => {
    return arbitrageService().getArbitrage()
        .then(res => {
            return res.data;
        })
        // Returning [] as a placeholder now so it does not error out when this service
        // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
        .catch((err) => {
            console.log(err);
            return []
        });
};

export default fetchData;