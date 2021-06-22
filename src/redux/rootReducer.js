import {combineReducers} from "redux";

import * as User from './reducer/user';
import * as Listings from './reducer/listings/listings'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  fcmToken:User.fcmToken,
  User:User.userReducer,
  categories:Listings.categories,
  blogs:Listings.blogs,
  userLocation:User.userLocation,
  exclusive:Listings.exclusive
});

const persistConfig={
  key:'root',
  storage,
  whitelist:['fcmToken','User','userLocation']
}

export default persistReducer(persistConfig,rootReducer )

export function* rootSaga() {

}
