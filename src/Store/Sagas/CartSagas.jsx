import { createService, deleteService, getService, updateService } from "./Services/CartServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_CART, ADD_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_CART_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_CART_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    yield updateService(action);
    yield put({ type: UPDATE_CART_RED, payload: action.payload })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* cartSaga() {  //watcher
    yield takeEvery(ADD_CART, createSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(DELETE_CART, deleteSaga)
}