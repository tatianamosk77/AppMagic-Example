import {Page, Locator} from "@playwright/test";

export class AppsPage{
    page: Page;
    geographySelector: Locator;
    inputSelector: Locator;
    searchResult: Locator;
    selectedCountry: Locator;
    noDataStatement: Locator;
    selectorPanel: Locator;
    centerOfPage: Locator;

    // Инициализируем объект сразу с набором локаторов через конструктор
    constructor(page){ 
        this.page = page; 
        this.geographySelector = page.locator(`//span[contains(text(), 'Geography')]/following::*[1]`);
        this.inputSelector = page.locator(`//input[@name = 'selector_input']`);
        this.noDataStatement = page.locator(`div .no-data`)
        this.selectorPanel = page.locator(`country-single-select-panel`)
        this.centerOfPage = page.locator('.am-dropdown-backdrop')
    }

   // Функция клика по селектору со страной
    async clickCountrySelector(){
        await this.geographySelector.click();
    }

    // Функция ввода страны в инпут
    async typeCountry(country){
        await this.inputSelector.fill(country)
    }

   // Функция выбора страны из результатов
    async chooseCountry(country) {
        await this.page.getByText(country).click()
    }

   // Функция клика посередине страницы (для закрытия окошка с выбором страны)
    async clickOutside() {
        await this.centerOfPage.click()
    }

}