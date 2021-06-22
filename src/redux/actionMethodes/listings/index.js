import {types} from '../types'
export const setCategories=(data)=>{
    return { type: types.setCategories, payload: data }    
}
export const setBlogs=(data)=>{
    return { type: types.setBlogs, payload: data }    
}
export const setExclusiveProducts=(data)=>{
    return { type: types.setExclusive, payload: data }    
}