import { browser, element, by } from 'protractor';

export class AdminDashboard
{
    navigateTo()
    {
        browser.get('login');
    }

    setEmail(email:string)
    {
        return element(by.id('email')).sendKeys(email);
    }

    setPassword(password:string)
    {
        return element(by.id('password')).sendKeys(password);
    }

    clickLogin()
    {
        element(by.id('loginbtn')).click();
    }

    setSearch(search:string)
    {
        return element(by.id('search')).sendKeys(search);
    }

    clickSearchButton()
    {
        element(by.id('searchbtn')).click();
    }

    getTable()
    {
        return element(by.css('table'));
    }

    getTableRows()
    {
        return this.getTable().all(by.css('tr')).first();
    }

    getTableCell()
    {
        return this.getTableRows().all(by.css('td'));
    }

    clickTableButton()
    {
        this.getTableCell().all(by.css('button')).click();
    }

    clickLogout()
    {
        element(by.css('logout')).click();
    }
}