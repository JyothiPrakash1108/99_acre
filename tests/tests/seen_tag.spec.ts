import {test,expect,Page} from '@playwright/test';
import { ListingPOM } from '../pages/listingPOM';

let listing_page : ListingPOM;
test("To validate the functionality that visited properties marked with seen tad",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.99acres.com/search/property/buy/hyderabad?city=269&keyword=hyderabad&preference=S&area_unit=1&res_com=R");
    listing_page = new ListingPOM(page,context);
    listing_page.loadAndCloseProperty();
    const seen_tag_status = listing_page.isSeenTagVisible();
    console.log(seen_tag_status);
})