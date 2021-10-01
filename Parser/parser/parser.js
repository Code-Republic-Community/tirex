const  PuppeteerHandler  = require('../helpers/puppeteer');
const cheerio = require("cheerio");

const valid_url = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

module.exports = async function parser(pageURL){
    console.log("parsing");
    if(valid_url.test(pageURL)){
        const page = new PuppeteerHandler();
        await page.initBrowser();
        const $ = cheerio.load(await page.getPageContent(pageURL))
        const title = $('title');
        const content = $('p');
        const returnResult = {
           PageTitle: $(title).text(),
           MainPageURL: pageURL,
           PageContent: $(content).text()
        }
        await page.closeBrowser();
        return returnResult;
}else{
    console.log("URL Is Note Defined");
    return null;
}
}