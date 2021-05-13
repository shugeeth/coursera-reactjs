import * as ActionTypes from "./ActionTypes";

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return {...state, 
                    comments: state.comments.concat(comment) };
        case ActionTypes.DELETE_COMMENT:
            var commentId = action.payload.commentId;
            return {...state, 
                    comments : state.comments.filter( comment => comment.id !== commentId) };
        case ActionTypes.ADD_COMMENTS:
            return {...state, 
                    errMess: null, 
                    comments: action.payload.comments};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, 
                    errMess: action.payload.errMess, 
                    comments: null};
        default:
            return state;
    }
}