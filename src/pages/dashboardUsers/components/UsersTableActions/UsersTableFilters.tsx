import { Grid } from '@mui/material';
import { UserRole } from '../../../../model/Party';
import { Product } from '../../../../model/Product';
import { ProductRole, ProductsRolesMap } from '../../../../model/ProductRole';
import UsersTableRolesFilter from './UsersTableRolesFilter';

export type UsersTableFiltersConfig = {
  /** If the roles configuration imply a set of products, this will be considered as filter */
  productIds: Array<string>;
  /** The selc roles selected as filter */
  selcRole: Array<UserRole>;
  /** The product roles selected as filter */
  productRoles: Array<ProductRole>;
};
interface UsersSearchFilterProps {
  products: Array<Product>;
  selectedProduct?: Product;
  disableFilters: boolean;
  filters: UsersTableFiltersConfig;
  onFiltersChange: (f: UsersTableFiltersConfig) => void;
  productsRolesMap: ProductsRolesMap;
  showSelcRoleGrouped: boolean;
}

export default function UsersTableFilters({
  filters,
  onFiltersChange,
  productsRolesMap,
  disableFilters,
  showSelcRoleGrouped,
}: UsersSearchFilterProps) {
  const productRolesList: Array<ProductRole> = Object.values(productsRolesMap).flatMap(
    (p) => p.list
  );

  return (
    <Grid container direction="row" alignItems={'center'} columnSpacing={2}>
      <UsersTableRolesFilter
        disableFilters={disableFilters}
        productRolesSelected={filters.productRoles}
        productRolesList={productRolesList}
        filterSelcRole={filters.selcRole}
        onFiltersChange={onFiltersChange}
        filters={filters}
        showSelcRoleGrouped={showSelcRoleGrouped}
      />
    </Grid>
  );
}
