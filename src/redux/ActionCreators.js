import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import fetch from 'cross-fetch';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        comment
    }
});

export const removeComment = (commentId) => ({
    type: ActionTypes.REMOVE_COMMENT,
    payload: {
        commentId
    }
});

//THUNK for removing comments
export const deleteComment = (commentId) => (dispatch) => {
    fetch(baseUrl + 'comments/' + commentId,
    {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          throw error;
        }
      )
      .then(response => dispatch(removeComment(commentId)))
      .catch(error =>  { 
          console.log('The comment could not be deleted\nError: ', error.message); 
          alert('The comment could not be deleted\nError: '+error.message); 
      });
}

//THUNK for posting comments
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', 
    //Passing the object for post
    {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { 
        console.log('post comments', error.message); 
        alert('Your comment could not be posted\nError: '+error.message); 
    });
};

//THUNK for posting data from contact form to feedback in server
export const postFeedback = ({firstname, lastname, telnum, email, agree, contactType, message}) => (dispatch) => {
    const newFeedback = {
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
    };
    return fetch(baseUrl + 'feedback', 
    {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response =>{
        console.log(response);
        alert('Thank you for your feedback!\n'+ JSON.stringify(response))
    })
    .catch(error =>  { 
        console.log('Form submition error: ', error.message); 
        alert('Your form could not be submitted\nError: '+error.message); 
    });
};

//THUNK - returns an function with dispatch and getState parameters to be passed,
//whereas a normal action creator returns an object with type and payload properties.
//The dispatch is used to divert to different actions and getState lets us read the state properties.

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
            .then(response=>{
                //Error handling for a proper data response
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw(error);
                }
            }, //Error handling for no response from server (Ex: request didn't reach the server itself).
            error => {
                var errMess = new Error(error.message);
                throw(errMess);
            })
            .then( response => response.json())
            .then( dishes => dispatch(addDishes(dishes)) )
            .catch(error => dispatch(dishesFailed(error.message)));
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

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
            .then(response=>{
                //Error handling for a proper data response
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw(error);
                }
            }, //Error handling for no response from server (Ex: request didn't reach the server itself).
            error => {
                var errMess = new Error(error.message);
                throw(errMess);
            })
            .then( response => response.json())
            .then( comments => dispatch(addComments(comments)) )
            .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: {
        errMess
    }
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: {
        comments
    }
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
            .then(response=>{
                //Error handling for a proper data response
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw(error);
                }
            }, //Error handling for no response from server (Ex: request didn't reach the server itself).
            error => {
                var errMess = new Error(error.message);
                throw(errMess);
            })
            .then( response => response.json())
            .then( promos => dispatch(addPromos(promos)) )
            .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: {
        errMess
    }
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: {
        promos
    }
});

//Thunk for leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
            .then(response=>{
                //Error handling for a proper data response
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw(error);
                }
            }, //Error handling for no response from server (Ex: request didn't reach the server itself).
            error => {
                var errMess = new Error(error.message);
                throw(errMess);
            })
            .then( response => response.json())
            .then( leaders => dispatch(addLeaders(leaders)) )
            .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: {
        errMess
    }
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: {
        leaders
    }
});