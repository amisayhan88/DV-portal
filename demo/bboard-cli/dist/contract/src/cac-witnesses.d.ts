import { WitnessContext } from "@midnight-ntwrk/midnight-js-protocol/compact-runtime";
export type CacPrivateState = {
    readonly secretKey: Uint8Array;
    readonly studentGpaScaled: number;
    readonly degreeIdHash: Uint8Array;
};
export declare const createCacPrivateState: (secretKey: Uint8Array, studentGpaScaled?: number, degreeIdHash?: Uint8Array) => CacPrivateState;
export declare const cacWitnesses: {
    localSecretKey: ({ privateState, }: WitnessContext<unknown, CacPrivateState>) => [CacPrivateState, Uint8Array];
    studentGpaScaled: ({ privateState, }: WitnessContext<unknown, CacPrivateState>) => [CacPrivateState, bigint];
    degreeIdHash: ({ privateState, }: WitnessContext<unknown, CacPrivateState>) => [CacPrivateState, Uint8Array];
};
