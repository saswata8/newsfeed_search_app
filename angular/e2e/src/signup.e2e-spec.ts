import { signupPage } from "./signup.po";
import { browser, protractor } from 'protractor';

fdescribe('signup Component running',()=>{
    let signup: signupPage;
    
    beforeEach(()=>
    {
        signup = new signupPage();
        signup.navigateTo();
    });

    it('signup component header should display Register',()=>
    {
        expect(signup.getTitleText()).toEqual('News Analyst Registration');
    });

    it('signup component should display para',()=>
    {
        expect(signup.getParaText()).toEqual('Please fill in this form to create an account. All fields are mandatory.');
    });


    it('check register with new data',()=>
    {
        signup.setName('Saswata');
        signup.setEmail("test"+Math.floor(Math.random()*67).toString()+"@gmail.com");
        signup.setPassword('Saswata@123');
        signup.clickRegister();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),2000);
        expect(browser.switchTo().alert().getText()).toEqual("User successfully registered! Please login!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
    });

    it('check register with already existing data',()=>
    {
        signup.setName('Saswata');
        signup.setEmail('saswata.ch@gmail.com');
        signup.setPassword('Saswata@123');
        signup.clickRegister();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),2000);
        expect(browser.switchTo().alert().getText()).toEqual("User already exists! Please login!");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
    })

    xit('check user signup when server is down',()=>{
        signup.setName('Saswata');
        signup.setEmail('cts@gmail.com');
        signup.setPassword('Admin@123');
        signup.clickRegister();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(),10000);
        expect(browser.switchTo().alert().getText()).toEqual("Something went wrong! Please try again later.");
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
    })
})