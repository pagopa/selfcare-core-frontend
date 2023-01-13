import i18n from '@pagopa/selfcare-common-frontend/locale/locale-utils';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import { store } from '../redux/store';
import { ENV } from '../utils/env';
import { createClient } from './generated/b4f-geotaxonomy/client';
import { GeographicTaxonomy } from './generated/b4f-geotaxonomy/GeographicTaxonomy';

/*
const withBearerAndPartyId: WithDefaultsT<'bearerAuth'> = (wrappedOperation) => (params: any) => {
  const token = storageTokenOps.read();
  return wrappedOperation({
    ...params,
    bearerAuth: `Bearer ${token}`,
  });
}; */

const apiClient = createClient({
  baseUrl: ENV.URL_API.API_GEOTAXONOMY,
  basePath: '',
  fetchApi: buildFetchApi(ENV.API_TIMEOUT_MS.DASHBOARD),
  // withDefaults: withBearerAndPartyId,
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

export const GeoTaxonomyApi = {
  getTaxonomiesByQuery: async (query: string): Promise<Array<GeographicTaxonomy>> => {
    const result = await apiClient.findAllUsingGET({ startsWith: query });
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
