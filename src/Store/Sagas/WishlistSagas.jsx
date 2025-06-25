import { createService, deleteService, getService } from "./Services/WishlistServices"
import { put, takeEvery } from "redux-saga/effects"
import { ADD_WISHLIST, ADD_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED } from "../Contants"
function* createSaga(action) {         //executer
    var response = yield createService(action);
    yield put({ type: ADD_WISHLIST_RED, payload: response.data })
}
function* getSaga() {         //executer
    var response = yield getService();
    yield put({ type: GET_WISHLIST_RED, payload: response.data })
}
function* deleteSaga(action) {         //executer
    yield deleteService(action);
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* wishlistSaga() {  //watcher
    yield takeEvery(ADD_WISHLIST, createSaga)
    yield takeEvery(GET_WISHLIST, getSaga)
    yield takeEvery(DELETE_WISHLIST, deleteSaga)
}