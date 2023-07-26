import { DashboardApi } from '../api/DashboardApiClient';
import { BrokerResource } from '../api/generated/b4f-dashboard/BrokerResource';
// import { DelegationIdResource } from '../api/generated/b4f-dashboard/DelegationIdResource';
import { InstitutionTypeEnum } from '../api/generated/b4f-dashboard/InstitutionResource';
import { mockedBrokerResource } from '../api/__mocks__/DashboardApiClient';
import { institutionResource2Party, Party } from '../model/Party';
// import { Product } from '../model/Product';
import { mockedParties } from './__mocks__/partyService';

export const fetchParties = (): Promise<Array<Party>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTIES === 'true') {
    return new Promise((resolve) => resolve(mockedParties));
  } else {
    return DashboardApi.getInstitutions().then((institutionResources) =>
      institutionResources ? institutionResources.map(institutionResource2Party) : []
    );
  }
};

export const fetchPartyDetails = (partyId: string): Promise<Party | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTIES === 'true') {
    return new Promise((resolve) =>
      resolve(mockedParties.find((p) => p.partyId === partyId) ?? null)
    );
  }

  return retrieveParty_fetch(partyId);
};

const retrieveParty_fetch = (partyId: string): Promise<Party | null> =>
  DashboardApi.getInstitution(partyId).then((institutionResource) =>
    institutionResource ? institutionResource2Party(institutionResource) : null
  );

export const getProductBrokers = (
  partyId: string,
  institutionType: InstitutionTypeEnum
): Promise<Array<BrokerResource>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTIES === 'true') {
    return new Promise((resolve) => resolve(mockedBrokerResource));
  } else {
    return DashboardApi.getProductBrokers(partyId, institutionType);
  }
};

//  // TODO Uncomment as soon as the openApi includes this call
// export const createDelegation = (
// party: Party,
//  product: Product,
//  techPartnerId: string
// ): Promise<DelegationIdResource> => {
//  /* istanbul ignore if */
//  if (process.env.REACT_APP_API_MOCK_PARTIES === 'true') {
//    return new Promise((resolve) => resolve(true));
// } else {
//    return DashboardApi.createDelegation(party, product, techPartnerId);
//  }
// };
