import { browser, element, by } from 'protractor';

export class LoginPage
{
    navigateTo()
    {
        browser.get('login');
    }

    getTitletext()
    {
        return element(by.css('h1')).getText();
    }

    getParaText()
    {
        return element(by.css('p')).getText();
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

    clickSearchHistory()
    {
        element(by.id('searchHistory')).click();
    }

    clickSearchNews()
    {
        element(by.id('searchNews')).click();
    }

    clickLogout()
    {
        element(by.id('logout')).click();
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
}