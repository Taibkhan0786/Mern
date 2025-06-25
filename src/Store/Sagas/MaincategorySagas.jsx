import { createService, deleteService, getService, updateService } from "./Services/MaincategoryServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_MAINCATEGORY, ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_MAINCATEGORY_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_MAINCATEGORY_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    yield updateService(action);
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* maincategorySaga() {  //watcher
    yield takeEvery(ADD_MAINCATEGORY, createSaga)
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}