import {
  InstitutionResource,
  InstitutionTypeEnum,
} from '../../api/generated/b4f-dashboard/InstitutionResource';
import { institutionResource2Party, Party } from '../Party';

test('Test Party', () => {
  const party: Party = {
    userRole: 'ADMIN',
    description: 'Comune di Bari',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '1',
    digitalAddress: 'comune.bari@pec.it',
    fiscalCode: 'fiscalCodeBari',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'PA',
  };
  expect(party).toStrictEqual({
    userRole: 'ADMIN',
    description: 'Comune di Bari',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '1',
    digitalAddress: 'comune.bari@pec.it',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'PA',
    fiscalCode: 'fiscalCodeBari',
  });
});

test('Test institutionResource2Party', () => {
  const institutionResource: InstitutionResource = {
    name: 'Comune di Bari',
    status: 'PENDING',
    id: '1',
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    category: 'Ente locale',
    mailAddress: 'address',
    fiscalCode: 'fiscalCode',
    userRole: 'LIMITED',
    institutionType: InstitutionTypeEnum.PA,
    address: 'address',
    zipCode: '20121',
    recipientCode: 'MC45KDSX',
  };

  const party = institutionResource2Party(institutionResource);
  expect(party).toStrictEqual({
    userRole: 'LIMITED',
    description: 'Comune di Bari',
    status: 'PENDING',
    partyId: '1',
    fiscalCode: 'fiscalCode',
    digitalAddress: 'address',
    category: 'Ente locale',
    urlLogo: 'http://checkout.selfcare/institutions/1/logo.png',
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'PA',
    registeredOffice: 'address',
    zipCode: '20121',
    typology: 'TODO',
    recipientCode: 'MC45KDSX',
  });
});
