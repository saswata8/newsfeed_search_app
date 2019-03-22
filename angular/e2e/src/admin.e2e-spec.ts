import { AdminDashboard } from "./admin.po";
import { browser, protractor } from 'protractor';

describe('admin component tests',()=>{
    let admin : AdminDashboard;

    beforeEach(()=>{
        admin = new AdminDashboard();
        admin.navigateTo();
    })

    it('check admin login with valid data and access admin services',()=>{
        admin.setEmail('admin@gmail.com');
        admin.setPassword('Admin@123');
        admin.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Succcessfully logged in!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/admin-dashboard');

        expect(admin.getTable().isPresent()).toBeTruthy();

        admin.setSearch('hada');
        admin.clickSearchButton();
        expect(admin.getTable().isPresent()).toBeTruthy();

        admin.clickTableButton();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),2000);
        expect(browser.switchTo().alert().getText()).toEqual("User blacklisted!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/admin-dashboard');
    })

    it('check admin logout',()=>{
        admin.setEmail('admin@gmail.com');
        admin.setPassword('Admin@123');
        admin.clickLogin();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Succcessfully logged in!");
        browser.switchTo().alert().accept();

        admin.clickLogout();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
    })
})