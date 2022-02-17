import withRetrievedValue from '@pagopa/selfcare-common-frontend/decorators/withRetrievedValue';
import { useProductsRolesMap } from '../hooks/useProductsRolesMap';
import { ProductsRolesMap } from '../model/ProductRole';

export type withProductsRolesMapProps = {
  productsRolesMap: ProductsRolesMap;
};

export default function withProductsRolesMap<T extends withProductsRolesMapProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, 'productsRolesMap'>> {
  return withRetrievedValue('productsRolesMap', useProductsRolesMap, WrappedComponent);
}
