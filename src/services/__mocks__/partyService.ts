import { GeographicTaxonomy } from '../../api/generated/b4f-dashboard/GeographicTaxonomy';
import { ProductOnBoardingStatusEnum } from '../../api/generated/b4f-dashboard/OnboardedProductResource';
import { BaseParty, Party } from '../../model/Party';

export const mockedBaseParties: Array<BaseParty> = [
  {
    partyId: '1',
    description: 'Comune di Bari',
    status: 'ACTIVE',
    userRole: 'LIMITED',
  },
  {
    partyId: '2',
    description: 'Comune di Milano',
    status: 'PENDING',
    userRole: 'ADMIN',
  },
  {
    partyId: '3',
    description: 'Comune di Roma',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '4',
    description: 'Comune di Napoli',
    status: 'ACTIVE',
    userRole: 'LIMITED',
  },
  {
    partyId: 'onboarded',
    description: 'AGENCY ONBOARDED',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '5',
    description:
      'Commissario straordinario per la realizzazione di approdi temporanei e di interventi complementari per la salvaguardia di Venezia e della sua laguna e ulteriori interventi per la salvaguardia della laguna di Venezia',
    status: 'TOBEVALIDATED',
    userRole: 'ADMIN',
  },
  {
    partyId: '7',
    description: 'Scuola Media Oswald Von Wolkenstein di Bressa',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '8',
    description: 'Maggioli S.p.A.',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
];

export const mockedParties: Array<Party> = [
  {
    description: 'Comune di Bari',
    urlLogo: 'image',
    partyId: '1',
    digitalAddress: 'comune.bari@pec.it',
    fiscalCode: '111111111111',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CGDAS23A',
    geographicTaxonomies: [{ code: '058091', desc: 'Roma - Comune' }], // Use case with one taxonomy
    vatNumber: '111111111141',
    supportEmail: '',
    products: [
      {
        productId: 'prod-pagopa',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.PENDING,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '81001510528',
          recipientCode: 'FLGKROWP',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '66554328912',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'Comune di Milano',
    urlLogo: 'image',
    partyId: '2',
    digitalAddress: 'comune.milano@pec.it',
    fiscalCode: 'fiscalCodeMilano',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId2',
    originId: 'originId2',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CGDAS23B',
    geographicTaxonomies: [], // Use case with no taxonomies
    vatNumber: '81001510528',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'Comune di Roma',
    urlLogo: 'image',
    partyId: '3',
    digitalAddress: 'comune.roma@pec.it',
    fiscalCode: 'fiscalCodeRoma',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId3',
    originId: 'originId3',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CGDAS23C',
    geographicTaxonomies: [
      // Use case with two taxonomies
      { code: '058091', desc: 'Roma - Comune' },
      { code: '015146', desc: 'Milano - Comune' },
    ],
    vatNumber: '111122211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '11111111111',
          recipientCode: 'CH435V',
          publicServices: true,
        },
      },
      {
        productId: 'prod-io-premium',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.PENDING,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '11111111111',
          recipientCode: 'CH435V',
          publicServices: true,
        },
      },
      // Use case with prod-interop and prod-interop-coll
      {
        productId: 'prod-interop',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3395867495',
          recipientCode: 'NBG455B',
          publicServices: true,
        },
      },
      {
        productId: 'prod-interop-coll',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3395867495',
          recipientCode: 'NBG455B',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'Comune di Napoli',
    urlLogo: 'image',
    partyId: '4',
    digitalAddress: 'comune.napoli@pec.it',
    fiscalCode: 'fiscalCodeNapoli',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId4',
    originId: 'originId4',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CGDAS23D',
    geographicTaxonomies: [
      { code: '5555678', desc: 'Comune di Milano' },
      { code: '8853441', desc: 'Comune di Roma' },
    ],
    vatNumber: '111122211111',
    // Use case with no onboarded products
    products: [],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'AGENCY ONBOARDED',
    urlLogo: 'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/onboarded/logo.png',
    partyId: 'onboarded',
    digitalAddress: 'comune.onboarded@pec.it',
    fiscalCode: 'fiscalCodeONBOARDED',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId5',
    originId: 'originId5',
    origin: 'MOCK',
    institutionType: 'GSP',
    recipientCode: 'CGDAS23E',
    geographicTaxonomies: [],
    vatNumber: '111122211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  // Use case of party with status "TOBEVALIDATED"
  {
    description: `Commissario straordinario per la realizzazione di approdi temporanei e di interventi complementari per la salvaguardia di Venezia e della sua laguna e ulteriori interventi per la salvaguardia della laguna di Venezia`,
    urlLogo: 'image',
    partyId: '5',
    digitalAddress: 'comune.veneto@pec.it',
    fiscalCode: 'fiscalCodeVeneto',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'GSP',
    recipientCode: 'CCBV421K',
    geographicTaxonomies: [],
    vatNumber: '111122211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'Scuola Media Oswald Von Wolkenstein di Bressa',
    urlLogo: 'image',
    partyId: '6',
    digitalAddress: 'comune.bressanone@pec.it',
    fiscalCode: '111122211111',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Gestore di servizi pubblici',
    externalId: 'externalId6',
    originId: 'originId6',
    origin: 'IPA',
    institutionType: 'GSP',
    recipientCode: 'CGDAS23F',
    geographicTaxonomies: [],
    vatNumber: '111122211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'Maggioli S.p.A.',
    urlLogo: 'image',
    partyId: '8',
    digitalAddress: 'maggioli.test@pec.it',
    fiscalCode: '111122211111',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Partner Tecnologico',
    externalId: 'externalId6',
    originId: 'originId6',
    origin: 'IPA',
    institutionType: 'PT',
    recipientCode: 'CGDAS23F',
    geographicTaxonomies: [
      // Use case with two taxonomies
      { code: '058091', desc: 'Roma - Comune' },
      { code: '015146', desc: 'Milano - Comune' },
    ],
    vatNumber: '111122211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  // Usable when not mocking the BE
  {
    partyId: 'f572bb09-b689-4785-8ea8-4c7a8b081998',
    externalId: '00856930102',
    originId: 'c_d969',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Comune di Genova',
    category: 'Comuni e loro Consorzi e Associazioni',
    fiscalCode: '00856930102',
    digitalAddress: 'comunegenova@postemailcertificata.it',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/f572bb09-b689-4785-8ea8-4c7a8b081998/logo.png',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    recipientCode: 'CGDAS23G',
    geographicTaxonomies: [],
    vatNumber: '222222211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  // Usable when not mocking the BE
  {
    partyId: '7784b9d3-e834-4342-a6ef-d0566b058af2',
    externalId: '00441340122',
    originId: 'c_l682',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Comune di Varese',
    category: 'Comuni e loro Consorzi e Associazioni',
    fiscalCode: '00441340122',
    digitalAddress: 'protocollo@comune.varese.legalmail.it',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/7784b9d3-e834-4342-a6ef-d0566b058af2/logo.png',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    recipientCode: 'CGDAS23V',
    geographicTaxonomies: [],
    vatNumber: '111122291111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  // Mock with institutionType = PSP
  {
    partyId: '9999b9b9-e111-2222-b1bb-d0566b058af2',
    externalId: '00348170101',
    originId: 'c_9999',
    origin: 'SELC',
    institutionType: 'PSP',
    description: 'Unicredit',
    category: 'Intermediario',
    fiscalCode: '00348170101',
    digitalAddress: 'protocollo@unicredit.legalmail.it',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/7784b9d3-e834-4342-a6ef-d0566b058af2/logo.png',
    registeredOffice: 'Piazza Gae Aulenti, 3 - Tower A',
    zipCode: '20154',
    typology: 'Prestatore di Servizi a Pagamento',
    recipientCode: 'GGDAS99T',
    geographicTaxonomies: [],
    vatNumber: '111122211111',
    products: [
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3333',
          recipientCode: 'dddd',
          publicServices: true,
        },
      },
    ],
    status: undefined,
    userRole: undefined,
  },
];

export const mockedGeotaxonomies: Array<GeographicTaxonomy> = [
  {
    desc: 'ROMA - COMUNE',
    code: '1111',
  },
  {
    desc: 'ROMA - PROVINCIA',
    code: '1112',
  },
  {
    desc: 'MILANO - COMUNE',
    code: '2222',
  },
  {
    desc: 'NAPOLI - COMUNE',
    code: '3333',
  },
];

export const verifyFetchPartiesMockExecution = (parties: Array<Party>) => {
  expect(parties).toStrictEqual(mockedParties);
};

export const fetchParties = () => new Promise((resolve) => resolve(mockedParties));

export const verifyFetchPartyDetailsMockExecution = (party: Party) => {
  expect(party).toStrictEqual(mockedParties.filter((p) => p.partyId === party.partyId)[0]);
};

export const fetchPartyDetails = (
  partyId: string,
  _parties?: Array<Party>
): Promise<Party | null> =>
  new Promise((resolve) => resolve(mockedParties.find((p) => p.partyId === partyId) ?? null));
