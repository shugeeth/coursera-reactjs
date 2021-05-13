import * as ActionTypes from "./ActionTypes";

export const Promotions = (state={
    isLoading: true,
    errMess: null,
    promotions:[]
}, action) => {
    switch(action.type) {
        case ActionTypes.PROMOS_LOADING:
            return { ...state, 
                    isLoading: true,
                    errMess: null,
                    promotions: [] };
        case ActionTypes.PROMOS_FAILED:
            return { ...state, 
                    isLoading: false,
                    errMess: action.payload.errMess,
                    promotions: [] };
        case ActionTypes.ADD_PROMOS:
            return { ...state, 
                    isLoading: false,
                    errMess: null,
                    promotions: action.payload.promos };
        default:
            return state;
    }
}