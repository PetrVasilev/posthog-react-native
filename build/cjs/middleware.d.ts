import { Context, JsonMap } from './bridge';
import { NativeWrapper } from './wrapper';
export interface MiddlewarePayload<T extends string, D extends {}> {
    type: T;
    data: D;
    context: Context;
    next(context?: Partial<Context>): void;
    next(context?: Partial<Context>, data?: D): void;
}
export interface CapturePayload extends MiddlewarePayload<'capture', {
    event: string;
    properties: JsonMap;
}> {
}
export interface ScreenPayload extends MiddlewarePayload<'screen', {
    screen: string;
    properties: JsonMap;
}> {
}
export interface IdentifyPayload extends MiddlewarePayload<'identify', {
    distinctId: string | null;
    properties: JsonMap;
}> {
}
export interface AliasPayload extends MiddlewarePayload<'alias', {
    alias: string;
}> {
}
export declare type Payload = CapturePayload | IdentifyPayload | ScreenPayload | AliasPayload;
export declare type Middleware = (payload: Payload) => void | Promise<void>;
export declare type PayloadFromType<T> = Extract<Payload, {
    type: T;
}>;
export declare class MiddlewareChain {
    private readonly wrapper;
    private readonly middlewares;
    constructor(wrapper: NativeWrapper<any>);
    add(middleware: Middleware): void;
    run<T extends Payload['type'], P extends PayloadFromType<T>>(type: T, data: P['data']): Promise<void>;
    private exec;
}
