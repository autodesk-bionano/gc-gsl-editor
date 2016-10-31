var homepageRegister = require('../../../../../test-e2e/fixtures/homepage-register');
var testProject = require('../../../../../test-e2e/fixtures/testproject');
var newProject = require('../../../../../test-e2e/fixtures/newproject');
var clickElementText = require('../../../../../test-e2e/fixtures/click-element-text');
var size = require('../../../../../test-e2e/fixtures/size');

var loadExtension = require('../fixtures/load-extension');

module.exports = {
  'Test Autocomplete on a Gene': function (browser) {

    // maximize for graphical tests
    size(browser);
    homepageRegister(browser);
    newProject(browser);

    browser
      .pause(1000)
      .waitForElementPresent('.ProjectDetail-heading-extensionList', 5000, 'expected Extension list to appear');

    clickElementText(browser, 'GSL Editor');

    browser.waitForElementPresent('.GSLEditorLayout', 4000, 'expected extension to render')
    
    browser.elementActive(function (result) {
      browser.elementIdAttribute(result.value.ELEMENT, 'className', function (nodeClass) {
        browser.assert.equal(nodeClass.value, 'ace_text-input', 'expected the Ace editor to have focus on opening');
      });
    });

    browser
      .pause(2000)
      .keys([browser.Keys.NULL, browser.Keys.DOWN_ARROW])
      .pause(2000)
      .keys('ADH')
      .pause(2000) 
      .waitForElementPresent('.ace_autocomplete', 2000, 'expected the autocomplete to show up')
      .keys([browser.Keys.NULL, browser.Keys.DOWN_ARROW])
      .pause(2000)
      .waitForElementPresent('.ace_doc-tooltip', 2000, 'expected the tooltip to show up')
      .keys([browser.Keys.ENTER])
      .waitForElementPresent('.ace_gene', 2000, 'expected the line to appear and tokenized as a Gene')

    browser
      .pause(2000)
      .end()
  }
};