export interface Context extends JsonMap {
    $lib: string;
    $lib_version: string;
}
export interface Configuration {
    apiKey: string;
    host: string;
    recordScreenViews: boolean;
    captureApplicationLifecycleEvents: boolean;
    captureDeepLinks?: boolean;
    flushAt?: number;
    flushInterval?: number;
    debug: boolean;
    json: string;
    context: Context;
    android: {
        collectDeviceId?: boolean;
    };
    ios: {
        capturePushNotifications?: boolean;
        captureInAppPurchases?: boolean;
        maxQueueSize?: number;
        shouldUseBluetooth?: boolean;
        shouldUseLocationServices?: boolean;
    };
}
export declare type JsonValue = boolean | number | string | null | JsonList | JsonMap;
export interface JsonMap {
    [key: string]: JsonValue;
    [index: number]: JsonValue;
}
export interface JsonList extends Array<JsonValue> {
}
export interface Options {
    context?: Context;
}
export interface Bridge {
    setup(configuration: Configuration): Promise<void>;
    capture(event: string, properties: JsonMap): Promise<void>;
    identify(distinctId: string | null, properties: JsonMap): Promise<void>;
    screen(screen: string, properties: JsonMap): Promise<void>;
    alias(alias: string): Promise<void>;
    reset(): Promise<void>;
    flush(): Promise<void>;
    enable(): Promise<void>;
    disable(): Promise<void>;
    getAnonymousId(): Promise<string>;
}
declare const bridge: Bridge;
export default bridge;
