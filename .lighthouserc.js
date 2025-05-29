const fs = require('fs');
const urls = fs.readFileSync('urls.txt', 'utf-8')
    .split('\n')
    .filter(Boolean);

module.exports = {
    ci: {
        collect: {
            url: urls,
            numberOfRuns: 1
        },
        upload: {
            target: 'filesystem', // write HTML locally
            outputDir: `./public/lhci/${process.env.REPORT_DATE}`, // dated folder
            reportFilenamePattern: '[name]-report.html'
        },
        assert: { preset: 'lighthouse:no-pwa' } // skip the PWA category
    }
};