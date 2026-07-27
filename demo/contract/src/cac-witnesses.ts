// VeriCred - Confidential Academic Credentials Witness Implementations
// Copyright (C) Midnight Foundation & VeriCred Protocol
// SPDX-License-Identifier: Apache-2.0

import { WitnessContext } from "@midnight-ntwrk/midnight-js-protocol/compact-runtime";

export type CacPrivateState = {
  readonly secretKey: Uint8Array;
  readonly studentGpaScaled: number; // e.g. 385 for 3.85 GPA
  readonly degreeIdHash: Uint8Array;
};

export const createCacPrivateState = (
  secretKey: Uint8Array,
  studentGpaScaled: number = 380,
  degreeIdHash: Uint8Array = new Uint8Array(32)
): CacPrivateState => ({
  secretKey,
  studentGpaScaled,
  degreeIdHash,
});

export const cacWitnesses = {
  localSecretKey: ({
    privateState,
  }: WitnessContext<unknown, CacPrivateState>): [CacPrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],
  studentGpaScaled: ({
    privateState,
  }: WitnessContext<unknown, CacPrivateState>): [CacPrivateState, bigint] => [
    privateState,
    BigInt(privateState.studentGpaScaled),
  ],
  degreeIdHash: ({
    privateState,
  }: WitnessContext<unknown, CacPrivateState>): [CacPrivateState, Uint8Array] => [
    privateState,
    privateState.degreeIdHash,
  ],
};
