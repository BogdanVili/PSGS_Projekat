import {FetchDataGet, FetchDataPost} from './FetchData'

export const AddOrderRequest = (orderDto) => {
    return FetchDataPost('http://localhost:7168/order/add-order', orderDto);
}

export const GetAdminOrdersRequest = (adminId) => {
    return FetchDataPost('http://localhost:7168/order/get-admin-orders', adminId);
}

export const GetSellerOrdersRequest = (sellerId) => {
    return FetchDataPost('http://localhost:7168/order/get-seller-orders', sellerId);
}

export const GetBuyerOrdersRequest = (buyerId) => {
    return FetchDataPost('http://localhost:7168/order/get-buyer-orders', buyerId);
}

export const DeleteOrderRequest = (orderId, buyerId) => {
    return FetchDataPost('http://localhost:7168/order/delete-order' + orderId, buyerId);
}

export const CanDeleteOrderRequest = (orderId) => {
    return FetchDataGet('http://localhost:7168/order/can-delete-order/' + orderId);
}