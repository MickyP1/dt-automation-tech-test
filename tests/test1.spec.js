const {test, expect } = require('@playwright/test');

test.describe("User sees deals on the mobile shop page ", async() => {
    test('Navigate to Deals Page', async({page}) => {
        await page.goto('https://www.sky.com/shop/mobile/phones', {waitUntil: "domcontentloaded"});
       // await page.frameLocator("#sp_message_iframe_474555").locator("text=Agree").click();
        
            await page.waitForTimeout(10000);
            const list = await page.$$('//*[@data-test-id="mobile-product-grid"]');
            console.log("list:"+list);
       
    })
})
