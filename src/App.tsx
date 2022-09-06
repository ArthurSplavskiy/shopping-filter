import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { Filter, Search, ProductCard } from './components';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { getProducts } from './store/slices/products/async.reducers';
import { selectProducts, selectStatus } from './store/slices/products/products.slice';
import { StateStatus } from './store/slices/products/products.types';
import './styles.scss';

const App = () => {
	const products = useAppSelector(selectProducts);
	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getProducts({
			sortType: 'asc',
		}));
	}, []);

  return (
    <>
			<Grid container spacing={2} rowSpacing={6}>
				<Grid item xs={12}>
					<Search />
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Filter />
				</Grid>
				<Grid item xs={12} sm={8} md={9}>
					{status === StateStatus.LOADING
					? 
					<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<CircularProgress />
					</Box>
					:
					<Grid container columnSpacing={2} rowSpacing={4} sx={{ maxWidth: 1550 }}>
						{products && products.map(product => (
							<Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}>
								<ProductCard
									key={product.id}
									id={product.id}
									image={product.image}
									title={product.title}
									description={product.description}
									category={product.category}
									price={product.price}
								/>
							</Grid>
						))}
					</Grid>}
				</Grid>
			</Grid>
    </>
  );
};

export default App;
