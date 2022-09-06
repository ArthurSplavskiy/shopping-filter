import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { IProduct } from '../../interfaces/Product.interface';
import styles from './ProductCard.module.scss';

export const ProductCard = ({ ...product }: IProduct): JSX.Element => {
	return (
		<Card className={styles.card} sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					className={styles.cardImage}
					component="img"
					height="240"
					image={product.image}
					alt={product.title}
				/>
				<CardContent sx={{ maxWidth: '96%' }}>
          <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
					<Typography variant="subtitle1" color="primary" component="div">
						{product.price} $
					</Typography>
					<Typography variant="subtitle1" component="div">
						{product.category}
					</Typography>
          <Typography sx={{ marginTop: 'auto' }} className={styles.cardText} variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
			</CardActionArea>
		</Card>
	);
};