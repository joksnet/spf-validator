var spf = require('../index');
var dns = require('dns');

test('Version is string', () => {
  expect(typeof spf.version).toBe('string');
});
test('SPFValidator is function', () => {
  expect(typeof spf.SPFValidator).toBe('function');
});
test('SPFValidator.getRecords returns empty array when no records has been found', () => {
  let resolveTxt = jest.spyOn(dns, 'resolveTxt');
  resolveTxt.mockImplementation((hostname, callback) => {
    callback(null, []);
  });

  let validator = new spf.SPFValidator('example.com');
  let promise = validator.getRecords('example.com').then(records => {
    expect(records).toEqual([]);
  });
  expect(resolveTxt).toHaveBeenCalled();
  resolveTxt.mockRestore();
  return promise;
});