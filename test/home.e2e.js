function waitForElement(selector) {
  var EC = protractor.ExpectedConditions;
  browser.wait(EC.presenceOf($(selector)), 20000);
}


describe('Homepage', function() {
  
	beforeEach(function() {
		browser.get(browser.baseUrl + '/');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('Angular Draft');
	});

	it('should display the picks', function() {
		waitForElement('.sidebar')
		var picks = $('.sidebar').all(by.tagName('pick'));
		expect(picks.count()).toBe(128);
	});

});