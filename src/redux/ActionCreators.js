import * as ActionTypes from "./ActionTypes";
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const deleteComment = (commentId) => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: {
        commentId
    }
});

//THUNK - returns an function with dispatch and getState parameters to be passed,
//whereas a normal action creator returns an object with type and payload properties.
//The dispatch is used to divert to different actions and getState lets us read the state properties.

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    setTimeout(()=>{
        dispatch(dishesFailed("This is a Test Error"));
    }, 2000);
    setTimeout(()=>{
        dispatch(addDishes(DISHES));
    }, 4000);
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: {
        errMess
    }
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: {
        dishes
    }
});