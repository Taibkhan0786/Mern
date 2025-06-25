import { ADD_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED } from "../Contants";

export default function BrandReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_BRAND_RED:
            newState = state
            newState.push(action.payload)
            return newState
        case GET_BRAND_RED:
            return action.payload
        case UPDATE_BRAND_RED:
            newState = state
            index = state.findIndex(item => item._id === action.paylo_ad.id)
            newState[index].name = action.payload.name
            return newState
        case DELETE_BRAND_RED:
            newState = state.filter(item => item._id !== action.paylo_ad.id)
            return newState
        default:
            return state
    }
}