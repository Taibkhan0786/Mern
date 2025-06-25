import { createService, deleteService, getService, getUserService, updateService } from "./Services/CheckoutServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_CHECKOUT, ADD_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, GET_CHECKOUT_USER, GET_CHECKOUT_USER_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_CHECKOUT_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_CHECKOUT_RED, payload: response.data })
}
function* getUserSaga() {         //executer
    var response = yield getUserService();
    yield put({ type: GET_CHECKOUT_USER_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    yield updateService(action);
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* checkoutSaga() {  //watcher
    yield takeEvery(ADD_CHECKOUT, createSaga)
    yield takeEvery(GET_CHECKOUT, getSaga)
    yield takeEvery(GET_CHECKOUT_USER, getUserSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)
}