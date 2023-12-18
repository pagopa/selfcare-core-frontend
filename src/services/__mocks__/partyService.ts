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
    partyId: '6',
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
  {
    partyId: '9',
    description: 'Test GSP 9',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '10',
    description: 'Comune di Viterbo',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '11',
    description: 'Comune di Cernusco sul Naviglio',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '072b11f1-5bca-4fc5-9fe2-2c646f51e4bf',
    description: 'Test PT 12',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '133',
    description: 'Prova SA',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '134',
    description: 'Prova AS',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '28',
    description: 'Comune di Cagliari',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '29',
    description: 'Comune di Carbonia',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '44',
    description: 'Comune di Genova',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '45',
    description: 'Comune di Varese',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '5dbec5e1-4262-4d00-a493-916e6171856a',
    description: 'Asea Azienda Speciale',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '2222222',
    description: 'Test Metropolitane',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '3333333',
    description: 'Test Province Autonome',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '9999b9b9-e111-2222-b1bb-d0566b058af2',
    description: 'Credit payment',
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
    geographicTaxonomies: undefined,
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
    institutionType: 'PG',
    recipientCode: 'CGDAS23C',
    geographicTaxonomies: [
      // Use case with two taxonomies
      { code: '058091', desc: 'Roma - Comune' },
      { code: '015146', desc: 'Milano - Comune' },
    ],
    vatNumber: '111122211111',
    products: [
      // Use case with one delegable product
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
        productId: 'prod-pagopa',
        authorized: false,
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
        authorized: false,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
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
        productId: 'prod-pn',
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
    products: [
      {
        productId: 'prod-pn',
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
    geographicTaxonomies: [{ code: '5555678', desc: 'Comune di Milano' }],
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
    geographicTaxonomies: [{ code: '5555678', desc: 'Comune di Milano' }],
    vatNumber: '111122211111',
    products: [
      // use case having product but not subproduct
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
    partyId: '44',
    externalId: '234562233344',
    originId: 'c_d969',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Comune di Genova',
    category: 'Comuni e loro Consorzi e Associazioni',
    fiscalCode: '234562233344',
    digitalAddress: 'comunegenovatest@pec.it',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/44-b689-4785-8ea8-4c7a8b081998/logo.png',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    recipientCode: 'CGDAS23G',
    geographicTaxonomies: [
      { code: '058091', desc: 'Roma - Comune' },
      { code: '015146', desc: 'Milano - Comune' },
    ],
    vatNumber: '222222211111',
    products: [
      {
        productId: 'prod-io',
        authorized: false,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      // use case with onboarding not completed yet
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.PENDING,
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
    partyId: '45',
    externalId: '2233445121213',
    originId: 'c_l682',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Comune di Varese',
    category: 'Comuni e loro Consorzi e Associazioni',
    fiscalCode: '2233445121213',
    digitalAddress: 'comunevaresemockmailtest@email.it',
    urlLogo: 'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/45/logo.png',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    recipientCode: 'CGDAS23V',
    geographicTaxonomies: [{ code: '058091', desc: 'Roma - Comune' }],
    vatNumber: '111122291111',
    products: [
      {
        productId: 'prod-pagopa',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '2222',
          recipientCode: 'cccc',
          publicServices: true,
        },
      },
      // use case with onboarding not completed yet
      {
        productId: 'prod-pn',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.TOBEVALIDATED,
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
    description: 'Credit payment',
    category: 'Intermediario',
    fiscalCode: '00348170101',
    digitalAddress: 'creditpayment@mockmail.com',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/7784b9d3-e834-4342-a6ef-d0566b058af2/logo.png',
    registeredOffice: 'Piazza Gae Aulenti, 3 - Tower A',
    zipCode: '20154',
    typology: 'Prestatore Servizi Pagamento',
    recipientCode: 'GGDAS99T',
    geographicTaxonomies: [{ code: '058091', desc: 'Roma - Comune' }],
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
    ],
    status: undefined,
    userRole: undefined,
  },
  // Mock with institutionType = GSP and prod-pagopa
  {
    description: 'Test GSP 9',
    urlLogo: 'image',
    partyId: '13',
    digitalAddress: 'comune.bari@pec.it',
    fiscalCode: '111111111111',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Gestore Servizi Pagamenti',
    externalId: 'externalId1GSP',
    originId: 'originId1GSP',
    origin: 'IPA',
    institutionType: 'GSP',
    recipientCode: 'CGDAS23A',
    geographicTaxonomies: [{ code: '058091', desc: 'Roma - Comune' }], // Use case with one taxonomy
    vatNumber: '111111111141',
    supportEmail: '',
    products: [
      {
        productId: 'prod-pagopa',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
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
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    description: 'Comune di Viterbo',
    urlLogo: 'image',
    partyId: '10',
    digitalAddress: 'comune.bari@pec.it',
    fiscalCode: '111111111111',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Prestatore Servizi Pagamento',
    externalId: 'externalId1PSP',
    originId: 'originId1PSP',
    origin: 'IPA',
    institutionType: 'PSP',
    recipientCode: 'CGDAS23A',
    geographicTaxonomies: [{ code: '058091', desc: 'Roma - Comune' }], // Use case with one taxonomy
    vatNumber: '111111111141',
    supportEmail: '',
    products: [
      {
        productId: 'prod-pagopa',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
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
      // Use case with only prod-interop
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
    ],
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    description: 'Comune di Cernusco sul Naviglio',
    urlLogo: 'image',
    partyId: '11',
    digitalAddress: 'comune.cernusco@pec.it',
    fiscalCode: '76859430212',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Piazza della Scala, 2',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: '36',
    originId: '46',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CGDDS33A',
    geographicTaxonomies: [
      { code: '32356', desc: 'Milano - Comune' },
      { code: '456723', desc: 'Carugate - Comune' },
      { code: '665543', desc: 'Cernusco sul Naviglio - Comune' },
    ], // Use case with three taxonomy
    vatNumber: '34434356575',
    supportEmail: '',
    products: [
      // Use case with two delegable products
      {
        productId: 'prod-io',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '81001510528',
          recipientCode: 'BBGG34D',
          publicServices: true,
        },
      },
      // Use case with only prod-interop-coll
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
      // Use case with same product but one in onboardingStatus REJECTED and one in onboardingStatus ACTIVE
      {
        productId: 'prod-ciban',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '81001510528',
          recipientCode: 'DDFFRT',
          publicServices: true,
        },
      },
      {
        productId: 'prod-ciban',
        authorized: true,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.REJECTED,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '81001510528',
          recipientCode: 'DDFFRT',
          publicServices: true,
        },
      },
    ],
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    description: 'Comune di Cagliari',
    urlLogo: 'image',
    partyId: '28',
    digitalAddress: 'comune.cagliari@pec.it',
    fiscalCode: 'fiscalCodeCagliari',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Via Luigi Crespellani',
    zipCode: '20121',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId28',
    originId: 'originId28',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CGBBS23C',
    geographicTaxonomies: [
      // Use case with one taxonomy
      { code: '077091', desc: 'Cagliari - Comune' },
    ],
    vatNumber: '87485839212',
    products: [
      {
        productId: 'prod-interop',
        authorized: false,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'g_43c42',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.DELETED,
      },
      {
        productId: 'prod-pagopa',
        authorized: false,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'SDISDI',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-interop',
        authorized: false,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'g_43c42',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.REJECTED,
      },
      {
        productId: 'prod-pn',
        authorized: false,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'CODSDI',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.REJECTED,
      },
      {
        productId: 'prod-io',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'ber4',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-pn',
        authorized: false,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'CODSDI',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-io-premium',
        authorized: false,
        billing: {
          vatNumber: '00471320184',
          recipientCode: 'ber4',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  {
    description: 'Comune di Carbonia',
    urlLogo: 'image',
    partyId: '29',
    digitalAddress: 'comune.carbonia@pec.it',
    fiscalCode: 'fiscalCodeCarbonia',
    category: 'Comuni e loro Consorzi e Associazioni',
    registeredOffice: 'Via Luigi Crespellani',
    zipCode: '20334',
    typology: 'Pubblica Amministrazione',
    externalId: 'externalId29',
    originId: 'originId29',
    origin: 'IPA',
    institutionType: 'PA',
    recipientCode: 'CEDBS23C',
    geographicTaxonomies: [
      // Use case with one taxonomy
      { code: '938465', desc: 'Cagliari - Comune' },
    ],
    vatNumber: '87659012374',
    products: [
      // Use case with prod-interop with authorized true and prod-interop-coll with authorized false
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
        authorized: false,
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
        userRole: 'ADMIN',
        billing: {
          vatNumber: '3395867495',
          recipientCode: 'NBG455B',
          publicServices: true,
        },
      },
      {
        productId: 'prod-io',
        userRole: 'ADMIN',
        authorized: false,
        billing: {
          vatNumber: '94287592749',
          recipientCode: 'c_b988',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
    status: undefined,
    userRole: undefined,
  },
  // Test PT with multiple products delegated
  {
    partyId: '072b11f1-5bca-4fc5-9fe2-2c646f51e4bf',
    externalId: '94287592749',
    originId: 'PT_94287592749',
    origin: 'SELC',
    institutionType: 'PT',
    typology: 'Partner tecnologico',
    description: 'Prova PT ',
    fiscalCode: '94287592749',
    digitalAddress: 'pectest@pec.test.it',
    registeredOffice: 'Milano',
    zipCode: '48294',
    geographicTaxonomies: [
      {
        code: '058091',
        desc: 'Roma - Comune',
      },
    ],
    products: [
      {
        productId: 'prod-io',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '94287592749',
          recipientCode: 'c_b988',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-io-premium',
        authorized: false,
        billing: {
          vatNumber: '94287592749',
          recipientCode: 'c_b988',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
  },
  // Test SA with multiple products delegated
  {
    partyId: '133',
    externalId: '94287592722',
    originId: 'SA_94287592722',
    origin: 'ANAC',
    institutionType: 'SA',
    typology: 'Gestore privato di piattaforma e-procurement',
    description: 'Prova SA',
    fiscalCode: '94287592722',
    digitalAddress: 'pectest@pec.test.it',
    registeredOffice: 'Milano',
    zipCode: '48294',
    geographicTaxonomies: [],
    products: [
      {
        productId: 'prod-interop',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '94287592722',
          recipientCode: 'c_b988',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
  },
  // Test AS insurance company
  {
    partyId: '134',
    externalId: '94287592722',
    originId: 'IVASS',
    origin: 'IVASS',
    institutionType: 'AS',
    typology: 'Società di assicurazione',
    description: 'Prova AS',
    fiscalCode: '94287592722',
    digitalAddress: 'pectest@pec.test.it',
    registeredOffice: 'Milano',
    zipCode: '48294',
    geographicTaxonomies: [],
    products: [
      {
        productId: 'prod-interop',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '94287592722',
          recipientCode: 'c_b988',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
  },
  {
    partyId: '5dbec5e1-4262-4d00-a493-916e6171856a',
    externalId: '01378640625',
    originId: 'aasp',
    origin: 'IPA',
    institutionType: 'GSP',
    description: 'Asea Azienda Speciale',
    typology: 'Gestore di Pubblici Servizi',
    category: 'Gestori di Pubblici Servizi',
    fiscalCode: '01378640625',
    digitalAddress: 'infoasea@legalmail.it',
    registeredOffice: 'Rocca Dei Rettori, p.zza Castello',
    zipCode: '82100',
    geographicTaxonomies: [
      {
        code: 'ITA',
        desc: 'ITALIA',
      },
    ],
    products: [
      {
        productId: 'prod-interop',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '01378640625',
          recipientCode: 'codsdi',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-interop-coll',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '01378640625',
          recipientCode: 'codsdi',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
  },
  {
    partyId: '2222222',
    externalId: '01378640625',
    originId: 'aasp',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Test Province Autonome',
    typology: 'Publica Amministrazione',
    category: 'Regioni, Province Autonome e loro Consorzi e Associazioni',
    fiscalCode: '01378640625',
    digitalAddress: 'infoasea@legalmail.it',
    registeredOffice: 'Rocca Dei Rettori, p.zza Castello',
    zipCode: '82100',
    geographicTaxonomies: [
      {
        code: 'ITA',
        desc: 'ITALIA',
      },
    ],
    products: [
      {
        productId: 'prod-interop',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '01378640625',
          recipientCode: 'codsdi',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-interop-coll',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '01378640625',
          recipientCode: 'codsdi',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
  },
  {
    partyId: '3333333',
    externalId: '01378640625',
    originId: 'aasp',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Test Metropolitane',
    typology: 'Publica Amministrazione',
    category: "Citta' Metropolitane",
    fiscalCode: '01378640625',
    digitalAddress: 'infoasea@legalmail.it',
    registeredOffice: 'Rocca Dei Rettori, p.zza Castello',
    zipCode: '82100',
    geographicTaxonomies: [
      {
        code: 'ITA',
        desc: 'ITALIA',
      },
    ],
    products: [
      {
        productId: 'prod-interop',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '01378640625',
          recipientCode: 'codsdi',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
      {
        productId: 'prod-interop-coll',
        userRole: 'ADMIN',
        authorized: true,
        billing: {
          vatNumber: '01378640625',
          recipientCode: 'codsdi',
          publicServices: false,
        },
        productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      },
    ],
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
