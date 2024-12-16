import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dev.selfcare.pagopa.it/auth/login?onSuccess=%2F');
  await page.getByRole('button', { name: 'Accetta tutti' }).click();
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByLabel('test').click();
  await page.getByLabel('Username').fill('msisti');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByRole('button', { name: 'Anpal Servizi SpA.' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Gestisci i dati dell’ente' }).click();
  await expect(page.locator('body')).toContainText('italia');
  await page.getByRole('button').nth(3).click();
  await page.getByLabel('Locale').check();
  await page.getByLabel('Comune, Provincia o Regione').click();
  await page.getByLabel('Comune, Provincia o Regione').fill('Milan');
  await page.getByRole('option', { name: 'milano - comune' }).click();
  await page.getByRole('button', { name: 'Modifica' }).click();
  await expect(page.locator('body')).toContainText('milano - comune');
  await page.getByRole('button').nth(3).click();
  await page.getByLabel('Nazionale').check();
  await page.getByRole('button', { name: 'Modifica' }).click();
  await expect(page.locator('body')).toContainText('italia');
  await page.getByTestId('close-modal-test').click();
});