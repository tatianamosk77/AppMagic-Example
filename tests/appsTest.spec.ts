import { test, expect } from '@playwright/test';
import {AppsPage} from '../pages/appsPage';

// Импортируем функцию для генерации рандомного текста для ТК №6
import {makeId} from '../helpers/stringGeneration'

// Обобщаем 6 тестов в один сьют, связанный с выбором страны
test.describe("Geography selector tests", async () => {
  // Перед каждым тестом открываем URL
  test.beforeEach("Open URL", async ({page}) => {
    await page.goto("https://appmagic.rocks/top-charts/apps");

  });

//  Проверка на то, что в селекте отображается действительно выбранная нами страна
test('TC #1. Check the filled country in geography selector', async ({ page }) => {
  //...например, Индия
  const country = 'India'
  const appsPage = new AppsPage(page);

  // Кликаем на селектор с выбором страны
  await appsPage.clickCountrySelector()

  // Печатаем страну
  await appsPage.typeCountry(country)

  // Выбираем ее из списка кликом
  await appsPage.chooseCountry(country)

// Сравниваем присвоенный селектору текст с введенной нами страной
  await expect(appsPage.geographySelector).toContainText(country)

});

// Проверка на то, что при повторном нажатии на селектор после выбора страны - инпут пустой
test('TC #2. Check that country input is cleared', async ({ page }) => {
  const country = 'India'
  const appsPage = new AppsPage(page);
  
  await appsPage.clickCountrySelector()
  await appsPage.typeCountry(country)
  await appsPage.chooseCountry(country)

  // Кликаем снова на наш селектор с ранее выбранной страной
  await appsPage.clickCountrySelector()

  // Проверка на то, что инпут пуст
  await expect(appsPage.inputSelector).toBeEmpty()

});

// Проверяем и скриним no data состояние при невалидных данных в поиске страны
test(`TC #3. Screen 'no data' statement after invalid filling`, async ({ page }) => {
  // ну и дела..
  const invalidCountry = 'JavaScript'
  const appsPage = new AppsPage(page);
  
  await appsPage.clickCountrySelector()
  await appsPage.typeCountry(invalidCountry)
  
  // Скриним конкретно панель с выбором страны, а не всю страницу
  await appsPage.selectorPanel.screenshot({ path: 'screenshot.png' });

  // Проверяем отображаемый текст об отсутствии каких либо результатов поиска
  await expect(appsPage.noDataStatement).toHaveText('Nothing to display')

});

// Проверяем возможность закрыть окно с выбором страны через кнопку клавиатуры [Esc]
test('TC #4.Check if the selectorPanel can be closed by [Esc]', async ({ page }) => {
  const appsPage = new AppsPage(page);
  
  await appsPage.clickCountrySelector()

  // Клик кнопкой [Esc]
  await page.keyboard.press('Escape');

 // Проверка на то, что окошко с выбором страны визуально не отображается на странице
  await expect(appsPage.selectorPanel).not.toBeVisible()

});

// Проверяем возможность закрыть окно с выбором страны, если кликнуть вне окна
test('TC #5. Check if the selectorPanel can be closed by click outside', async ({ page }) => {
  const appsPage = new AppsPage(page);
  
  await appsPage.clickCountrySelector()
  await appsPage.clickOutside() 

 // Проверка на то, что окошко с выбором страны визуально не отображается на странице
  await expect(appsPage.selectorPanel).not.toBeVisible()

});

// Проверка лимита вводимых символов в инпут выбора страны
test('TC #6. Check a limit of letters in country input', async ({ page }) => {

  const appsPage = new AppsPage(page);
  
  await appsPage.clickCountrySelector()

  // Генерим текст из рандомного кол-ва букв и длина текста = 256
  await appsPage.typeCountry(makeId(256))

  // Вычисляем длину текста в инпуте
  const filledText = await appsPage.inputSelector.inputValue()
  
  // Проверка, что длина текста в инпуте = 255
  await expect(filledText).toHaveLength(255)

});
});
