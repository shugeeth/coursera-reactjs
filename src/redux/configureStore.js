import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { createForms } from "react-redux-form";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './form';

export const ConfigureStore = () => {
    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const enhancers = [ applyMiddleware(thunk, logger), reduxDevTools ]
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        compose(...enhancers)
    );

    return store;
}