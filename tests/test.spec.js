const {test, expect } = require('@playwright/test');

test.describe("This feature will make sure that the shop page is navigable and usable", async() => {
    test('Navigate to Deals Page', async({page}) => {
        await page.goto('https://sky.com', {waitUntil: "domcontentloaded"});
        await page.frameLocator("#sp_message_iframe_474555").locator("text=Agree").click();
        await page.locator('[data-test-id="primary-nav-list"] >> text="Deals"').click();
         expect(page.url()).toContain('https://www.sky.com/deals', 'deal url does not match');
    })

    test('Deals Page contains deal inages and prices', async({page}) => {
        const homeHero = page.locator('[data-test-id="mobile-home-hero"]')
        const imageHero = page.locator('//*[@id="tabs-id_1-article-0"]/div/div/div[1]/section/div/div/div[3]/picture')
        const mobileDeals = page.locator('[data-test-id="selection-split-layout"]')

        await page.goto('https://www.sky.com/shop/mobile/deals', {waitUntil: "domcontentloaded"});
        await page.frameLocator("#sp_message_iframe_474555").locator("text=Agree").click();

       // To test whether the prices apear on hero image
      await expect(homeHero).toContainText('£');
      // test if the image hero is shown
      await expect(imageHero).toHaveCount(1)
      // test if multiple tiles apear 
       await expect(mobileDeals).toHaveCount(2)
    })

})

test.describe("This feature will make sure that the home page is navigable and usable", async() => {
    test('Navigate to home Page and user can sign in', async({page}) => {

        // const authFrame = await page.$('id="6a8e4780c9_mtg6mja6mdg"')
        const authFrame = await page.frameLocator('[id="6a8e4780c9_mtg6mja6mdg"]')

        // data test id shoould have a - between test and id
        const username =  authFrame.locator('[data-testid="AUTHN__INPUT"]')
        const continueButton =  authFrame.locator('[data-testid="AUTHN__SUBMIT_BTN"]')
        const inputPassword = authFrame.locator('[data-testid="PASSWORD__INPUT"]');
        const errorMessage = authFrame.locator('[data-testid="AUTHN__INLINE_ERROR"]')

        await page.goto('https://sky.com', {waitUntil: "domcontentloaded"});
        await page.frameLocator("#sp_message_iframe_474555").locator("text=Agree").click();
        await page.locator('[data-test-id="sign-in-link"] >> text="Sign in"').click();
        expect(page.url()).toContain('https://www.sky.com/signin', 'deal url does not match');

        await page.waitForLoadState()

        await username.fill('sky')
        await continueButton.click()
        await  inputPassword.fill('Sky')
        await continueButton.click()

        // error message return when entering invalid credentials
        await expect(errorMessage).toHaveText('Your password is incorrect please try again or use the link below')
    })

    test('User can use search bar on home page', async({page}) => {
        await page.goto('https://www.sky.com', {waitUntil: "domcontentloaded"});
        await page.frameLocator("#sp_message_iframe_474555").locator("text=Agree").click();
        await page.locator('[data-test-id="masthead-search-toggle-button"]').click();
        await page.type('[data-test-id="input-box"]', 'Sky');
        await expect(page.locator('[data-test-id="editorial-section"]')).toBeVisible()

    })

})

