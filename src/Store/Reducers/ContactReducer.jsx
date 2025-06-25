import { ADD_CONTACT_RED, DELETE_CONTACT_RED, GET_CONTACT_RED, UPDATE_CONTACT_RED } from "../Contants";

export default function ContactReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_CONTACT_RED:
            newState = state
            newState.push(action.payload)
            return newState
        case GET_CONTACT_RED:
            return action.payload
        case UPDATE_CONTACT_RED:
            newState = state
            index = state.findIndex(item => item._id === action.payload._id)
            newState[index].status = action.payload.status
            return newState
        case DELETE_CONTACT_RED:
            newState = state.filter(item => item._id !== action.payload._id)
            return newState
        default:
            return state
    }
}