// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.gridComponent')
            .waitForElementVisible('#twitterComponent0', 1000)
            .waitForElementVisible('#twitterComponent0', 1000)
            .waitForElementVisible('#twitterComponent0', 1000)
            .waitForElementVisible('#twitchPlayer0', 1000)
            .waitForElementVisible('#twitchChat0', 1000)
            .waitForElementVisible('#twitter-widget-0', 1000)
            .end();
    }
}
