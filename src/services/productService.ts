import { DashboardApi } from '../api/DashboardApiClient';
import { Product, productResource2Product } from '../model/Product';
import { ProductRole } from '../model/ProductRole';
import { SelcRoleEnum } from '../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { PartyRoleEnum } from '../api/generated/b4f-dashboard/ProductRoleMappingsResource';
import {
  mockedPartyProducts,
  fetchProductRoles as fetchProductRolesMocked,
} from './__mocks__/productService';

export const fetchProducts = (partyId: string): Promise<Array<Product>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PRODUCTS === 'true') {
    return new Promise((resolve) => resolve(mockedPartyProducts));
  } else {
    return DashboardApi.getProducts(partyId).then((productResources) =>
      productResources ? productResources.map(productResource2Product) : []
    );
  }
};

export const fetchProductRoles = (product: Product): Promise<Array<ProductRole>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PRODUCTS === 'true') {
    return fetchProductRolesMocked(product);
  } else {
    return DashboardApi.getProductRoles(product.id).then((roles) =>
      roles
        .map((pr: any) =>
          pr.productRoles.map((r: any) => ({
            productId: product.id,
            partyRole: pr.partyRole as PartyRoleEnum,
            selcRole: pr.selcRole as SelcRoleEnum,
            multiroleAllowed: pr.multiroleAllowed as boolean,
            productRole: r.code ?? '',
            title: r.label ?? '',
            description: r.description ?? '',
          }))
        )
        .flatMap((x) => x)
    );
  }
};
