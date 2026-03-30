import {test,expect} from '@playwright/test';

test("TC 01 to validate that clicking on property listing redirects to correct property details page",async({page})=>{

    await page.goto("https://www.99acres.com/search/property/buy/hyderabad?city=269&keyword=hyderabad&preference=S&area_unit=1&res_com=R");

    var a_locator =  await page.locator("//a[@class='ellipsis']").nth(0);
    var link = await a_locator.getAttribute("href");
    var property_name = await a_locator.innerText();
    console.log('link : '+link);
    console.log('property name : '+property_name);
    await a_locator.click();
    const formatted = property_name
                            .toLowerCase()
                            .replace(/\s+/g, "-");
    expect(link?.toLowerCase()).toContain(formatted);
    await page.waitForTimeout(5000);
});

test("TC_04 To validate that visited property is marked with seen tag", async ({ context }) => {

    const page = await context.newPage();
    await page.goto("https://www.99acres.com/search/property/buy/hyderabad?city=269&keyword=hyderabad&preference=S&area_unit=1&res_com=R");

    
    const a_locator = await page.locator("//a[@class='ellipsis']");
    const url_a = await a_locator.first().getAttribute("href");
    console.log("Property URL: ", url_a);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }), 
        a_locator.first().click() 
    ]);

    await page.waitForLoadState('domcontentloaded');  
    const seenTagLocator = await page.locator("//img[@alt='Seen-Tag']");
    const seenTagVisible = await seenTagLocator.isVisible();
    console.log("Seen tag visible on the property page: ", seenTagVisible);

    await page.goBack();

    await page.waitForLoadState('domcontentloaded');  

    const seenTagOnOriginalPageLocator = await page.locator("//a[@class='ellipsis']/ancestor::div[contains(@class,'tuple')]//img[@alt='Seen-Tag']");
    const seenTagOnOriginalPageVisible = await seenTagOnOriginalPageLocator.isVisible();
    console.log("Seen tag visible on the original page: ", seenTagOnOriginalPageVisible);
});