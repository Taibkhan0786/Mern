import { ADD_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, GET_CHECKOUT_USER_RED, UPDATE_CHECKOUT_RED } from "../Contants";

export default function CheckoutReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_CHECKOUT_RED:
            newState = state
            newState.push(action.payload)
            return newState
        case GET_CHECKOUT_RED:
        case GET_CHECKOUT_USER_RED:
            return action.payload
        case UPDATE_CHECKOUT_RED:
            newState = state
            index = state.findIndex(item => item._id === action.payload._id)
            newState[index].orderstatus = action.payload.orderstatus
            newState[index].paymentstatus = action.payload.paymentstatus
            return newState
        case DELETE_CHECKOUT_RED:
            newState = state.filter(item => item._id !== action.payload._id)
            return newState
        default:
            return state
    }
}