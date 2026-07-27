import { create } from 'zustand';

export interface Transaction {
  id: string;
  type: 'ISSUE_CREDENTIAL' | 'VERIFY_PROOF' | 'REVOKE_CREDENTIAL';
  status: 'PENDING' | 'PROCESSING' | 'CONFIRMED' | 'FAILED';
  hash: string;
  timestamp: string;
  details: string;
}

export interface Credential {
  id: string;
  studentName: string;
  studentDid: string;
  institution: string;
  degree: string;
  major: string;
  gpa: number;
  graduationYear: number;
  credentialHash: string;
  status: 'VALID' | 'REVOKED';
  issueDate: string;
}

export interface ProofRecord {
  id: string;
  credentialId: string;
  proofType: 'GPA_THRESHOLD' | 'DEGREE_VERIFICATION';
  verifiedClaim: string;
  timestamp: string;
  status: 'VERIFIED' | 'REJECTED';
}

interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  networkId: string;
  balance: string;
  contractAddress: string;
  credentials: Credential[];
  transactions: Transaction[];
  proofs: ProofRecord[];
  
  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
  issueCredential: (cred: Omit<Credential, 'id' | 'credentialHash' | 'status' | 'issueDate'>) => Promise<void>;
  generateZkProof: (credentialId: string, proofType: 'GPA_THRESHOLD' | 'DEGREE_VERIFICATION', threshold?: number) => Promise<ProofRecord>;
  revokeCredential: (credentialId: string) => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  isConnected: false,
  isConnecting: false,
  walletAddress: null,
  networkId: 'preprod',
  balance: '0.00 NIGHT',
  contractAddress: 'a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de',
  
  credentials: [
    {
      id: 'cred-1',
      studentName: 'Alex Rivera',
      studentDid: 'did:midnight:0x89f2a71b...e391',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      gpa: 3.92,
      graduationYear: 2025,
      credentialHash: '0x9a8f7c6b5e4d3c2b1a0987654321fedcba9876543210123456789abcdef01234',
      status: 'VALID',
      issueDate: '2025-06-15',
    },
    {
      id: 'cred-2',
      studentName: 'Alex Rivera',
      studentDid: 'did:midnight:0x89f2a71b...e391',
      institution: 'MIT Department of EECS',
      degree: 'Master of Engineering',
      major: 'Artificial Intelligence & Cryptography',
      gpa: 3.88,
      graduationYear: 2026,
      credentialHash: '0x123456789abcdef0123456789abcdef09a8f7c6b5e4d3c2b1a0987654321fedc',
      status: 'VALID',
      issueDate: '2026-05-20',
    },
  ],

  transactions: [
    {
      id: 'tx-101',
      type: 'ISSUE_CREDENTIAL',
      status: 'CONFIRMED',
      hash: '0x3a91f4b82c7e01d6...84a2',
      timestamp: '2026-07-26 14:32',
      details: 'Issued B.S. Computer Science to Alex Rivera',
    },
    {
      id: 'tx-102',
      type: 'VERIFY_PROOF',
      status: 'CONFIRMED',
      hash: '0x7b1c9e4a2d5f8103...91e5',
      timestamp: '2026-07-26 18:05',
      details: 'Zero-Knowledge Proof verified: GPA >= 3.50',
    },
  ],

  proofs: [
    {
      id: 'proof-1',
      credentialId: 'cred-1',
      proofType: 'GPA_THRESHOLD',
      verifiedClaim: 'GPA >= 3.50 (Actual identity and exact GPA concealed)',
      timestamp: '2026-07-26 18:05',
      status: 'VERIFIED',
    },
  ],

  connectWallet: async () => {
    set({ isConnecting: true });
    await new Promise((res) => setTimeout(res, 800));
    set({
      isConnected: true,
      isConnecting: false,
      walletAddress: 'mn_addr_preprod18hl0hkw2sjdwuwztatxzp2mhwpre2w4hc9tlyx0l457k8dxd0fsqrda6jm',
      balance: '1,450.00 NIGHT',
    });
  },

  disconnectWallet: () => {
    set({
      isConnected: false,
      walletAddress: null,
      balance: '0.00 NIGHT',
    });
  },

  addTransaction: (tx) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
    };
    set((state) => ({ transactions: [newTx, ...state.transactions] }));
  },

  issueCredential: async (credData) => {
    const { addTransaction } = get();
    addTransaction({
      type: 'ISSUE_CREDENTIAL',
      status: 'PROCESSING',
      hash: `0x${Math.random().toString(16).substring(2, 18)}...`,
      details: `Issuing ${credData.degree} in ${credData.major}`,
    });

    await new Promise((res) => setTimeout(res, 1200));

    const newCred: Credential = {
      ...credData,
      id: `cred-${Date.now()}`,
      credentialHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      status: 'VALID',
      issueDate: new Date().toISOString().split('T')[0],
    };

    set((state) => ({
      credentials: [newCred, ...state.credentials],
      transactions: state.transactions.map((tx, idx) =>
        idx === 0 ? { ...tx, status: 'CONFIRMED' } : tx
      ),
    }));
  },

  generateZkProof: async (credentialId, proofType, threshold = 3.5) => {
    const cred = get().credentials.find((c) => c.id === credentialId);
    if (!cred) throw new Error('Credential not found');

    const { addTransaction } = get();
    addTransaction({
      type: 'VERIFY_PROOF',
      status: 'PROCESSING',
      hash: `0x${Math.random().toString(16).substring(2, 18)}...`,
      details: `Generating ZK Proving Circuit for ${proofType}`,
    });

    await new Promise((res) => setTimeout(res, 1500));

    const isVerified = proofType === 'GPA_THRESHOLD' ? cred.gpa >= threshold : true;

    const proofRecord: ProofRecord = {
      id: `proof-${Date.now()}`,
      credentialId,
      proofType,
      verifiedClaim:
        proofType === 'GPA_THRESHOLD'
          ? `Verified: GPA >= ${threshold.toFixed(2)} (Identity & exact GPA concealed)`
          : `Verified: Holder possesses ${cred.degree} in ${cred.major}`,
      timestamp: new Date().toLocaleString(),
      status: isVerified ? 'VERIFIED' : 'REJECTED',
    };

    set((state) => ({
      proofs: [proofRecord, ...state.proofs],
      transactions: state.transactions.map((tx, idx) =>
        idx === 0 ? { ...tx, status: 'CONFIRMED' } : tx
      ),
    }));

    return proofRecord;
  },

  revokeCredential: async (credentialId) => {
    const { addTransaction } = get();
    addTransaction({
      type: 'REVOKE_CREDENTIAL',
      status: 'PROCESSING',
      hash: `0x${Math.random().toString(16).substring(2, 18)}...`,
      details: `Revoking credential ID ${credentialId}`,
    });

    await new Promise((res) => setTimeout(res, 1000));

    set((state) => ({
      credentials: state.credentials.map((c) =>
        c.id === credentialId ? { ...c, status: 'REVOKED' } : c
      ),
      transactions: state.transactions.map((tx, idx) =>
        idx === 0 ? { ...tx, status: 'CONFIRMED' } : tx
      ),
    }));
  },
}));
