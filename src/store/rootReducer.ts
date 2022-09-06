import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './slices/products/products.slice';

const rootReducer = combineReducers({
	products: productsSlice
});

export default rootReducer;