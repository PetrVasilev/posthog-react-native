"use strict";
var forceRequire = function () {
    jest.resetModules();
    return require.requireActual('../bridge');
};
it('should throw an error if the core native module is not linked', function () {
    jest.setMock('react-native', {
        NativeModules: {}
    });
    expect(forceRequire).toThrow(/Failed to load PostHog native module./);
});
it('should export the core native module', function () {
    var RNPostHog = {};
    jest.setMock('react-native', {
        NativeModules: { RNPostHog: RNPostHog }
    });
    expect(forceRequire().default).toBe(RNPostHog);
});
//# sourceMappingURL=bridge.spec.js.map