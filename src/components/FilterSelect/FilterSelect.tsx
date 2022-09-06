import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { sortTypeByPrice } from '../../store/slices/products/products.slice';

export const FilterSelect = () => {
	const [sort, setSort] = useState('');
	const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
		if(event.target.value) {
			setSort(event.target.value);
		}
  };

	useEffect(() => {
		dispatch(sortTypeByPrice(sort));
	}, [sort]);

	return (
		<Box width={{ xs: '100%', sm: 320 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Sort</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					value={sort}
					label="Sort"
					onChange={handleChange}
				>
					<MenuItem value="asc">Price ASC</MenuItem>
					<MenuItem value="desc">Price DESC</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};