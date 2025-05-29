const fs = require('fs');
const path = require('path');

const urlsFilePath = path.resolve(__dirname, 'urls.txt');

const urls = fs.readFileSync(urlsFilePath, 'utf8')
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);

const REPORT_DATE = Date.now();

module.exports = {
    urls: [
        'https://mw-expat.com'
    ],
    reporters: [
        { name: "json", filename: `./public/pa11y/${REPORT_DATE}/pa11y.json` },
        { name: "pa11y-ci-reporter-html", filename: `./public/pa11y/${REPORT_DATE}/index.html` }
    ],
    defaults: {
        standard: 'WCAG2AA',
        timeout: 60000,
        chromeLaunchConfig: {
            executablePath: process.env.GITHUB_ACTIONS === 'true'
                ? '/usr/bin/google-chrome'
                : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            args: [
                "--no-sandbox"
            ]
        },
        runners: ["axe"]
    },
};