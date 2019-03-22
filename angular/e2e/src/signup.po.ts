import { browser, by, element } from 'protractor';

export class signupPage
{
    navigateTo()
    {
        return browser.get('/');
    }

    getTitleText()
    {
        return element(by.css('h1')).getText();
    }

    getParaText()
    {
        return element(by.css('p')).getText();
    }

    setName(name:string)
    {
        element(by.id('name')).clear();
        element(by.id('name')).sendKeys(name);
    }

    setEmail(email:string)
    {
        element(by.id('email')).clear();
        element(by.id('email')).sendKeys(email);
    }

    setPassword(password:string)
    {
        element(by.id('password')).clear();
        element(by.id('password')).sendKeys(password);
    }

    clickRegister()
    {
        element(by.id('register')).click();
    }
}