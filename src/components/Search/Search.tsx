import { Grid, Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import useDebounce from '../../hooks/useDebounce';
import { getProducts } from '../../store/slices/products/async.reducers';
import { searchByName } from '../../store/slices/products/products.slice';
import { FilterSelect } from '../FilterSelect/FilterSelect';

export const Search = () => {
	const dispatch = useAppDispatch();
	const debounce = useDebounce(fetchProducts, 500);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if(event.target.value.length > 2) {
			debounce(event.target.value);
		} else {
			dispatch(getProducts({
				sortType: 'asc'
			}));
		}
	};

	async function fetchProducts(query: string) {
		await dispatch(getProducts({
			sortType: 'asc'
		}));
		dispatch(searchByName(query));
	}

	return (
		<div>
			<Grid container spacing={{ xs: 2, sm: 4 }}>
				<Grid item xs={12} md={6}>
					<TextField sx={{ width: '100%' }} placeholder="Search" variant="outlined" onChange={handleChange} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Stack direction="row" justifyContent="flex-end">
						<FilterSelect />
					</Stack>
				</Grid>
			</Grid>
		</div>
	);
};