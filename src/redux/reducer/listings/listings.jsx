import {types} from '../../actionMethodes/types';

export const categories = (state = [], action) => {
    if (action.type === types.setCategories) {
        return action.payload
    }
    return state;
}
export const blogs = (state = [], action) => {
    if (action.type === types.setBlogs) {
        return action.payload
    }
    return state;
}
export const exclusive = (state = [], action) => {
    if (action.type === types.setExclusive) {
        return action.payload
    }
    return state;
}