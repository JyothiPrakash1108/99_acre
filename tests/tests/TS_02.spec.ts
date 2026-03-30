import {test,expect} from '@playwright/test'

test("to validate the filtering functionality by BHK",async({page})=>{
    await page.goto("https://www.99acres.com/search/property/buy/hyderabad?city=269&keyword=hyderabad&preference=S&area_unit=1&res_com=R");
    await page.locator("//div[@datalabel='BEDROOM_CLUSTER']").filter({ hasText: "5 BHK" }).click();
    await page.waitForLoadState('networkidle');
    aw
    
    console.log(await configCards.count());
});