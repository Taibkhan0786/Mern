import { createService, deleteService, getService, updateService } from "./Services/BrandServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_BRAND, ADD_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_BRAND_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_BRAND_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    yield updateService(action);
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* brandSaga() {  //watcher
    yield takeEvery(ADD_BRAND, createSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)
}