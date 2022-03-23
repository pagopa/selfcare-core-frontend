import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Party } from '../../../model/Party';
import { PartyGroupExt } from '../../../model/PartyGroup';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductRolesLists } from '../../../model/ProductRole';
import MembersGroup from './MembersGroup';

type Props = {
  partyGroup: PartyGroupExt;
  productsMap: ProductsMap;
  isSuspended: boolean;
  product: Product;
  party: Party;
  productRolesLists: ProductRolesLists;
};

function GroupDetail({
  partyGroup,
  productsMap,
  isSuspended,
  product,
  party,
  productRolesLists,
}: Props) {
  function formatDate(data: any) {
    const datePart = data.match(/\d+/g);
    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    return `${day}/${month}/${year}`;
  }
  const groupStatusClass = isSuspended ? 'CustomDisabledLabel' : 'CustomInfoStyle';
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid container item alignContent="center">
        <Grid item xs={4}>
          <Typography className="CustomLabelStyle" variant="h6">
            {t('groupDetail.name')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" className={groupStatusClass}>
            {partyGroup.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={4}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.description')}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" className={groupStatusClass}>
            {t('partyGroup.description')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={4}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.product')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" className={groupStatusClass}>
            {productsMap[partyGroup.productId].title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.referents')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MembersGroup
            partyGroup={partyGroup}
            party={party}
            product={product}
            isSuspended={isSuspended}
            productRolesLists={productRolesLists}
          />
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={4}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.creationDate')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" className={groupStatusClass}>
            {formatDate(partyGroup.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.createdByLabel')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" className={groupStatusClass}>
            {`${partyGroup.createdBy?.name} ${partyGroup.createdBy?.surname}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={4}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.modifiedAt')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" className={groupStatusClass}>
            {formatDate(partyGroup.modifiedAt)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" className="CustomLabelStyle">
            {t('groupDetail.modifiedBy')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="body2"
            className={groupStatusClass}
          >{`${partyGroup.modifiedBy?.name} ${partyGroup.modifiedBy?.surname}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default GroupDetail;
