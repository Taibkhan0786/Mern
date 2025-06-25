import { createService, deleteService, getService, updateService } from "./Services/SubcategoryServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_SUBCATEGORY, ADD_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_SUBCATEGORY_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_SUBCATEGORY_RED, payload: response.data })
}
function* updateSaga(action) {         //executer
    yield updateService(action);
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* subcategorySaga() {  //watcher
    yield takeEvery(ADD_SUBCATEGORY, createSaga)
    yield takeEvery(GET_SUBCATEGORY, getSaga)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)
}