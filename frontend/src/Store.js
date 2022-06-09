import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    newProductReducer,
    newReviewReducer,
    ProductDetailsReducer,
    ProductsReducer,
    ProductReducer,
    ProductReviewsReducer,
    reviewReducer
} from './Reducers/ProductReducer';
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from './Reducers/userReducer';

import { cartReducers } from './Reducers/cartReducers';
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from './Reducers/orderReducers';

const reducer = combineReducers({
    products: ProductsReducer,
    productDetails: ProductDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducers,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: ProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: ProductReviewsReducer,
    review : reviewReducer

})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;