import { browser, by, element } from 'protractor';

export class UserDashboardPage
{
    navigateTo()
    {
        return browser.get('user-dashboard');
    }

    getNavbarHeaderText()
    {
        return element(by.className('navbar-header')).getText();
    }
}