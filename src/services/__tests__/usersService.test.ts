import {
  mockedInstitutionUserResource,
  mockedProductUserResource,
  mockedProductRoles,
} from '../../api/__mocks__/DashboardApiClient';
import { DashboardApi } from '../../api/DashboardApiClient';
import {
  fetchPartyUsers,
  savePartyUser,
  updatePartyUserStatus,
  fetchProductRoles,
} from '../usersService';
import { mockedParties } from '../__mocks__/partyService';
import { mockedPartyProducts } from '../__mocks__/productService';
import {
  institutionUserResource2PartyUser,
  PartyUser,
  PartyUserOnCreation,
  productUserResource2PartyUser,
} from '../../model/PartyUser';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'getPartyUsers');
  jest.spyOn(DashboardApi, 'getPartyProductUsers');
  jest.spyOn(DashboardApi, 'savePartyUser');
  jest.spyOn(DashboardApi, 'suspendPartyRelation');
  jest.spyOn(DashboardApi, 'activatePartyRelation');
  jest.spyOn(DashboardApi, 'getProductRoles');
});

test('Test fetchPartyUsers', async () => {
  const partyUsers = await fetchPartyUsers({ page: 0, size: 20 }, mockedParties[0]);

  expect(partyUsers).toMatchObject({
    page: {
      number: 0,
      size: mockedInstitutionUserResource.length,
      totalElements: mockedInstitutionUserResource.length,
      totalPages: 1,
    },
    content: mockedInstitutionUserResource.map(institutionUserResource2PartyUser),
  });

  expect(DashboardApi.getPartyUsers).toBeCalledTimes(1);
  expect(DashboardApi.getPartyUsers).toBeCalledWith(mockedParties[0].institutionId);
  expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(0);

  const partyProductUsers = await fetchPartyUsers(
    { page: 0, size: 20 },
    mockedParties[0],
    mockedPartyProducts[0]
  );

  expect(partyProductUsers).toMatchObject({
    page: {
      number: 0,
      size: mockedProductUserResource.length,
      totalElements: mockedProductUserResource.length,
      totalPages: 1,
    },
    content: mockedProductUserResource.map((r) =>
      productUserResource2PartyUser(mockedPartyProducts[0], r)
    ),
  });

  expect(DashboardApi.getPartyUsers).toBeCalledTimes(1);
  expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(1);
  expect(DashboardApi.getPartyProductUsers).toBeCalledWith(
    mockedParties[0].institutionId,
    mockedPartyProducts[0].id
  );
});

test('Test fetchProductRoles', async () => {
  const productRoles = await fetchProductRoles(mockedPartyProducts[0]);

  expect(productRoles.map((r) => r.productRole)).toMatchObject(mockedProductRoles);

  expect(DashboardApi.getProductRoles).toBeCalledWith(mockedPartyProducts[0].id);
});

test('Test savePartyUser', async () => {
  const user: PartyUserOnCreation = {
    name: 'Name',
    surname: 'Surname',
    taxCode: 'fiscalCode',
    email: 'email',
    productRole: 'role',
  };

  await savePartyUser(mockedParties[0], mockedPartyProducts[0], user);

  expect(DashboardApi.savePartyUser).toBeCalledWith(
    mockedParties[0].institutionId,
    mockedPartyProducts[0].id,
    user
  );
});

describe('Test updatePartyUserStatus', () => {
  test('Test updatePartyUserStatus', async () => {
    const partyUser: PartyUser = {
      id: 'id',
      name: 'Name',
      surname: 'Surname',
      email: 'email',
      userRole: 'ADMIN',
      products: [{ id: 'productId', title: 'productTitle', relationshipId: 'relationshipId' }],
      status: 'ACTIVE',
    };

    await updatePartyUserStatus(partyUser, 'SUSPENDED');

    expect(DashboardApi.suspendPartyRelation).toBeCalledWith('relationshipId');
    expect(DashboardApi.activatePartyRelation).toBeCalledTimes(0);

    await updatePartyUserStatus(partyUser, 'ACTIVE');

    expect(DashboardApi.suspendPartyRelation).toBeCalledTimes(1);
    expect(DashboardApi.activatePartyRelation).toBeCalledWith('relationshipId');
  });

  test('Test not 1 product', async () => {
    const partyUser: PartyUser = {
      id: 'id',
      name: 'Name',
      surname: 'Surname',
      email: 'email',
      userRole: 'ADMIN',
      products: [
        { id: 'productId', title: 'productTitle', relationshipId: 'relationshipId' },
        { id: 'productId2', title: 'productTitle2', relationshipId: 'relationshipId2' },
      ],
      status: 'ACTIVE',
    };

    try {
      await updatePartyUserStatus(partyUser, 'SUSPENDED');
      fail('exception expected');
    } catch (e) {
      expect(e.message).toBe('Updated allowed only for users having selected only 1 product: 2');
    }

    partyUser.products = [];

    try {
      await updatePartyUserStatus(partyUser, 'SUSPENDED');
      fail('exception expected');
    } catch (e) {
      expect(e.message).toBe('Updated allowed only for users having selected only 1 product: 0');
    }
  });

  test('Test no relationshipId', async () => {
    const partyUser: PartyUser = {
      id: 'id',
      name: 'Name',
      surname: 'Surname',
      email: 'email',
      userRole: 'ADMIN',
      products: [{ id: 'productId', title: 'productTitle' }],
      status: 'ACTIVE',
    };

    try {
      await updatePartyUserStatus(partyUser, 'SUSPENDED');
      fail('exception expected');
    } catch (e) {
      expect((e.message as string).substring(0, 88)).toBe(
        'Updated allowed only for users retrieved using getPartyProductUsers (no relationshipId):'
      );
    }
  });
});
