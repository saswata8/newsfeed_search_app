import { UserDashboardPage } from "./user-dashboard.po";
import { browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

xdescribe('user-dashboard component running',()=>
{
    let dashboard : UserDashboardPage

    beforeEach(() =>
    {
        dashboard = new UserDashboardPage();
        dashboard.navigateTo();
    })

    it('check user-dashboard navbar-header',()=>{
        expect(dashboard.getNavbarHeaderText()).toEqual('   BREAKING NEWS');
    })
})