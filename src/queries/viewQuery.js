const { setupBrowser } = require('../utils/browserSetup');
require('dotenv').config();

async function queryView(viewId) {
    let browser;
    try {
        browser = await setupBrowser();
        const page = await browser.newPage();
        // ... rest of your query code ...
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { queryView };
