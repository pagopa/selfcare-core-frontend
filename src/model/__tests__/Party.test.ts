import { InstitutionResource } from '../../api/generated/b4f-dashboard/InstitutionResource';
import { institutionResource2Party } from '../Party';

test('Test institutionResource2Party', () => {
  const institutionResource: InstitutionResource = {
    name: 'Comune di Bari',
    status: 'PENDING',
    id: '1',
    category: 'Ente locale',
    mailAddress: 'address',
    fiscalCode: 'fiscalCode',
    userRole: 'LIMITED',
  };

  const party = institutionResource2Party(institutionResource);
  expect(party).toStrictEqual({
    userRole: 'LIMITED',
    description: 'Comune di Bari',
    status: 'PENDING',
    institutionId: '1',
    fiscalCode: 'fiscalCode',
    digitalAddress: 'address',
    category: 'Ente locale',
    urlLogo: 'http://checkout.selfcare/institutions/1/logo.png',
  });
});
