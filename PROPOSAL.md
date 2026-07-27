# Project Proposal: VeriCred – Confidential Academic Credentials on Midnight Network

## 📋 Executive Summary

**VeriCred** is a privacy-first, zero-knowledge **Confidential Academic Credentials Platform** built on the **Midnight Network**. It enables accredited educational institutions (universities, colleges, and certification bodies) to securely issue cryptographically verifiable academic credentials on-chain while empowering students to selectively prove their qualifications—such as achieving a *"GPA ≥ 3.50"* or holding a *"Degree in Computer Science"*—to employers and verifiers **without revealing their raw transcripts, exact grades, or sensitive personally identifiable information (PII)**.

---

## 💥 Problem Statement

Current academic credential verification systems are broken, slow, and privacy-invasive:

1. **Over-Sharing of Private Data**: Verifying a degree currently requires sending a full transcript or diploma scan. This exposes confidential information like birth dates, social security numbers, semester-by-semester grades, and failed course retakes to potential employers.
2. **Fraud & Counterfeiting**: Diploma mills and forged PDF certificates cost organizations billions annually, while traditional verification checks take days or weeks through manual registrar calls.
3. **Lack of Student Data Sovereignty**: Students do not own or control their academic credentials; they rely on third-party verification agencies or institutional databases that charge fees per verification check.

---

## 🛡️ The VeriCred Solution

VeriCred leverages Midnight Network’s **Compact Smart Contracts** and zero-knowledge (ZK-SNARK) circuits to solve these issues:

- 🔒 **Zero-Knowledge Selective Disclosure**: Students generate zk-SNARK proofs locally on their device to prove criteria (e.g., GPA threshold, degree match) without revealing the underlying data.
- 📜 **On-Chain Credential Attestation**: Universities sign credential hashes onto Midnight’s public ledger for instant, global verification.
- 🛡️ **Private Witness State Storage**: Student identity keys, exact GPAs, and course details are stored exclusively in local private state (`cacPrivateState`).
- ⚡ **Tamper-Proof & Instant**: On-chain verification takes seconds with zero reliance on centralized third parties.

---

## 🏗️ Technical Architecture & Smart Contract Design

### Smart Contract (`cac.compact`)
The contract is written in Compact, separating ledger state into public data and local witness state:

```compact
pragma language_version 0.23;

export enum CredentialStatus {
  UNISSUED,
  VALID,
  REVOKED
}

export ledger totalCredentialsIssued: Counter;
export ledger institutionOwner: Bytes<32>;
export ledger credentialStatus: Map<Bytes<32>, CredentialStatus>;

witness localSecretKey(): Bytes<32>;
witness studentGpaScaled(): Uint<32>;
witness degreeIdHash(): Bytes<32>;
```

### Zero-Knowledge Circuits
1. `issueCredential(credentialHash)`: Institution authority issues credential hash to public ledger.
2. `verifyCredential(credentialHash)`: Checks credential status on-chain.
3. `proveGpaThreshold(credentialHash, minGpaScaled)`: ZK circuit proving student's GPA meets or exceeds threshold without revealing exact GPA.
4. `proveDegreeMatch(credentialHash, expectedDegreeHash)`: ZK circuit proving degree match without disclosing student identity.
5. `revokeCredential(credentialHash)`: Revokes issued credential by institution authority.

---

## 🌐 Level 1 Preprod Deployment & Environment

| Parameter | Value |
| --- | --- |
| **Network** | Midnight Preprod Testnet |
| **Preprod Contract Address** | `a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de` |
| **Undeployed Contract Address** | `3523aa3006329b8e763ba2cc655fb9a0e25833d2f11072c1d50146a830074d0b` |
| **Preprod Deployer Wallet** | `mn_addr_preprod18hl0hkw2sjdwuwztatxzp2mhwpre2w4hc9tlyx0l457k8dxd0fsqrda6jm` |
| **Proof Server Container** | `midnightntwrk/proof-server:8.1.0` |

### On-Chain Explorer Verification
- 🌐 [Midnight Preprod Explorer](https://preprod.midnightexplorer.com/contract/a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de)
- 🌐 [Subscan Preprod Explorer](https://midnight-preprod.subscan.io/account/mn_addr_preprod18hl0hkw2sjdwuwztatxzp2mhwpre2w4hc9tlyx0l457k8dxd0fsqrda6jm)
- 🌐 [1am Explorer Preprod](https://explorer.1am.xyz/contract/a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de)

---

## 🔒 Privacy Model & Guarantees

- **PUBLIC Data**: Total credentials counter, institution public key, credential status mapping (`VALID`, `REVOKED`), and disclosed transition outputs.
- **PRIVATE Data**: Raw GPA values, student secret keys, degree hashes, and identity documents.
- **ZK PROOF Claim**: The verifier receives mathematical proof that the student meets the credential criteria without gaining access to raw private inputs.

---

## 🗓️ Project Roadmap

- **Level 1 (Completed)**: Compact contract development, unit testing (Vitest), local Docker proof server integration, and Preprod testnet deployment.
- **Level 2 (In Progress)**: Multi-institution issuer registry, browser wallet connector integration (Lace / Midnight Wallet), and dynamic ZK proof generation UI.
- **Level 3 (Future)**: Enterprise SIS/LMS API plugins (Canvas, Blackboard, Banner), automated revocation indexers, and third-party security audit.
