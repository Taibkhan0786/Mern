import { createService, deleteService, getService } from "./Services/NewslatterServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_NEWSLATTER, ADD_NEWSLATTER_RED, DELETE_NEWSLATTER, DELETE_NEWSLATTER_RED, GET_NEWSLATTER, GET_NEWSLATTER_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_NEWSLATTER_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_NEWSLATTER_RED, payload: response.data })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_NEWSLATTER_RED, payload: action.payload })
}

export default function* newslatterSaga() {  //watcher
    yield takeEvery(ADD_NEWSLATTER, createSaga)
    yield takeEvery(GET_NEWSLATTER, getSaga)
    yield takeEvery(DELETE_NEWSLATTER, deleteSaga)
}