import {
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_FAVORITE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
    PRODUCT_FAVORITE_REQUEST,
    PRODUCT_FAVORITE_FAIL
} from '../constants/productConstants';


const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
} = require('../constants/productConstants');

export const productListReducer = (state = { loading: true, products: [] }, action) => {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state
    }
}
export const productCreateReducer = (state = {}, action) => {

    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state
    }
}
export const productUpdateReducer = (state = { product: [] ,favProduct:[] }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { ...state, product: action.payload, loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            const item = action.payload;
            console.log('item:', item)
            const updateProduct = [state.product]
            // console.log('updateProduct:', updateProduct)
            // const selectedProduct = updateProduct.find(p => p.id === item._id)
            const selectedProduct = updateProduct.find(p => p.id === item._id)
            console.log('selectedProduct:', selectedProduct)
            if (selectedProduct.isFav) {
                // const updatedFavProducts = state.product.filter(p => p.id === item._id)
                // updateProduct.push({ product: selectedProduct} )
                // console.log('updateProduct:', updateProduct)
                // return { ...state, product: action.payload, loading: false, success: true };
                // return { ...state, product: updateProduct, loading: false, success: true };
                return { ...state, product: selectedProduct , loading: false, success: true };
            } else {
                return { ...state, product: selectedProduct , loading: false, success: true };
                // return { ...state, product: action.payload, loading: false, success: true };
            }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state
    }
}
export const productDeleteReducer = (state = {}, action) => {

    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_RESET:
            return {};

        default:
            return state
    }
}

// export const productFavUpdateReducer = (state = { favProduct: [] }, action) => {


//     switch (action.type) {
//         case PRODUCT_UPDATE_REQUEST:
//             // return { ...state, product: action.payload, loading: true };
//         default:
//             return state
//     }
// }