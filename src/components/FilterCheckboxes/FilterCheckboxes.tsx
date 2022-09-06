import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getCategory, getProducts } from '../../store/slices/products/async.reducers';
import { AppDispatch } from '../../store/store';

enum Category {
	MENS_CLOTHING = "men's clothing",
	WOMENS_CLOTHING = "women's clothing",
	ELECTRONICS = "electronics",
	JEWELERY = 'jewelery'
}

const Reset = (check: boolean, category: Category, dispatch: AppDispatch): void => {
	if(check) {
		dispatch(getCategory({
			category: category
		}));
	} else {
		dispatch(getProducts({
			sortType: 'asc'
		}));
	}
};

export const FilterCheckboxes = () => {
	const [checked, setChecked] = useState([false, false, false, false]);
	const dispatch = useAppDispatch();

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
		dispatch(getProducts({
			sortType: 'asc'
		}));
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, false, false, false]);
		Reset(event.target.checked, Category.MENS_CLOTHING, dispatch);
  };

  const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([false, event.target.checked, false, false]);
		Reset(event.target.checked, Category.WOMENS_CLOTHING, dispatch);
  };

	const handleChange4 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([false, false, event.target.checked, false]);
		Reset(event.target.checked, Category.ELECTRONICS, dispatch);
  };

	const handleChange5 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([false, false, false, event.target.checked]);
		Reset(event.target.checked, Category.JEWELERY, dispatch);
  };

	const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Men's clothing"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Women's clothing"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
			<FormControlLabel
        label="Electronics"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
      />
			<FormControlLabel
        label="Jewelery"
        control={<Checkbox checked={checked[3]} onChange={handleChange5} />}
      />
    </Box>
  );

	return (
		<div>
			<FormControlLabel
        label="All"
        control={
          <Checkbox
            checked={checked[0] && checked[1] && checked[2] && checked[3]}
            onChange={handleChange1}
          />
        }
      />
      {children}
		</div>
	);
};