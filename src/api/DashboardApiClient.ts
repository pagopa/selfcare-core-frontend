import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import { store } from '../redux/store';
import { PartyUserOnCreation, PartyUserOnEdit } from '../model/PartyUser';
import { ENV } from '../utils/env';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard/client';
import { InstitutionResource } from './generated/b4f-dashboard/InstitutionResource';
import { ProductsResource } from './generated/b4f-dashboard/ProductsResource';
import { InstitutionUserResource } from './generated/b4f-dashboard/InstitutionUserResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { IdentityTokenResource } from './generated/b4f-dashboard/IdentityTokenResource';
import { UserResource } from './generated/b4f-dashboard/UserResource';
import { ProductRoleMappingsResource } from './generated/b4f-dashboard/ProductRoleMappingsResource';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
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
  withDefaults: withBearerAndInstitutionId,
});

const onRedirectToLogin = () =>
  store.dispatch(
    appStateActions.addError({
      id: 'tokenNotValid',
      error: new Error(),
      techDescription: 'token expired or not valid',
      toNotify: false,
      blocking: false,
      displayableTitle: 'Sessione scaduta',
      displayableDescription: 'Stai per essere rediretto alla pagina di login...',
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

  getTokenExchange: async (
    hostname: string,
    institutionId: string,
    productId: string
  ): Promise<IdentityTokenResource> => {
    const result = await apiClient.exchangeUsingGET({
      productId,
      institutionId,
      realm: hostname,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyUsers: async (
    institutionId: string,
    productId?: string,
    role?: string
  ): Promise<Array<InstitutionUserResource>> => {
    const result = await apiClient.getInstitutionUsersUsingGET({ institutionId, role, productId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyUser: async (
    institutionId: string,
    userId: string
  ): Promise<InstitutionUserResource | null> => {
    const result = await apiClient.getInstitutionUserUsingGET({ institutionId, userId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyProductUsers: async (
    institutionId: string,
    productId: string,
    role?: string
  ): Promise<Array<ProductUserResource>> => {
    const result = await apiClient.getInstitutionProductUsersUsingGET({
      institutionId,
      productId,
      role,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  savePartyUser: async (
    institutionId: string,
    productId: string,
    user: PartyUserOnCreation
  ): Promise<void> => {
    const result = await apiClient.createInstitutionProductUserUsingPOST({
      institutionId,
      productId,
      body: user,
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  updatePartyUser: async (institutionId: string, user: PartyUserOnEdit): Promise<void> => {
    const result = await apiClient.updateUserUsingPUT({
      institutionId,
      id: user.id,
      body: { email: user.email, fiscalCode: user.taxCode, name: user.name, surname: user.surname },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  suspendPartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.suspendRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  activatePartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.activateRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deletePartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.deleteRelationshipByIdUsingDELETE({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  getProductRoles: async (productId: string): Promise<Array<ProductRoleMappingsResource>> => {
    const result = await apiClient.getProductRolesUsingGET({
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchUserRegistryByFiscalCode: async (
    taxCode: string,
    institutionId: string
  ): Promise<UserResource | null> => {
    const result = await apiClient.getUserByExternalIdUsingPOST({
      institutionId,
      body: { externalId: taxCode },
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
