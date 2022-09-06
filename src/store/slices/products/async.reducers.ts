import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../../interfaces/Product.interface';

interface IProductsParams {
  sortType: string
}

interface ICategoryParams {
  category: string
}

export const getProducts = createAsyncThunk<IProduct[] | undefined, IProductsParams>(
	'products/fetchProducts', 
	async (params) => {
		try {
			const { sortType } = params;
			const { data } = await axios.get<IProduct[]>('https://fakestoreapi.com/products', {
				params: { sort: sortType }
			});
			return data;
		} catch (e) {}
	}
);

export const getCategory = createAsyncThunk<IProduct[] | undefined, ICategoryParams>(
	'products/fetchCategory', 
	async (params) => {
		try {
			const { category } = params;
			const { data } = await axios.get<IProduct[]>(`https://fakestoreapi.com/products/category/${category}`);
			return data;
		} catch (e) {}
	}
);