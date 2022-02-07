import { Product } from '../../model/Product';

export const mockedPartyProducts: Array<Product> = [
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-io/logo.png', // TODO check if correct value
    title: 'App IO',
    description: 'App IO description',
    id: 'prod-io',
    authorized: true,
    status: 'ACTIVE',
    userRole: 'ADMIN',
    activationDateTime: new Date(2021, 1, 1),
    urlPublic: 'https://io.italia.it/ ',
    urlBO: 'https://io.selfcare.pagopa.it/path/acs?token=<IdentityToken>',
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.png', // TODO check if correct value
    id: 'prod-pn',
    title: 'Piattaforma Notifiche',
    description: 'Piattaforma Notifiche description',
    authorized: false,
    status: 'ACTIVE',
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    activationDateTime: new Date(2021, 1, 2),
    urlPublic: 'http://notifiche/public',
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pagopa/logo.png', // TODO check if correct value
    id: 'prod-pagopa',
    title: 'Pagamenti pagoPA',
    description: 'Pagamenti pagoPA description',
    authorized: true,
    tag: 'Vecchio Portale',
    status: 'ACTIVE',
    urlBO: 'http://pagopa/bo#token=<IdentityToken>',
    activationDateTime: new Date(2021, 1, 3),
    urlPublic: 'http://pagopa/public',
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-ciban/logo.png', // TODO check if correct value
    title: 'Check-IBAN',
    description: "Verifica l'abbinamento di un IBAN ad un CF di un cittadino o di un'impresa.",
    id: 'prod-ciban',
    authorized: false,
    status: 'PENDING',
    urlBO: 'http://checkiban/bo#token=<IdentityToken>',
    urlPublic: 'http://www.google.it',
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-cgn/logo.png', // TODO check if correct value
    id: 'prod-cgn',
    title: 'Carta Giovani',
    description: 'Richiedi la convenzione e gestisci i dati e le agevolazioni da offrire.',
    urlBO: 'http://cgn/bo#token=<IdentityToken>',
    authorized: false,
    status: 'INACTIVE',
    urlPublic: undefined,
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-interop/logo.png', // TODO check if correct value
    id: 'prod-interop',
    title: 'PDND',
    description: 'Condividi dati con altri Enti in maniera semplice, sicura ed economica.',
    urlBO: 'http://PDND/bo#token=<IdentityToken>',
    authorized: false,
    status: 'INACTIVE',
    urlPublic: undefined,
  },
];

export const verifyFetchPartyProductsMockExecution = (partyProducts: Array<Product>) => {
  expect(partyProducts).toStrictEqual(mockedPartyProducts);
};

export const fetchProducts = () => new Promise((resolve) => resolve(mockedPartyProducts));
