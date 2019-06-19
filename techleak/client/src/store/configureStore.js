import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loggedIn",
    "username",
    "currentHits",
    "userID",
    "likedPosts",
    "likes",
    "comments",
    "replies"
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
