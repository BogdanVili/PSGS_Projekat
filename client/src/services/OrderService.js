import {FetchDataGet, FetchDataPost} from './FetchData'

export const AddOrderRequest = (orderDto) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/order/add-order`, orderDto);
}

export const GetAdminOrdersRequest = (adminId) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/order/get-admin-orders`, adminId);
}

export const GetSellerOrdersRequest = (sellerId) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/order/get-seller-orders`, sellerId);
}

export const GetBuyerOrdersRequest = (buyerId) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/order/get-buyer-orders`, buyerId);
}

export const DeleteOrderRequest = (orderId, buyerId) => {
    return FetchDataPost(`${process.env.REACT_APP_API_URL}/order/delete-order/` + orderId, buyerId);
}

export const CanDeleteOrderRequest = (orderId) => {
    return FetchDataGet(`${process.env.REACT_APP_API_URL}/order/can-delete-order/` + orderId);
}