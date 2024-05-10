const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { password } = require('./user.js');
const { email } = require('./user.js');

test("successfulAuthorization", async () => {
  test.slow();
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder('Email').fill(email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page).toHaveURL("https://netology.ru/profile/8738514");
  await expect(page).toHaveTitle('Моё обучение');
  await page.screenshot({ path: 'successScreenshot.png'});
  await browser.close();
});

test("unsuccessfulAuthorization", async () => {
  test.slow();
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder('Email').fill('tino4ka@mail.ru');
  await page.fill('[placeholder="Пароль"]', '123');
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
  await page.screenshot({ path: 'unsuccessScreenshot.png' });
  await browser.close();
});