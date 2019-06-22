import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "../reducers/generalReducer";
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
    "comments",
    "replies",
    "myPosts",
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
