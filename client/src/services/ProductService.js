import {FetchDataPost, FetchDataGet} from './FetchData'

export const GetAllProducts = () => {
    return FetchDataGet(`${process.env.REACT_APP_API_URL}/product/get-all-products`);
}

export const GetSellerProducts = (sellerId) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/product/get-seller-products`, sellerId);
}

export const AddProductRequest = (ProductDto) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/product/add-product`, ProductDto);
}

export const EditProductRequest = (ProductDto) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/product/edit-product`, ProductDto);
}

export const DeleteProductRequest = (productId, sellerId) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/product/delete-product/` + productId, sellerId);
}

export const CanDeleteProductRequest = (productId) => {
    return FetchDataGet(`${process.env.REACT_APP_API_URL}/product/can-delete-product/` + productId);
}