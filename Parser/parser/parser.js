import PuppeteerHandler from '../helpers/puppeteer.js';
import { load } from "cheerio";
import normal from '../normalize.js';

const valid_url = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

export default async function parser(pageURL){
    console.log(": Parsing Given Page");
    if(valid_url.test(pageURL)){
        const page = new PuppeteerHandler();
        await page.initBrowser();
        const $ = load(await page.getPageContent(pageURL))
        const title = $('title');
        const content = $('p');
        const returnResult = {
           PageTitle: $(title).text(),
           MainPageURL: pageURL,
           PageContent:normal($(content).text())
        }
        await page.closeBrowser();
        console.log(returnResult);
        return returnResult;
}else{
    console.log("CONTENT_PARSER: URL Is Note Defined");
    return null;
}
}