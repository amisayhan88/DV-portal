// VeriCred - Confidential Academic Credentials Contract Exports
// Copyright (C) Midnight Foundation & VeriCred Protocol
// SPDX-License-Identifier: Apache-2.0
import { CompiledContract } from "@midnight-ntwrk/midnight-js-protocol/compact-js";
export * from "./managed/bboard/contract/index.js";
export * as CacCompiled from "./managed/cac/contract/index.js";
export { CredentialStatus } from "./managed/cac/contract/index.js";
export * from "./witnesses.js";
export * from "./cac-witnesses.js";
import * as CompiledBBoardContract from "./managed/bboard/contract/index.js";
import * as Witnesses from "./witnesses.js";
export const CompiledBBoardContractContract = CompiledContract.make("BBoard", (CompiledBBoardContract.Contract)).pipe(CompiledContract.withWitnesses(Witnesses.witnesses), CompiledContract.withCompiledFileAssets("./managed/bboard"));
import * as CompiledCacContract from "./managed/cac/contract/index.js";
import * as CacWitnesses from "./cac-witnesses.js";
export const CompiledCacContractContract = CompiledContract.make("Cac", (CompiledCacContract.Contract)).pipe(CompiledContract.withWitnesses(CacWitnesses.cacWitnesses), CompiledContract.withCompiledFileAssets("./managed/cac"));
//# sourceMappingURL=index.js.map