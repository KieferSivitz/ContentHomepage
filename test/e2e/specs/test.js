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
            .assert.containsText('h1', 'Welcome to the Content Homepage!')
            .assert.containsText('h3', 'Currently combining Twitch and Twitter for Super Smash Brothers Melee!')
            .waitForElementVisible('#gridComponent0', 1000)
            .waitForElementVisible('#gridComponent1', 1000)
            .waitForElementVisible('#gridComponent2', 1000)
            .end();
    }
}
