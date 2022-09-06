import { Stack, Typography } from '@mui/material';
import { FilterCheckboxes } from '../FilterCheckboxes/FilterCheckboxes';
import { FilterPrice } from '../FilterPrice/FilterPrice';

export const Filter = () => {

	return (
		<Stack spacing={2}>
			<Typography variant="h5">Category</Typography>
			<FilterCheckboxes />
			<Typography variant="h5">Price</Typography>
			<FilterPrice />
		</Stack>
	);
};