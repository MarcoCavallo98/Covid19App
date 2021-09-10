import { ADD_LOCATION_DATA } from '../actions/actionsConstants';


const defaultState = [];

const locationsDataReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_LOCATION_DATA:
            return state.concat([action.locationData]);
        default:
            return state;
    }
}

export default locationsDataReducer;