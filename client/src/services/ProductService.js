import {FetchDataPost} from './FetchData'
import ProductDto from '../dto/ProductDto'

export const AddProductRequest = (ProductDto) => 
{
    return FetchDataPost(`http://localhost:7168/product/addProduct`, ProductDto);
}