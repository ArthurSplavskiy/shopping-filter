import { Button, Slider, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getProducts } from '../../store/slices/products/async.reducers';
import { sortByPrice } from '../../store/slices/products/products.slice';

function valuetext(value: number) {
  return `${value}$`;
}

export const FilterPrice = () => {
	const [value, setValue] = useState<number[]>([0, 1000]);
	const dispatch = useAppDispatch();

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value);
		if(event.target.name === 'from') {
			setValue(prev => [newValue, prev[1]]);
		}
		if(event.target.name === 'to') {
			setValue(prev => [prev[0], newValue]);
		}
	};

	const submit = async () => {
		await dispatch(getProducts({
			sortType: 'asc'
		}));
		dispatch(sortByPrice(value));
	};

	return (
		<div>
			<Stack mb={4} direction="row" spacing={2}>
				<TextField
					name="from"
					onChange={handleInputChange}
					value={value[0] <= 0 ? 0 : value[0]}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					name="to"
					onChange={handleInputChange}
					value={value[1] <= 1 ? 1 : value[1] && value[1] >= 1000 ? 1000 : value[1]}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Button
					onClick={submit}
					variant="contained"
				>Ok</Button>
			</Stack>
			<Slider
				max={1000}
				getAriaLabel={() => 'Price range'}
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
			/>
		</div>
	);
};