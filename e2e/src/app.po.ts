import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(): any {
        return browser.get('/');
    }

    getParagraphText(): any {
        return element(by.deepCss('app-root ion-content')).getText();
    }
}
