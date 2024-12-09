# analog-queries
# Analog View Queries

A collection of scripts to query Analog blockchain views using Puppeteer.

## Installation

Let me break down each part of the GitHub repository structure and explain why it's organized this way:
1. Root Directory Files:
   analog-queries/
├── .env.example          # Example environment variables
├── .gitignore           # Files to ignore in git
├── README.md            # Project documentation
└── package.json         # Project dependencies and scripts

   Let's create these files one by one:
   First, create the project:
   mkdir analog-queries
   cd analog-queries
   npm init -y

Install dependencies:
npm install puppeteer-extra puppeteer-extra-plugin-stealth dotenv



2. Create the Source Directory Structure:
   mkdir -p src/queries src/utils examples

3. Setup the Utility Functions (src/utils/browserSetup.js):
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


4. reate the Main Query File (src/queries/viewQuery.js):
   const BrowserSetup = require('../utils/browserSetup');
require('dotenv').config();

class ViewQuery {
    static async queryView(viewId) {
        let browser;
        try {
            browser = await BrowserSetup.setupBrowser();
            const page = await BrowserSetup.setupPage(browser);
            
            let viewData = null;
            
            // Handle requests
            page.on('request', request => request.continue());

            // Handle responses
            page.on('response', async response => {
                const url = response.url();
                if (url.includes('graphql')) {
                    try {
                        const responseData = await response.json();
                        console.log('GraphQL Response:', JSON.stringify(responseData, null, 2));
                        viewData = responseData;
                    } catch (e) {
                        // Ignore non-JSON responses
                    }
                }
            });

            console.log('Navigating to view page...');
            await page.goto(`https://watch.testnet.analog.one/view/${viewId}`, {
                waitUntil: 'networkidle0',
                timeout: 60000
            });

            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Page loaded successfully');

            return viewData;

        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                name: error.name,
                stack: error.stack
            });
            throw error;
        } finally {
            if (browser) await browser.close();
        }
    }
}

module.exports = ViewQuery;


5. Create an Example File (examples/example-queries.js):
   const ViewQuery = require('../src/queries/viewQuery');

async function runExamples() {
    try {
        // Example 1: Query a specific view
        console.log('Example 1: Querying specific view');
        const viewData = await ViewQuery.queryView('Qmbxa3sgEtz4CqVQKpe9xZ9dNZZxuLnptQhUesmVfzrCKR');
        console.log('View data:', JSON.stringify(viewData, null, 2));

    } catch (error) {
        console.error('Example error:', error);
    }
}

runExamples();

6. Create Environment Files:
   .env.example:
   # Analog credentials
SESSION_KEY=your_session_key_here
CF_CLEARANCE=your_cloudflare_clearance_here

# Optional configurations
HEADLESS=false
TIMEOUT=60000

.gitignore:
# Dependencies
node_modules/

# Environment variables
.env

# Logs
*.log

# OS files
.DS_Store

# IDE files
.vscode/
.idea/


7. Update package.json:
   {
  "name": "analog-queries",
  "version": "1.0.0",
  "description": "Scripts to query Analog blockchain views",
  "main": "src/queries/viewQuery.js",
  "scripts": {
    "start": "node examples/example-queries.js",
    "query": "node src/queries/viewQuery.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "analog",
    "blockchain",
    "queries",
    "puppeteer"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "puppeteer-extra": "^3.3.6",
    "puppeteer-extra-plugin-stealth": "^2.11.2",
    "dotenv": "^16.0.3"
  }
}   



To use this repository:
1. Clone it
2. Run npm install
3. Copy .env.example to .env and add your credentials
4. Run npm start to try the example
5. Would you like me to explain any specific part in more detail?    
