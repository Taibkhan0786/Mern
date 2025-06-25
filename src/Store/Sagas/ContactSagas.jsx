import { createService, deleteService, getService, updateService } from "./Services/ContactServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_CONTACT, ADD_CONTACT_RED, DELETE_CONTACT, DELETE_CONTACT_RED, GET_CONTACT, GET_CONTACT_RED, UPDATE_CONTACT, UPDATE_CONTACT_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_CONTACT_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_CONTACT_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    yield updateService(action);
    yield put({ type: UPDATE_CONTACT_RED, payload: action.payload })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_CONTACT_RED, payload: action.payload })
}

export default function* contactSaga() {  //watcher
    yield takeEvery(ADD_CONTACT, createSaga)
    yield takeEvery(GET_CONTACT, getSaga)
    yield takeEvery(UPDATE_CONTACT, updateSaga)
    yield takeEvery(DELETE_CONTACT, deleteSaga)
}