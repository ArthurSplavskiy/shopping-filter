import { IProduct } from '../../../interfaces/Product.interface';

export enum StateStatus {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export interface IProductsSliceState {
	items: IProduct[],
	status: StateStatus,
	sortType: 'desc' | 'asc',
	price: number[],
	category: string,
	search: string
}