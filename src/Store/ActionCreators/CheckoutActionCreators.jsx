import { ADD_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, GET_CHECKOUT_USER, UPDATE_CHECKOUT } from "../Contants";

export function createCheckout(data) {
    return {
        type: ADD_CHECKOUT,
        payload: data
    }
}

export function getCheckout() {
    return {
        type: GET_CHECKOUT
    }
}
export function getCheckoutUser() {
    return {
        type: GET_CHECKOUT_USER
    }
}

export function updateCheckout(data) {
    return {
        type: UPDATE_CHECKOUT,
        payload: data
    }
}

export function deleteCheckout(data) {
    return {
        type: DELETE_CHECKOUT,
        payload: data
    }
}