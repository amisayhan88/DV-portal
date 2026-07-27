// VeriCred - Confidential Academic Credentials API Types
// Copyright (C) Midnight Foundation & VeriCred Protocol
// SPDX-License-Identifier: Apache-2.0

import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { CredentialStatus, CacPrivateState } from '../../contract/src/index.js';

export const cacPrivateStateKey = 'cacPrivateState';
export type CacPrivateStateId = typeof cacPrivateStateKey;

export type AcademicCredential = {
  readonly credentialId: string;
  readonly studentName: string;
  readonly studentDid: string;
  readonly institutionName: string;
  readonly degreeTitle: string;
  readonly major: string;
  readonly graduationYear: number;
  readonly gpa: number; // e.g., 3.85
  readonly credentialHash: string;
  readonly status: 'VALID' | 'REVOKED' | 'PENDING';
  readonly issueTimestamp: string;
};

export type ZkProofParams = {
  readonly credentialHash: string;
  readonly minGpaRequirement?: number;
  readonly expectedDegreeTitle?: string;
  readonly expectedMajor?: string;
};

export type ZkProofResult = {
  readonly proofId: string;
  readonly isValid: boolean;
  readonly credentialHash: string;
  readonly verifiedClaim: string;
  readonly timestamp: string;
  readonly nullifier: string;
};

export type CacDerivedState = {
  readonly totalCredentialsIssued: bigint;
  readonly institutionOwner: string;
  readonly isInstitutionOwner: boolean;
  readonly userCredentials: AcademicCredential[];
  readonly lastActivityTimestamp: string;
};
