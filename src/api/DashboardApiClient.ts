import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import i18n from '@pagopa/selfcare-common-frontend/locale/locale-utils';
import { store } from '../redux/store';
import { ENV } from '../utils/env';
// import { Party } from '../model/Party';
// import { Product } from '../model/Product';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard/client';
import {
  InstitutionResource,
  InstitutionTypeEnum,
} from './generated/b4f-dashboard/InstitutionResource';
import { ProductsResource } from './generated/b4f-dashboard/ProductsResource';
import { ProductRoleMappingsResource } from './generated/b4f-dashboard/ProductRoleMappingsResource';
import { BrokerResource } from './generated/b4f-dashboard/BrokerResource';
// import { DelegationIdResource } from './generated/b4f-dashboard/DelegationIdResource';
// import { TypeEnum } from './generated/b4f-dashboard/DelegationRequestDto';

const withBearerAndPartyId: WithDefaultsT<'bearerAuth'> = (wrappedOperation) => (params: any) => {
  const token = storageTokenOps.read();
  return wrappedOperation({
    ...params,
    bearerAuth: `Bearer ${token}`,
  });
};

const apiClient = createClient({
  baseUrl: ENV.URL_API.API_DASHBOARD,
  basePath: '',
  fetchApi: buildFetchApi(ENV.API_TIMEOUT_MS.DASHBOARD),
  withDefaults: withBearerAndPartyId,
});

const onRedirectToLogin = () =>
  store.dispatch(
    appStateActions.addError({
      id: 'tokenNotValid',
      error: new Error(),
      techDescription: 'token expired or not valid',
      toNotify: false,
      blocking: false,
      displayableTitle: i18n.t('session.expired.title'),
      displayableDescription: i18n.t('session.expired.message'),
    })
  );

export const DashboardApi = {
  getInstitutions: async (): Promise<Array<InstitutionResource>> => {
    const result = await apiClient.getInstitutionsUsingGET({});
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getInstitution: async (institutionId: string): Promise<InstitutionResource> => {
    const result = await apiClient.getInstitutionUsingGET({
      institutionId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getProducts: async (institutionId: string): Promise<Array<ProductsResource>> => {
    const result = await apiClient.getInstitutionProductsUsingGET({ institutionId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  uploadLogo: async (institutionId: string, logo: File): Promise<boolean> => {
    const result = await apiClient.saveInstitutionLogoUsingPUT({
      institutionId,
      logo,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getBackOfficeUrl: async (
    institutionId: string,
    productId: string,
    environment?: string
  ): Promise<string> => {
    const result = await apiClient.retrieveProductBackofficeUsingGET({
      productId,
      institutionId,
      environment,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getProductRoles: async (productId: string): Promise<Array<ProductRoleMappingsResource>> => {
    const result = await apiClient.getProductRolesUsingGET({
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  updateInstitutionGeographicTaxonomy: async (
    institutionId: string,
    geographicTaxonomies: Array<{ code: string; desc: string }>
  ): Promise<boolean> => {
    const result = await apiClient.updateInstitutionGeographicTaxonomyUsingPUT({
      institutionId,
      body: { geographicTaxonomyDtoList: geographicTaxonomies },
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getProductBrokers: async (
    productId: string,
    institutionType: InstitutionTypeEnum
  ): Promise<Array<BrokerResource>> => {
    const result = await apiClient.getProductBrokersUsingGET({
      productId,
      institutionType,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  // TODO Uncomment as soon as the openApi includes this call
  /* createDelegation: async (
    party: Party,
    product: Product,
    techPartnerId: string
  ): Promise<DelegationIdResource> => {
    const result = await apiClient.createDelegationUsingPOST({
      body: {
        from: party.partyId,
        institutionFromName: party.description,
        productId: product.id,
        to: techPartnerId,
        type: 'PT' as TypeEnum,
      },
    });
    return extractResponse(result, 200, onRedirectToLogin);
  }, */
};
