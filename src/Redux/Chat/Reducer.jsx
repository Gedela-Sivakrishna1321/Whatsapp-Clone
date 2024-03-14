import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType"


const initialValues = {
    createChat : null,
    createGroup : null,
    chats : []
}

export const chatReducer = (store = initialValues, {type,payload}) => {
    if(type === CREATE_CHAT) {
        return {...store, createChat : payload }
    }
    else if (type === CREATE_GROUP) {
        return {...store, createGroup : payload }
    }
    else if (type === GET_USERS_CHAT) {
        return {...store, chats : payload};
    }

    return store;
}