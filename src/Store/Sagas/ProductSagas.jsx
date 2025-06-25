import { createService, deleteService, getService, updateService } from "./Services/ProductServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_PRODUCT, ADD_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_PRODUCT_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_PRODUCT_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    var response = yield updateService(action);
    yield put({ type: UPDATE_PRODUCT_RED, payload: response.data })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* productSaga() {  //watcher
    yield takeEvery(ADD_PRODUCT, createSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)
}