import { LoginPage } from "./login.po";
import { browser, protractor } from 'protractor';

describe('login component tests',()=>{
    let loginPage : LoginPage

    beforeEach(()=>
    {
        loginPage = new LoginPage();
        loginPage.navigateTo();
    })

    it('check login heading',()=>{
        expect(loginPage.getTitletext()).toEqual('News Analyst Login');
    })

    it('check login para',()=>{
        expect(loginPage.getParaText()).toEqual('Login to your account. All fields are mandatory.');
    })

    it('check user login with valid data, access search history and delete search history',()=>{
        loginPage.setEmail('cts@gmail.com');
        loginPage.setPassword('Admin@123');
        loginPage.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Succcessfully logged in!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/user-dashboard');

        loginPage.clickSearchHistory();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/search-history');
        expect(loginPage.getTable().isPresent()).toBeTruthy();

        loginPage.clickTableButton();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Search deleted successfully!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/search-history');

        loginPage.clickSearchNews();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/user-dashboard');
    })

    it('check user login with invalid data',()=>{
        loginPage.setEmail('cts@gmail.com');
        loginPage.setPassword('jdfuisfhjkshnkhd');
        loginPage.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Please provide correct email/password!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
    })

    it('check user login for blacklisted user',()=>{
        loginPage.setEmail('hada2@gmail.com');
        loginPage.setPassword('Admin@123');
        loginPage.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Sorry! You are blacklisted! Please contact admin!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
    })

    xit('check user login when server is down',()=>{
        loginPage.setEmail('cts@gmail.com');
        loginPage.setPassword('Admin@123');
        loginPage.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Something went wrong! Please try again later.");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
    })

    it('check user logout',()=>{
        loginPage.setEmail('cts@gmail.com');
        loginPage.setPassword('Admin@123');
        loginPage.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Succcessfully logged in!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/user-dashboard');

        loginPage.clickLogout();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
    })
})