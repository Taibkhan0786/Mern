import { ADD_BRAND, DELETE_BRAND, GET_BRAND, UPDATE_BRAND } from "../Contants";

export function createBrand(data){
    return{
        type:ADD_BRAND,
        payload:data
    }
}

export function getBrand(){
    return{
        type:GET_BRAND
    }
}

export function updateBrand(data){
    return{
        type:UPDATE_BRAND,
        payload:data
    }
}

export function deleteBrand(data){
    return{
        type:DELETE_BRAND,
        payload:data
    }
}