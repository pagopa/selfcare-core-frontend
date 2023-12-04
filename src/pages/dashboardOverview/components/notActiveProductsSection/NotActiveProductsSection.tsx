/* eslint-disable sonarjs/no-identical-functions */
import React from 'react';
import { Grid } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation } from 'react-i18next';
import { Product } from '../../../../model/Product';
import { Party } from '../../../../model/Party';
import NotActiveProductCardContainer from './components/NotActiveProductCardContainer';

type Props = {
  party: Party;
  products: Array<Product>;
};

export default function NotActiveProductsSection({ party, products }: Props) {
  const { t } = useTranslation();

  const isOnboardingAllowedInProdPN = (category?: string): boolean => {
    const allowedCategories = [
      'Regioni, Province Autonome e loro Consorzi e Associazioni', // L4
      'Comuni e loro Consorzi e Associazioni', // L6
      "Citta' Metropolitane", // L45
    ];

    return category !== undefined && allowedCategories.includes(category);
  };

  return (
    <React.Fragment>
      <TitleBox
        title={t('overview.notActiveProductsSection.title')}
        mbTitle={2}
        mtTitle={5}
        variantTitle="h5"
      />
      <Grid container spacing={3}>
        {products
          .filter(
            (p) =>
              p.status === 'ACTIVE' &&
              (party.products.some(
                (us) => us.productId === p.id && us.productOnBoardingStatus !== 'ACTIVE'
              ) ||
                !party.products.some((us) => us.productId === p.id) ||
                (p.subProducts &&
                  party.products.find((pp) => pp.productId === p.id && pp.authorized) &&
                  p.subProducts.some(
                    (subProduct) => !party.products.some((us) => us.productId === subProduct.id)
                  )))
          )
          .filter((p) => p.id !== 'prod-pn' || isOnboardingAllowedInProdPN(party?.category))
          .map((product) => (
            <NotActiveProductCardContainer key={product.id} party={party} product={product} />
          ))}
      </Grid>
    </React.Fragment>
  );
}
