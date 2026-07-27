import { EnvironmentConfiguration, RemoteTestEnvironment, TestEnvironment } from '@midnight-ntwrk/testkit-js';
import { Logger } from 'pino';
export interface Config {
    readonly privateStateStoreName: string;
    readonly logDir: string;
    readonly zkConfigPath: string;
    getEnvironment(logger: Logger): TestEnvironment;
    readonly generateDust: boolean;
}
export declare const currentDir: string;
export declare class StandaloneConfig implements Config {
    getEnvironment(logger: Logger): TestEnvironment;
    privateStateStoreName: string;
    logDir: string;
    zkConfigPath: string;
    generateDust: boolean;
}
export declare class PreviewRemoteConfig implements Config {
    getEnvironment(logger: Logger): TestEnvironment;
    privateStateStoreName: string;
    logDir: string;
    zkConfigPath: string;
    generateDust: boolean;
}
export declare class PreprodRemoteConfig implements Config {
    getEnvironment(logger: Logger): TestEnvironment;
    privateStateStoreName: string;
    logDir: string;
    zkConfigPath: string;
    generateDust: boolean;
}
export declare class PreviewTestEnvironment extends RemoteTestEnvironment {
    constructor(logger: Logger);
    private getProofServerUrl;
    getEnvironmentConfiguration(): EnvironmentConfiguration;
}
export declare class PreprodTestEnvironment extends RemoteTestEnvironment {
    constructor(logger: Logger);
    private getProofServerUrl;
    getEnvironmentConfiguration(): EnvironmentConfiguration;
}
