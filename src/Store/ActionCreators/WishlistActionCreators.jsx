import { ADD_WISHLIST, DELETE_WISHLIST, GET_WISHLIST } from "../Contants";

export function createWishlist(data) {
    return {
        type: ADD_WISHLIST,
        payload: data
    }
}

export function getWishlist() {
    return {
        type: GET_WISHLIST
    }
}


export function deleteWishlist(data) {
    return {
        type: DELETE_WISHLIST,
        payload: data
    }
}