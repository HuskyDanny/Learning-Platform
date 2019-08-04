import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "../reducers/generalReducer";
import tagReducer from "../reducers/tagReducer";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

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
    "likes",
    "avatar",
    "likedPostsDetail",
    "myPostsDetail"
  ]
};

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  combineReducers({
    tagReducer: tagReducer,
    persistedReducer: persistedReducer
  }),
  enhancer
);
let persistor = persistStore(store);

export { store, persistor };
