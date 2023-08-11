import { Grid, Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Party } from '../../model/Party';
import { Product } from '../../model/Product';
import { ENV } from '../../utils/env';
import DashboardDelegationsBanner from '../dashboardDelegations/DashboardDelegationsBanner';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { useAppSelector } from '../../redux/hooks';
import { OnboardedProduct } from '../../api/generated/b4f-dashboard/OnboardedProduct';
import ActiveProductsSection from './components/activeProductsSection/ActiveProductsSection';
import NotActiveProductsSection from './components/notActiveProductsSection/NotActiveProductsSection';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';
import PartyCard from './components/partyCard/PartyCard';
import { PartyLogoUploader } from './components/partyCard/components/partyLogoUploader/PartyLogoUploader';
import DashboardInfoSection from './components/DashboardInfoSection';

type Props = {
  party: Party;
  products: Array<Product>;
};

const DashboardOverview = ({ party, products }: Props) => {
  const parties = useAppSelector(partiesSelectors.selectPartiesList);
  const isAdmin = parties?.find((p) => p.partyId === party.partyId)?.userRole === 'ADMIN';

  const activeProducts: Array<OnboardedProduct> = useMemo(
    () =>
      party.products?.filter((us) =>
        products.map(
          (p) =>
            us.productId === p.id &&
            us.productOnBoardingStatus === 'ACTIVE' &&
            us.authorized === true &&
            p.delegable
        )
      ),
    [party.products]
  ) ?? [party.products];

  const isDelegable = ENV.DELEGATIONS.ENABLE && activeProducts && isAdmin;

  const paWithDelegableProducts = party.institutionType === 'PA' && isDelegable;

  return (
    <Box p={3} sx={{ width: '100%' }}>
      <WelcomeDashboard />
      <Grid container direction="row" justifyContent={'center'} alignItems="center" mb={2}>
        <Grid item xs={6} display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            {party.description}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <PartyLogoUploader partyId={party.partyId} canUploadLogo={isAdmin} />
        </Grid>
      </Grid>
      {paWithDelegableProducts && (
        <Grid item xs={12} my={2}>
          <DashboardInfoSection />
        </Grid>
      )}
      <Grid item xs={12}>
        <PartyCard party={party} />
      </Grid>
      {paWithDelegableProducts && (
        <Grid item xs={12} mt={2}>
          <DashboardDelegationsBanner party={party} />
        </Grid>
      )}
      <Grid item xs={12} mb={2} mt={5}>
        <ActiveProductsSection products={products} party={party} />
        {products &&
          products.findIndex(
            (product) =>
              product.status === 'ACTIVE' &&
              party.products.map(
                (us) => us.productId === product.id && us.productOnBoardingStatus !== 'ACTIVE'
              )
          ) > -1 && <NotActiveProductsSection party={party} products={products} />}
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
