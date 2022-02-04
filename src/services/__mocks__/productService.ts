import { Product } from '../../model/Product';

export const mockedPartyProducts: Array<Product> = [
  {
    logo: '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',
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
    logo: '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',
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
    logo: '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',
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
    logo: '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',
    title: 'Check-IBAN',
    description: "Verifica l'abbinamento di un IBAN ad un CF di un cittadino o di un'impresa.",
    id: 'prod-ciban',
    authorized: false,
    status: 'PENDING',
    urlBO: 'http://checkiban/bo#token=<IdentityToken>',
    urlPublic: 'http://www.google.it',
  },
  {
    logo: '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',
    id: 'prod-cgn',
    title: 'Carta Giovani',
    description: 'Richiedi la convenzione e gestisci i dati e le agevolazioni da offrire.',
    urlBO: 'http://cgn/bo#token=<IdentityToken>',
    authorized: false,
    status: 'INACTIVE',
    urlPublic: undefined,
  },
  {
    logo: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARcSURBVHgB7ZtbUtswFIZ/2WHoW/Pau7uClhUAK4CuoHQFhMs78B4grKCwAmAFSVcAXQHucHtNnzpAbPVIJrEdsCxHcepO9M0kM4p1Eh9Z0jm/DjAIGpcLcJiHLFjYRRCco/XRx/9A46IOZ2ZZ2Uf4tPv+hGH9Zh8MDeTjI7ibo0Hooups3FzQu6fR88TRdB7RF9Y+o+ps0mzWc16w7GDKYTRdeNzi5wj5Qdx2lug9uZY64MxHlWGsDoTJez4BD0/j684WEjOkljLmrIu9N4eD9vq1R1+Y/LIFGiRUm6H74/wn9t4eDtobt1/pQ6/fnPolMPUDUCvWnX9BcH+OKuPM0DJ1vut2LzYAASUPVU+GNi99FNim7B6AKafgHpCBzL1frFJWsfIYYihddjoIHg7QeteRWsOtUfzlIpOsU79zcOcQwZ9T2VdlWzLmA9C49eDydjK2QjgpkhHXXaa426FrC6n4zEEDEbbgzj6m4Rm267fb2Hu1gxIxXwLSeVXuLZzPxIPKlvFtEmu6WmUkis0Ah32m6Zxo1+aHnp6Aprec5t4z39CV10VG+TxPbRm26Df1Qy+f+UQzSLt7sQFgzj7c1K8NXccamq9bck9wZ4+RdJSTnA4f5fTGNaXX7FjTltpuG9roOy8YZxTwpQMC4SQPj9KXw53BWcLumxPy2Ne3LY9xDoBHT88btJg7n7rKWNwWG2d66ahtS6RoKnxIU/nXoBk5tTBou7NtUpBH5MCnIUkqOq/Q1Bc29IT50+MqlS3n+pGAOR/IYEW3e9FU+CgVm6MQeAYZuiRCPm9lr0MahOw0NcM2PCA5uw1dxIkQd1d0u5stgdYryrvDNZQGHdAED9soEfM9QBw2sGARUXhL0qU4voOAfZRPMQqBSTrSTml7v1j2Iex4UuGmXBZzcknUeh56tM7x4CduviFf0YEl0Ov5Q6pSZVsq4xmAPmJJiJCWRVOR2+fZloSVw5hyxrsEsjCRwyrbMZxOlT8DNm+3olxeqsIoX4jlcJteZ1L1xZlhXw63SUq3lbbJ7HFEyh2A9StKfIRzmXgwkdLRINRhgJkcziOqwiQpLofVthQ6Z4Vcjis/k5XDBRhdDqttOeUXrps4NPl3cjgHEzmstDVicgNgIofVtkaYyeE8pLobNEaXw2rbDn32I+46STmcx8YV7dDOavzBKHJYadtFcPctlQ9MVA7nEUnZ8mqJQoobJkPlDoDYuIK7xdHlcI6UTtb9R6T8VDjavU3kcJ6tEZPRAn1M5HCznDKZlcOYcmx1GKbY6rCtDntDvWx12FaHbXUYtjpsq8PP352tDhfDVodtdbhsbHUYU46Vw4V6u+4xqbuJrM2R4YM3LYruARTvuVExsmrYJTDUrqdycoe9HJpNPqpPHXFmGvmg+DuC9D9O5hFQ0jKBYyojolRYWz7bMIhCpSvK4KpOryf80YtUdEjDIkUXNMBprahwSAk2Kz79+4gTJ44lZR/Gf5PQav0Fqlrm22X6B50AAAAASUVORK5CYII=',
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
