import { Grid, styled, Typography } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withProductsRolesMap, {
  withProductsRolesMapProps,
} from '../../decorators/withProductsRolesMap';
import withUserDetail, { withUserDetailProps } from '../../decorators/withUserDetail';
import { Party } from '../../model/Party';
import { PartyUserOnCreation } from '../../model/PartyUser';
import { Product } from '../../model/Product';
import { DASHBOARD_ROUTES } from '../../routes';
import AddUserForm from './components/AddUserForm';

const CustomTextTransform = styled(Typography)({
  textTransform: 'capitalize',
});

type Props = {
  party: Party;
  activeProducts: Array<Product>;
} & withProductsRolesMapProps &
  withUserDetailProps;

function AddProductToUserPage({ party, activeProducts, productsRolesMap, partyUser }: Props) {
  const history = useHistory();

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        institutionId: party.institutionId,
        userId: partyUser.id,
      })
    );

  const paths = [
    {
      description: 'Referenti',
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
            institutionId: party.institutionId,
          })
        ),
    },
    {
      description: partyUser.name + ' ' + partyUser.surname,
      onClick: goBack,
    },
    {
      description: 'Aggiungi Prodotto',
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={2}
      mt={10}
      sx={{ width: '985px', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox
          title="Aggiungi prodotto"
          subTitle={`Assegna un prodotto al referente abilitato per ${party.description}`}
        />
      </Grid>
      <Grid item xs={12} mb={9}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid container item alignContent="center">
                <Grid item xs={3}>
                  <Typography variant="h6" className="CustomLabelStyle">
                    NOME
                  </Typography>
                </Grid>
                <Grid item xs={9} className="partyUserStyle">
                  <CustomTextTransform variant="body2" className="CustomInfoStyle">
                    {partyUser.name.toLocaleLowerCase()}
                  </CustomTextTransform>
                </Grid>
              </Grid>
              <Grid container item alignContent="center">
                <Grid item xs={3}>
                  <Typography variant="h6" className="CustomLabelStyle">
                    COGNOME
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <CustomTextTransform variant="body2" className="CustomInfoStyle">
                    {partyUser.surname}
                  </CustomTextTransform>
                </Grid>
              </Grid>
              <Grid container item alignContent="center">
                <Grid item xs={3}>
                  <Typography variant="h6" className="CustomLabelStyle">
                    CODICE FISCALE
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <CustomTextTransform variant="body2" className="CustomInfoStyle">
                    {partyUser.taxCode}
                  </CustomTextTransform>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {partyUser.products.map((userProduct) => (
        <Grid item xs={12} mb={9} key={userProduct.id}>
          <AddUserForm
            goBack={goBack}
            party={party}
            products={activeProducts.filter((p) => p.id !== userProduct.id)}
            productsRolesMap={productsRolesMap}
            initialFormData={
              {
                taxCode: partyUser.taxCode,
                name: partyUser.name,
                surname: partyUser.surname,
                email: partyUser.email,
                confirmEmail: partyUser.email,
                id: partyUser.id,
                productRoles: [],
                certification: partyUser.certification,
              } as PartyUserOnCreation
            }
            canEditRegistryData={false}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default withUserDetail(withProductsRolesMap(AddProductToUserPage));
