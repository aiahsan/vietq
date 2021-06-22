import {types} from '../types'
export const LogOut=()=>{
    return { type: types.logOut, payload: null }    
}
export const Login=(payload)=>{
    return {type:types.signIn,payload:payload}
}
export const saveToken=(payload)=>{
    return {type:types.saveToken,payload:payload}

}
export const setLocation=(payload)=>{
    return {type:types.setLocation,payload:payload}
}