import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/root";

let store;
export default initialState => {
    if (store) {
        return store;
    }

    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    return store;
}
