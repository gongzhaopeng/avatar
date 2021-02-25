import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/root";

let store;
export default initialState => {
    if (store) {
        return store;
    }

    let middlewares = [applyMiddleware(thunk)]
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
        middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    }
    store = createStore(
        rootReducer,
        initialState,
        compose(...middlewares)
    );
    return store;
}
