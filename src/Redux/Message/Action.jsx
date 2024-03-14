import { API_BASE_URL } from "../../Config/config";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
    try {

        const res = await fetch(`${API_BASE_URL}/messages/create`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${messageData.token}`
            },
            body : JSON.stringify(messageData.data)
        })

        const data = await res.json();
        console.log("CREATED MESSAGE - ",data);
        dispatch({type:CREATE_NEW_MESSAGE, payload : data})
        
    } catch (error) {
        console.log("Error occured while creating message - ",error);
    }
}

export const getAllMessages = (reqData) => async (dispatch) => {
    try {

        const res = await fetch(`${API_BASE_URL}/messages/chat/${reqData.chatId}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${reqData.token}`
            },
          
        })

        const data = await res.json();
        console.log("ALL MESSAGEs - ",data);
        dispatch({type:GET_ALL_MESSAGE, payload : data})
        
    } catch (error) {
        console.log("Error occured while fetching all message - ",error);
    }
}
