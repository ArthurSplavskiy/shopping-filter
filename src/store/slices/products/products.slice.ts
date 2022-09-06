import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProductsSliceState, StateStatus } from './products.types';
import { getProducts, getCategory } from './async.reducers';
import { IProduct } from '../../../interfaces/Product.interface';
import { RootState } from '../../store'; 

const initialState: IProductsSliceState = {
	items: [],
	status: StateStatus.LOADING,
	sortType: 'asc',
	price: [0, 1000],
	category: '',
	search: ''
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.status = StateStatus.LOADING;
			state.items = action.payload;
			state.status = StateStatus.SUCCESS;
		},
		sortByPrice: (state, action: PayloadAction<number[]>) => {
			state.items = state.items.filter(item => +item.price >= action.payload[0] && +item.price <= action.payload[1]);
		},
		sortTypeByPrice: (state, action: PayloadAction<string>) => {
			state.status = StateStatus.LOADING;
			if(action.payload === 'asc')
				state.items = state.items.sort((a, b) => +b.price - +a.price);
			else if(action.payload === 'desc')
				state.items = state.items.sort((a, b) => +a.price - +b.price);
			state.status = StateStatus.SUCCESS;
		},
		searchByName: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()));
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.status = StateStatus.LOADING;
		});
		builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<IProduct[] | undefined>) => {
			if(action.payload) {
				state.items = action.payload;
				state.status = StateStatus.SUCCESS;
			}
		});
		builder.addCase(getProducts.rejected, (state) => {
			state.status = StateStatus.ERROR;
		});
		builder.addCase(getCategory.pending, (state) => {
			state.status = StateStatus.LOADING;
		});
		builder.addCase(getCategory.fulfilled, (state, action: PayloadAction<IProduct[] | undefined>) => {
			if(action.payload) {
				state.items = action.payload;
				state.status = StateStatus.SUCCESS;
			}
		});
		builder.addCase(getCategory.rejected, (state) => {
			state.status = StateStatus.ERROR;
		});
	}
});

export const { setProducts, sortByPrice, sortTypeByPrice, searchByName } = productsSlice.actions;

export const selectProducts = (state: RootState): IProduct[] => state.products.items;
export const selectStatus = (state: RootState): StateStatus => state.products.status;

export default productsSlice.reducer;