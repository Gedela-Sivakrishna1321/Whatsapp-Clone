import { API_BASE_URL } from "../../Config/config";
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";


export const register = (data) => async (dispatch) => {
    try {

        const res = await fetch(`http://localhost:8080/auth/signup`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data),
        })

        const user = await res.json();
        if(user.jwt) {
            localStorage.setItem("token", user.jwt)
        }
        console.log("Registered user - ",user);
        console.log("Token - ", user.jwt)
        dispatch({type : REGISTER, payload : user});
        
    } catch (error) {
        console.log("Error while signup ...",error);
    }
}

export const login = (data) => async (dispatch) => {
    try {

        const res = await fetch(`http://localhost:8080/auth/signin`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data),
        })

        const user = await res.json();
        
        if(user.jwt) {
            localStorage.setItem("token", user.jwt)
        }

        console.log("Login user - ",user);
        dispatch({type : LOGIN, payload : user});
        
    } catch (error) {
        console.log("Error while signing user ...",error);
    }
}

export const reqUser = (token) => async (dispatch) => {
    try {

        const res = await fetch(`${API_BASE_URL}/users/profile`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
           
        })

        const user = await res.json();
        console.log("ReqUser user - ",user);
        dispatch({type : REQ_USER, payload : user});
        
    } catch (error) {
        console.log("Error while fetching req user Details  ...",error);
    }
}

export const searchUser = (data) => async (dispatch) => {
    try {
        // console.log("Search data :- ",data);
        const res = await fetch(`${API_BASE_URL}/users/search?query=${data.keyword}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${data.token}`
            },
           
        })

        const user = await res.json();
        console.log("Search user details - ",user);
        dispatch({type : SEARCH_USER, payload : user});
        
    } catch (error) {
        console.log("Error while searching user details  ...",error);
    }
}

export const updateUser = (data) => async (dispatch) => {
    // console.log("Update user Profile -", data);
    try {

        const res = await fetch(`${API_BASE_URL}/users/update`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${data.token}`
            },
            body : JSON.stringify(data.data),
        })

        const user = await res.json();
        console.log("Updated user details - ",user);
        dispatch({type : UPDATE_USER, payload : user});
        
    } catch (error) {
        console.log("Error while updating user details  ...",error);
    }
}

export const logoutAction = () => async (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    dispatch({type : REQ_USER, payload : null})
    dispatch({type : LOGOUT, payload : null})
}