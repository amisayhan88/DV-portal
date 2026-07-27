// VeriCred - Confidential Academic Credentials Witness Implementations
// Copyright (C) Midnight Foundation & VeriCred Protocol
// SPDX-License-Identifier: Apache-2.0
export const createCacPrivateState = (secretKey, studentGpaScaled = 380, degreeIdHash = new Uint8Array(32)) => ({
    secretKey,
    studentGpaScaled,
    degreeIdHash,
});
export const cacWitnesses = {
    localSecretKey: ({ privateState, }) => [
        privateState,
        privateState.secretKey,
    ],
    studentGpaScaled: ({ privateState, }) => [
        privateState,
        BigInt(privateState.studentGpaScaled),
    ],
    degreeIdHash: ({ privateState, }) => [
        privateState,
        privateState.degreeIdHash,
    ],
};
//# sourceMappingURL=cac-witnesses.js.map