import {types} from '../actionMethodes/types';


export const userReducer = (state =null, action) => {
    
    if (action.type === types.signIn) {
        return action.payload
    }

    else if (action.type === types.updateProfile) {
        return {
            ...state, name: action.payload.name, phone: action.payload.phone
        }
    }
    else if (action.type === types.logOut)
        return null;
       
    return state
    }


export const userLanguage = (state = null, action) => {
    return state;
}

export const userLocation = (state = null, action) => {
    if (action.type === types.setLocation) {
        return action.payload
    }
    
    return state;
}

export const systemLanguages = (state = null, action) => {
  
    return state;
}

export const userAddresses = (state = [], action) => {
    return state;
}

export const fcmToken = (state = null, action) => {
    if (action.type === types.saveToken) {
        return action.payload
    }
    else if (action.type === types.logOut)
        return null;
    return state;
}