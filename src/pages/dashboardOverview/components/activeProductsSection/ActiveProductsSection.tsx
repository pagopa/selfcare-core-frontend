import React from 'react';
import { Grid } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { Product } from '../../../../model/Product';
import { Party } from '../../../../model/Party';
import ActiveProductCard from './components/ActiveProductCard';

type Props = {
  party: Party;
  products: Array<Product>;
};

export default function ActiveProductsSection({ party, products }: Props) {
  return (
    <React.Fragment>
      <TitleBox
        title="Prodotti attivi"
        subTitle="I prodotti PagoPA a cui il tuo Ente ha aderito."
        mbTitle={1}
        mtTitle={10}
        mbSubTitle={5}
        variantTitle="h2"
        variantSubTitle="body2"
      />
      <Grid container spacing={4}>
        {products &&
          products
            .filter((p) => p.status === 'ACTIVE')
            .map((product) => (
              <ActiveProductCard key={product.id} party={party} product={product} />
            ))}
      </Grid>
    </React.Fragment>
  );
}
