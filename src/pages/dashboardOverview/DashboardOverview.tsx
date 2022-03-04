import { Grid, Box } from '@mui/material';
import { Party } from '../../model/Party';
import { Product } from '../../model/Product';
import ActiveProductsSection from './components/activeProductsSection/ActiveProductsSection';
import NotActiveProductsSection from './components/notActiveProductsSection/NotActiveProductsSection';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';
import PartyCard from './components/partyCard/PartyCard';

type Props = {
  party: Party;
  products: Array<Product>;
};

const DashboardOverview = ({ party, products }: Props) => (
  <Box sx={{ width: '985px', padding: '0 16px' }}>
    <WelcomeDashboard />
    <Grid container direction="row" justifyContent={'center'}>
      <PartyCard party={party} />
    </Grid>
    <ActiveProductsSection products={products} party={party} />
    {products && products.findIndex((product) => product.status !== 'ACTIVE') > -1 && (
      <NotActiveProductsSection party={party} products={products} />
    )}
  </Box>
);

export default DashboardOverview;
