import {FetchDataPost, FetchDataGet} from './FetchData'
import ProductDto from '../dto/ProductDto'

export const AddProductRequest = (ProductDto) => {
    return FetchDataPost(`http://localhost:7168/product/addProduct`, ProductDto);
}

export const EditProductRequest = (ProductDto) => {
    return FetchDataPost(`http://localhost:7168/product/editProduct`, ProductDto);
}

export const GetSellerProducts = (sellerId) => {
    return FetchDataPost(`http://localhost:7168/product/getSellerProducts`, sellerId);
}

export const GetAllProducts = () => {
    return FetchDataGet(`http://localhost:7168/product/getAllProducts`);
}