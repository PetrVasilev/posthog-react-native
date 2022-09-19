import { JsonMap } from './bridge';
import { Middleware } from './middleware';
import { ErrorHandler } from './wrapper';
export declare module PostHog {
    interface Configuration {
        /**
         * Which PostHog host to send events to.
         *
         * `https://app.posthog.com` by default
         */
        host?: string;
        /**
         * Whether the posthog client should automatically make a screen call when a
         * view controller is added to a view hierarchy.
         * Because the iOS underlying implementation uses method swizzling,
         * we recommend initializing the posthog client as early as possible.
         *
         * Disabled by default.
         */
        recordScreenViews?: boolean;
        /**
         * Whether the posthog client should automatically capture application lifecycle events, such as
         * "Application Installed", "Application Updated" and "Application Opened".
         *
         * Disabled by default.
         */
        captureApplicationLifecycleEvents?: boolean;
        /**
         * Whether the posthog client should automatically capture deep links. You'll still need to call the
         * continueUserActivity and openURL methods on the posthog client.
         *
         * Disabled by default.
         */
        captureDeepLinks?: boolean;
        /**
         * Register a set of integrations to be used with this PostHog instance.
         */
        debug?: boolean;
        /**
         * The number of queued events that the posthog client should flush at.
         * Setting this to `1` will not queue any events and will use more battery.
         *
         * `20` by default.
         */
        flushAt?: number;
        /**
         * The amount of time to wait before each tick of the flush timer, in seconds.
         * Smaller values will make events delivered in a more real-time manner and also use more battery.
         * A value smaller than 10 seconds will seriously degrade overall performance.
         *
         * `30` seconds by default.
         */
        flushInterval?: number;
        /**
         * iOS specific settings.
         */
        ios?: {
            /**
             * Whether the posthog client should use location services.
             * If `true` and the host app hasn't asked for permission to use location services then the user will be
             * presented with an alert view asking to do so. `false` by default. If `true`, please make sure to add a
             * description for `NSLocationAlwaysUsageDescription` in your `Info.plist` explaining why your app is
             * accessing Location APIs.
             *
             * Disabled by default.
             */
            shouldUseLocationServices?: boolean;
            /**
             * The maximum number of items to queue before starting to drop old ones. This should be a value greater
             * than zero, the behaviour is undefined otherwise. `1000` by default.
             *
             * `1000` by default.
             */
            maxQueueSize?: number;
            /**
             * Whether the posthog client should record bluetooth information. If `true`, please make sure to add a
             * description for `NSBluetoothPeripheralUsageDescription` in your `Info.plist` explaining explaining why
             * your app is accessing Bluetooth APIs. `false` by default.
             *
             * Disabled by default.
             */
            shouldUseBluetooth?: boolean;
            /**
             * Whether the posthog client should automatically capture in-app purchases from the App Store
             *
             * Disabled by default.
             */
            captureInAppPurchases?: boolean;
            /**
             * Whether the posthog client should automatically capture push notifications.
             *
             * Disabled by default.
             */
            capturePushNotifications?: boolean;
        };
        /**
         * Android specific settings.
         */
        android?: {
            /**
             * Whether the posthog client should client the device identifier.
             * The device identifier is obtained using :
             * - `android.provider.Settings.Secure.ANDROID_ID`
             * - `android.os.Build.SERIAL`
             * - or Telephony Identifier retrieved via TelephonyManager as available
             *
             * Enabled by default.
             */
            collectDeviceId?: boolean;
        };
    }
    class Client {
        /**
         * Whether the client is ready to send events to PostHog.
         *
         * This becomes `true` when `.setup()` succeeds.
         * All calls will be queued until it becomes `true`.
         */
        readonly ready = false;
        private readonly wrapper;
        private readonly handlers;
        private readonly middlewares;
        /**
         * Catch React-Native bridge errors
         *
         * These errors are emitted when calling the native counterpart.
         * This only applies to methods with no return value (`Promise<void>`),
         * methods like `getAnonymousId` do reject promises.
         */
        catch(handler: ErrorHandler): this;
        middleware(middleware: Middleware): this;
        /**
         * Use the native configuration.
         *
         * You'll need to call this method when you configure PostHog's singleton
         * using the native API.
         */
        useNativeConfiguration(): this;
        /**
         * Setup the PostHog module. All calls made before are queued
         * and only executed if the configuration was successful.
         *
         * ```js
         * await posthog.setup('YOUR_API_KEY', {
         *   captureAppLifecycleEvents: true,
         *   ios: {
         *     capturePushNotifications: true
         *   }
         * })
         * ```
         *
         * @param apiKey Your PostHog.com API key
         * @param configuration An optional {@link Configuration} object.
         */
        setup(apiKey: string, configuration?: Configuration): Promise<void>;
        /**
         * Record the actions your users perform.
         *
         * When a user performs an action in your app, you'll want to capture that action for later analysis.
         * Use the event name to say what the user did, and properties to specify any interesting details of the action.
         *
         * @param event The name of the event you're capturing.
         * We recommend using human-readable names like `Played a Song` or `Updated Status`.
         * @param properties A dictionary of properties for the event.
         * If the event was 'Added to Shopping Cart', it might have properties like price, productType, etc.
         */
        capture(event: string, properties?: JsonMap): Promise<void>;
        /**
         * Record the screens or views your users see.
         *
         * When a user views a screen in your app, you'll want to record that here.
         *
         * @param screen The title of the screen being viewed.
         * We recommend using human-readable names like 'Photo Feed' or 'Completed Purchase Screen'.
         * @param properties A dictionary of properties for the screen view event.
         * If the event was 'Added to Shopping Cart', it might have properties like price, productType, etc.
         */
        screen(screen: string, properties?: JsonMap): Promise<void>;
        /**
         * Associate a user with their unique ID and record traits about them.
         *
         * When you learn more about who your user is, you can record that information with identify.
         *
         * @param distinctId database ID (or email address) for this user.
         * If you don't have a userId but want to record traits, you should pass nil.
         * @param properties A dictionary of properties you know about the user. Things like: email, name, plan, etc.
         */
        identify(distinctId: string | null, properties?: JsonMap): Promise<void>;
        /**
         * Merge two user identities, effectively connecting two sets of user data as one.
         *
         * When you learn more about who the group is, you can record that information with group.
         *
         * @param alias The existing ID you want to link to the current distinct ID.
         */
        alias(alias: string): Promise<void>;
        /**
         * Reset any user state that is cached on the device.
         *
         * This is useful when a user logs out and you want to clear the identity.
         * It will clear any traits or userId's cached on the device.
         */
        reset(): Promise<void>;
        /**
         * Trigger an upload of all queued events.
         *
         * This is useful when you want to force all messages queued on the device to be uploaded.
         * Please note that not all integrations respond to this method.
         */
        flush(): Promise<void>;
        /**
         * Enable the sending of posthog data. Enabled by default.
         *
         * Occasionally used in conjunction with disable user opt-out handling.
         */
        enable(): Promise<void>;
        /**
         * Completely disable the sending of any posthog data.
         *
         * If you have a way for users to actively or passively (sometimes based on location) opt-out of
         * posthog data collection, you can use this method to turn off all data collection.
         */
        disable(): Promise<void>;
        /** Retrieve the anonymousId. */
        getAnonymousId(): Promise<string>;
        private handleError;
    }
}
