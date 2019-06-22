import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

import tagReducer from "../reducers/tagReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loggedIn",
    "username",
    "currentHits",
    "userID",
    "likedPosts",
    "likes"
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  combineReducers({
    tagReducer: tagReducer,
    persistedReducer: persistedReducer
  })
);
let persistor = persistStore(store);

export { store, persistor };
