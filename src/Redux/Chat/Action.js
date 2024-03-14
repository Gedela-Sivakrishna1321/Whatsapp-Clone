import { API_BASE_URL } from "../../Config/config"
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat = (chatData) => async (dispatch) => {
    try {

        const res = await fetch(`${API_BASE_URL}/chats/single`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${chatData.token}`
            },
            body : JSON.stringify(chatData.data)
        })

        const data = await res.json();
        console.log("CREATED CHAT - ",data);
        dispatch({type:CREATE_CHAT, payload : data})
        
    } catch (error) {
        console.log("Error occured while creating chat - ",error);
    }
}

export const createGroupChat = (chatData) => async (dispatch) => {
    try {

        const res = await fetch(`${API_BASE_URL}/chats/group`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${chatData.token}`
            },
            body : JSON.stringify(chatData.group)
        })

        const data = await res.json();
        console.log("CREATED GROUP CHAT - ",data);
        dispatch({type:CREATE_GROUP, payload : data})
        
    } catch (error) {
        console.log("Error occured while creating group chat - ",error);
    }
}

export const getUsersChat = (chatData) => async (dispatch) => {
    try {

        const res = await fetch(`${API_BASE_URL}/chats/user`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${chatData.token}`
            },
           
        })

        const data = await res.json();
        // console.log("GET USERS CHAT - ",data);
        dispatch({type:GET_USERS_CHAT, payload : data})
        
    } catch (error) {
        console.log("Error occured while fetching users chat - ",error);
    }
}