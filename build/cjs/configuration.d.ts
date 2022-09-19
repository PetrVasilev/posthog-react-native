import { Configuration } from './bridge';
import { PostHog } from './posthog';
export declare const configure: (apiKey: string, { flushAt, flushInterval, debug, recordScreenViews, captureApplicationLifecycleEvents, captureDeepLinks, host, ios, android }: PostHog.Configuration) => Promise<Configuration>;
