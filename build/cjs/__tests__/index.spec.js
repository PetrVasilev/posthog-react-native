"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var posthog_1 = require("../posthog");
jest.mock('../bridge');
it('exports an instance of PostHog.Client', function () {
    return expect(index_1.default).toBeInstanceOf(posthog_1.PostHog.Client);
});
//# sourceMappingURL=index.spec.js.map