const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

class BrowserSetup {
    static async setupBrowser() {
        console.log('Launching browser...');
        return await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ]
        });
    }

    static async setupPage(browser) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.setRequestInterception(true);
        return page;
    }
}

module.exports = BrowserSetup;
