import {BrowserContext, Page} from '@playwright/test'

export class ListingPOM{
    readonly page;
    readonly context ;
    readonly property_locator;
    readonly seen_tag_locator;
    constructor(page : Page,context : BrowserContext){
        this.page = page;
        this.context = context;
        this.property_locator = page.locator("//a[@class='ellipsis']").first();
        this.seen_tag_locator = page.locator("//a[@class='ellipsis']/ancestor::div[contains(@class,'tuple')]//img[@alt='Seen-Tag']").first();
    }
    async loadAndCloseProperty(){
        const [newPage] = await Promise.all([
            this.context.waitForEvent("page"),
            this.seen_tag_locator.click()
        ]);
        newPage.waitForLoadState();
        newPage.close();
    }
    async isSeenTagVisible() : Promise<Boolean>{
        return await this.seen_tag_locator.first().isVisible();
    }
}