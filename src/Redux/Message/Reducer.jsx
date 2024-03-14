import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType"

const initialValues = {
    messages : null,
    newMessage : null,
}

export const messageReducer = (store = initialValues, {type, payload}) => {
    if(type === CREATE_NEW_MESSAGE) {
        return {...store, newMessage : payload}
    }
    else if (type === GET_ALL_MESSAGE) {
        return {...store, messages : payload}
    }
    return store;
}