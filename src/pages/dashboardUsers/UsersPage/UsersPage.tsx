import { Grid, Tab, Tabs } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import React, { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { HashLink } from 'react-router-hash-link';
import useScrollSpy from 'react-use-scrollspy';
import { Product } from '../../../model/Product';
import { Party } from '../../../model/Party';
import UsersTableActions from '../components/UsersTableActions/UsersTableActions';
import { DASHBOARD_ROUTES } from '../../../routes';
import UsersProductSection from '../components/UsersProductSection';
import { UsersTableFiltersConfig } from '../components/UsersTableActions/UsersTableFilters';
import UserTableNoData from '../components/UserTableNoData';
import { ProductsRolesMap } from '../../../model/ProductRole';
import withProductsRolesMap from '../../../decorators/withProductsRolesMap';

interface Props {
  party: Party;
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
}

const emptyFilters: UsersTableFiltersConfig = {
  productIds: [],
  selcRole: [],
  productRoles: [],
};

function UsersPage({ party, activeProducts, productsRolesMap }: Props) {
  const [filters, setFilters] = useState<UsersTableFiltersConfig>(emptyFilters);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  const [productsFetchStatus, setProductsFetchStatus] = useState<
    Record<string, { loading: boolean; noData: boolean }>
  >(() =>
    Object.fromEntries(activeProducts.map((p) => [[p.id], { loading: true, noData: false }]))
  );

  useEffect(() => {
    if (productsFetchStatus) {
      setLoading(!!Object.values(productsFetchStatus).find((p) => p.loading));
      setNoData(!Object.values(productsFetchStatus).find((p) => !p.noData));
    }
  }, [productsFetchStatus]);

  useEffect(() => trackEvent('USER_LIST', { party_id: party.institutionId }), []);

  const prodSectionRefs = useMemo(
    () => activeProducts.map((_) => React.createRef<HTMLDivElement>()),
    [activeProducts]
  );

  const activeSection = useScrollSpy({ sectionElementRefs: prodSectionRefs, offsetPx: -80 });

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <Grid
      container
      px={2}
      mt={10}
      sx={{ width: '1017px', backgroundColor: 'transparent !important', flexGrow: 0 }}
    >
      <Grid item xs={12} mb={9}>
        <TitleBox
          title="Referenti"
          subTitle="Visualizza e gestisci i referenti abilitati alla gestione dei prodotti del tuo Ente."
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          borderBottom: 1,
          borderBottomWidth: '2px',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#F5F6F7',
        }}
      >
        <Tabs variant="scrollable" scrollButtons="auto" value={activeSection}>
          {activeProducts.map((p, i) => (
            <Tab
              key={p.id}
              label={p.title}
              component={HashLink}
              to={`#${p.id}`}
              value={i}
              scroll={scrollWithOffset}
            />
          ))}
        </Tabs>
      </Grid>

      <Grid container direction="row" alignItems={'center'} mt={5}>
        <Grid item xs={12}>
          <UsersTableActions
            disableFilters={loading}
            loading={loading}
            party={party}
            products={activeProducts}
            productsRolesMap={productsRolesMap}
            filters={filters}
            onFiltersChange={setFilters}
            addUserUrl={resolvePathVariables(
              DASHBOARD_ROUTES.PARTY_USERS.subRoutes.ADD_PARTY_USER.path,
              { institutionId: party.institutionId }
            )}
          />
        </Grid>
        {activeProducts.map((p, i) => (
          <Grid key={p.id} item xs={12} ref={prodSectionRefs[i]}>
            <UsersProductSection
              hideProductWhenLoading={true}
              party={party}
              product={p}
              filters={filters}
              productsRolesMap={productsRolesMap}
              onFetchStatusUpdate={(loading, noData) => {
                setProductsFetchStatus((previousState) => ({
                  ...previousState,
                  [p.id]: { loading, noData },
                }));
              }}
            />
          </Grid>
        ))}
        {!loading && noData && <UserTableNoData removeFilters={() => setFilters(emptyFilters)} />}
      </Grid>
    </Grid>
  );
}

export default withProductsRolesMap(UsersPage);
