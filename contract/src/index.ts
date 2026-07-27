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

export const CompiledBBoardContractContract = CompiledContract.make<
  CompiledBBoardContract.Contract<Witnesses.BBoardPrivateState>
>("BBoard", CompiledBBoardContract.Contract<Witnesses.BBoardPrivateState>).pipe(
  CompiledContract.withWitnesses(Witnesses.witnesses),
  CompiledContract.withCompiledFileAssets("./managed/bboard"),
);

import * as CompiledCacContract from "./managed/cac/contract/index.js";
import * as CacWitnesses from "./cac-witnesses.js";

export const CompiledCacContractContract = CompiledContract.make<
  CompiledCacContract.Contract<CacWitnesses.CacPrivateState>
>("Cac", CompiledCacContract.Contract<CacWitnesses.CacPrivateState>).pipe(
  CompiledContract.withWitnesses(CacWitnesses.cacWitnesses),
  CompiledContract.withCompiledFileAssets("./managed/cac"),
);
