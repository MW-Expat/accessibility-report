const fs = require('fs');
const urls = fs.readFileSync('urls.txt', 'utf-8')
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);

module.exports = {
    ci: {
        collect: {
            url: urls[0],
            numberOfRuns: 1,
            chromePath: process.env.GITHUB_ACTIONS === 'true'
                ? '/usr/bin/google-chrome'
                : '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        },
        upload: {
            target: 'filesystem', // write HTML locally
            outputDir: `./public/lhci/${process.env.REPORT_DATE}`, // dated folder
            reportFilenamePattern: 'index.html'
        },
        assert: { preset: 'lighthouse:no-pwa' } // skip the PWA category
    }
};