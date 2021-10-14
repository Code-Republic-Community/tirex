import PuppeteerHandler from '../helpers/puppeteer.js';
import { load } from "cheerio";

const valid_url = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

export default async function get_hyperlinks(pageURL){
    console.log(": Geting HyperLinks");
    if(valid_url.test(pageURL)){
        const page = new PuppeteerHandler();
        await page.initBrowser();
        const $ = load(await page.getPageContent(pageURL))
        const hyperlinks = $('a');
        const returnResult = [];
        $(hyperlinks).each((i,link) =>{
            if(valid_url.test($(link).attr('href'))){
                returnResult.push($(link).attr('href'));
            }else{
                i++;
            }
        })
        await page.closeBrowser();
        return returnResult;
}else{
    console.log("HYPERLINK_PARSER: URL Is Note Defined H");
    return null;
}
}