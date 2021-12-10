import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Product } from '../../../../model/Product';
import RolesSearch from './components/rolesSearch/RolesSearch';

interface Roles {
  products: Array<Product>;
}

export default function Roles({ products }: Roles) {
  const { productId } = useParams<any>();
  const selectedProduct = productId ? products.find((p) => p.id === productId) : undefined;
  return (
    <Grid
      container
      alignItems={'center'}
      px={0}
      sx={{ width: '953px', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12}>
        <Typography>Ruoli</Typography>
        {/*    <PartyDetail party={party} /> */}
      </Grid>
      <Grid item xs={12}>
        <RolesSearch selectedProduct={selectedProduct} products={products} />
      </Grid>
    </Grid>
  );
}
