import axios from 'axios';

const ApiKey = process.env.REACT_APP_API_KEY;
const timeout = process.env.REACT_APP_TIMEOUT_CONN;

export const getYesterdayData = () => {
    
    const endpoint = process.env.REACT_APP_YESTERDAY_DATA_ENDPOINT;
    return axios.get(endpoint, {
        timeout: timeout,
        headers:{
            APIKey: ApiKey
        }
    });
}

export const getLocationData = (ISO2) => {
    
    const endpoint = `${process.env.REACT_APP_LOCATION_DATA_ENDPOINT}/${ISO2}`;

    return axios.get(endpoint, {
        timeout: timeout,
        headers:{
            APIKey: ApiKey
        }
    });
}
