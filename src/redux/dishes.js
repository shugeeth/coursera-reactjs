import * as ActionTypes from "./ActionTypes";
//Commenting the below line as the data is added through a THUNK in the ActionCreators.js
//import { DISHES } from '../shared/dishes';

export const Dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes:[]
    }, action) => {
    switch(action.type) {
        case ActionTypes.DISHES_LOADING:
            //The below line spreads the state (...state) and makes modifications for the properties that follows.
            return { ...state, 
                    isLoading: true,
                    errMess: null,
                    dishes: [] };
        case ActionTypes.DISHES_FAILED:
            return { ...state, 
                    isLoading: false,
                    errMess: action.payload.errMess,
                    dishes: [] };
        case ActionTypes.ADD_DISHES:
            return { ...state, 
                    isLoading: false,
                    errMess: null,
                    dishes: action.payload.dishes };
        default:
            return state;
    }
}