import { NativeModules } from 'react-native';
var bridge = NativeModules.RNPostHog;
if (!bridge) {
    throw new Error('Failed to load PostHog native module.');
}
export default bridge;
//# sourceMappingURL=bridge.js.map