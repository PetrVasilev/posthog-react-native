import posthog from '../index';
import { PostHog } from '../posthog';
jest.mock('../bridge');
it('exports an instance of PostHog.Client', function () {
    return expect(posthog).toBeInstanceOf(PostHog.Client);
});
//# sourceMappingURL=index.spec.js.map