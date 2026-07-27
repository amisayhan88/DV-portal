import { type BBoardProviders } from '../../api/src/index';
import { type Ledger } from '../../contract/src/managed/bboard/contract/index.js';
import { type Logger } from 'pino';
import { type Config } from './config.js';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { TestEnvironment } from '@midnight-ntwrk/testkit-js';
export declare const getBBoardLedgerState: (providers: BBoardProviders, contractAddress: ContractAddress) => Promise<Ledger | null>;
export declare const run: (config: Config, testEnv: TestEnvironment, logger: Logger) => Promise<void>;
