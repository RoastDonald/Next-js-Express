import {
  applyMiddleware, createStore
} from "redux";
import {
  composeWithDevTools
} from "redux-devtools-extension";
import {
  persistStore
} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];



const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);


const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {
  store,
  persistor
};
