const puppeteer = require('puppeteer')

exports =  LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
};

exports = PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

module.exports =  class PuppeteerHandler {
  constructor() {
    this.browser = null;
  }
  async initBrowser() {
    console.log("initBrowser");
    this.browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
  }
  async closeBrowser() {
  if(this.browser){
    console.log("closeBrowser");
    await this.browser.close();
  }
  }
  async getPageContent(url) {
      console.log("getPageContent");
    if (!this.browser) {
      await this.initBrowser();
    }

    try {
      const page = await this.browser.newPage();
      await page.goto(url, PAGE_PUPPETEER_OPTS);
      const content = await page.content();
      return content;
    } catch (err) {
      throw err;
    }
  }
}