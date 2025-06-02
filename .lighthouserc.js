const fs = require('fs');
const urls = fs.readFileSync('urls.txt', 'utf-8')
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);

module.exports = {
    ci: {
        collect: {
            url: [urls[0], urls[1]],
            numberOfRuns: 1,
            chromePath: process.env.CHROME_PATH || (process.env.GITHUB_ACTIONS === 'true'
                ? '/usr/bin/google-chrome-unstable'
                : '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'),
            settings: {
                chromeFlags: "--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --no-zygote --single-process --headless=new --disable-gpu"
            }
        },
        upload: {
            target: 'filesystem', // write HTML locally
            outputDir: `./public/lhci/${process.env.REPORT_DATE}`, // dated folder
            reportFilenamePattern: 'report-{{url.pathname}}.json'
        },
        assert: { preset: 'lighthouse:no-pwa' }, // skip the PWA category,
    }
};