import {FetchDataPost, FetchDataGet} from './FetchData'
import ProductDto from '../dto/ProductDto'

export const AddProductRequest = (ProductDto) => {
    return FetchDataPost(`http://localhost:7168/product/add-product`, ProductDto);
}

export const EditProductRequest = (ProductDto) => {
    return FetchDataPost(`http://localhost:7168/product/edit-product`, ProductDto);
}

export const GetSellerProducts = (sellerId) => {
    return FetchDataPost(`http://localhost:7168/product/get-seller-products`, sellerId);
}

export const GetAllProducts = () => {
    return FetchDataGet(`http://localhost:7168/product/get-all-products`);
}