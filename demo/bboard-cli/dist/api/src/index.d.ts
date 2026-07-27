import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import { type BBoardDerivedState, type BBoardProviders, type DeployedBBoardContract } from './common-types.js';
import { type Observable } from 'rxjs';
/** @internal */
/**
 * An API for a deployed bulletin board.
 */
export interface DeployedBBoardAPI {
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<BBoardDerivedState>;
    post: (message: string) => Promise<void>;
    takeDown: () => Promise<void>;
}
/**
 * Provides an implementation of {@link DeployedBBoardAPI} by adapting a deployed bulletin board
 * contract.
 *
 * @remarks
 * The `BBoardPrivateState` is managed at the DApp level by a private state provider. As such, this
 * private state is shared between all instances of {@link BBoardAPI}, and their underlying deployed
 * contracts. The private state defines a `'secretKey'` property that effectively identifies the current
 * user, and is used to determine if the current user is the owner of the message as the observable
 * contract state changes.
 *
 * In the future, Midnight.js will provide a private state provider that supports private state storage
 * keyed by contract address. This will remove the current workaround of sharing private state across
 * the deployed bulletin board contracts, and allows for a unique secret key to be generated for each bulletin
 * board that the user interacts with.
 */
export declare class BBoardAPI implements DeployedBBoardAPI {
    readonly deployedContract: DeployedBBoardContract;
    private readonly logger?;
    /** @internal */
    private constructor();
    /**
     * Gets the address of the current deployed contract.
     */
    readonly deployedContractAddress: ContractAddress;
    /**
     * Gets an observable stream of state changes based on the current public (ledger),
     * and private state data.
     */
    readonly state$: Observable<BBoardDerivedState>;
    /**
     * Attempts to post a given message to the bulletin board.
     *
     * @param message The message to post.
     *
     * @remarks
     * This method can fail during local circuit execution if the bulletin board is currently occupied.
     */
    post(message: string): Promise<void>;
    /**
     * Attempts to take down any currently posted message on the bulletin board.
     *
     * @remarks
     * This method can fail during local circuit execution if the bulletin board is currently vacant,
     * or if the currently posted message isn't owned by the owner computed from the current private
     * state.
     */
    takeDown(): Promise<void>;
    /**
     * Deploys a new bulletin board contract to the network.
     *
     * @param providers The bulletin board providers.
     * @param logger An optional 'pino' logger to use for logging.
     * @returns A `Promise` that resolves with a {@link BBoardAPI} instance that manages the newly deployed
     * {@link DeployedBBoardContract}; or rejects with a deployment error.
     */
    static deploy(providers: BBoardProviders, logger?: Logger): Promise<BBoardAPI>;
    /**
     * Finds an already deployed bulletin board contract on the network, and joins it.
     *
     * @param providers The bulletin board providers.
     * @param contractAddress The contract address of the deployed bulletin board contract to search for and join.
     * @param logger An optional 'pino' logger to use for logging.
     * @returns A `Promise` that resolves with a {@link BBoardAPI} instance that manages the joined
     * {@link DeployedBBoardContract}; or rejects with an error.
     */
    static join(providers: BBoardProviders, contractAddress: ContractAddress, logger?: Logger): Promise<BBoardAPI>;
    private static getPrivateState;
}
/**
 * A namespace that represents the exports from the `'utils'` sub-package.
 *
 * @public
 */
export * as utils from './utils/index.js';
export * from './common-types.js';
