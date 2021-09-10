import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import locationsDataReducer from '../reducers/locationsDataReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
    combineReducers({
        locationsData: locationsDataReducer
    }), 
    composeEnhancers(applyMiddleware(thunk))
); 

export default configureStore;