// This file is part of midnightntwrk/example-bboard.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import path from 'node:path';
import { getTestEnvironment, RemoteTestEnvironment, } from '@midnight-ntwrk/testkit-js';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');
export class StandaloneConfig {
    getEnvironment(logger) {
        return getTestEnvironment(logger);
    }
    privateStateStoreName = 'bboard-private-state';
    logDir = path.resolve(currentDir, '..', 'logs', 'standalone', `${new Date().toISOString()}.log`);
    zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'bboard');
    generateDust = false;
}
export class PreviewRemoteConfig {
    getEnvironment(logger) {
        setNetworkId('preview');
        return new PreviewTestEnvironment(logger);
    }
    privateStateStoreName = 'bboard-private-state';
    logDir = path.resolve(currentDir, '..', 'logs', 'preview-remote', `${new Date().toISOString()}.log`);
    zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'bboard');
    generateDust = true;
}
export class PreprodRemoteConfig {
    getEnvironment(logger) {
        setNetworkId('preprod');
        return new PreprodTestEnvironment(logger);
    }
    privateStateStoreName = 'bboard-private-state';
    logDir = path.resolve(currentDir, '..', 'logs', 'preprod-remote', `${new Date().toISOString()}.log`);
    zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'bboard');
    generateDust = true;
}
export class PreviewTestEnvironment extends RemoteTestEnvironment {
    constructor(logger) {
        super(logger);
    }
    getProofServerUrl() {
        const container = this.proofServerContainer;
        if (!container) {
            throw new Error('Proof server container is not available.');
        }
        return container.getUrl();
    }
    getEnvironmentConfiguration() {
        return {
            walletNetworkId: 'preview',
            networkId: 'preview',
            indexer: 'https://indexer.preview.midnight.network/api/v4/graphql',
            indexerWS: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
            node: 'https://rpc.preview.midnight.network',
            nodeWS: 'wss://rpc.preview.midnight.network',
            faucet: 'https://midnight-tmnight-preview.nethermind.dev/',
            proofServer: this.getProofServerUrl(),
        };
    }
}
export class PreprodTestEnvironment extends RemoteTestEnvironment {
    constructor(logger) {
        super(logger);
    }
    getProofServerUrl() {
        const container = this.proofServerContainer;
        if (!container) {
            throw new Error('Proof server container is not available.');
        }
        return container.getUrl();
    }
    getEnvironmentConfiguration() {
        return {
            walletNetworkId: 'preprod',
            networkId: 'preprod',
            indexer: 'https://indexer.preprod.midnight.network/api/v4/graphql',
            indexerWS: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
            node: 'https://rpc.preprod.midnight.network',
            nodeWS: 'wss://rpc.preprod.midnight.network',
            faucet: 'https://midnight-tmnight-preprod.nethermind.dev/',
            proofServer: this.getProofServerUrl(),
        };
    }
}
//# sourceMappingURL=config.js.map