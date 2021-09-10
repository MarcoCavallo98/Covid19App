import { getYesterdayData } from '../api/apiFetcher';
import { ADD_LOCATION_DATA } from './actionsConstants';

export const addLocationData = (locationData) => ({
    type: ADD_LOCATION_DATA,
    locationData
});

export const asyncAddLocationData = () => {
    return (dispatch) => {
        return getYesterdayData().then(d => {
            d.data.forEach(element => {
                dispatch(addLocationData(element));
            });
        });
    };
};