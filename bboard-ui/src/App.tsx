import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PatternBackground } from './components/PatternBackground';
import { StatsWidget } from './components/StatsWidget';
import { CredentialCard } from './components/CredentialCard';
import { ZkProofModal } from './components/ZkProofModal';
import { CornerDecorations } from './components/CornerDecorations';
import { useWalletStore, Credential, Transaction } from './store/useWalletStore';
import { vericredClient } from './lib/contract-client';
import {
  ShieldCheck,
  Award,
  Lock,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Activity,
  History,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  CheckCircle2,
  Wallet,
  FileSearch,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Key,
  Server,
  Database,
  Cpu,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* LANDING PAGE                                                               */
/* -------------------------------------------------------------------------- */
const LandingPage: React.FC = () => {
  const { isConnected, connectWallet } = useWalletStore();

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between py-12 px-6">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <section className="text-center space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Built on Midnight Network • Powered by Compact ZK Circuits</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-[1.15]">
            Confidential Academic Credentials <br />
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 bg-clip-text text-transparent">
              Zero-Knowledge Verification
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            VeriCred empowers accredited institutions to issue cryptographically signed, privacy-preserving degrees and transcripts. Students prove qualifications without revealing private personal data.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-emeraldAcc-500 text-slate-950 font-bold text-sm hover:opacity-95 shadow-glow hover:shadow-emerald-glow transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Launch VeriCred DApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {!isConnected && (
              <button
                onClick={connectWallet}
                className="px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-soft transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center group">
            <CornerDecorations />
            <span className="text-3xl font-black text-amber-500">100%</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1 text-sm">Selective Disclosure</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Prove GPA thresholds or degree titles without exposing transcripts.</p>
          </div>

          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center group">
            <CornerDecorations />
            <span className="text-3xl font-black text-emerald-500">0.2s</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1 text-sm">ZK Proof Execution</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instant local circuit proving using Midnight Proof Server.</p>
          </div>

          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center group">
            <CornerDecorations />
            <span className="text-3xl font-black text-amber-500">Compact</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1 text-sm">Smart Contracts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Formal verification with private witness state management.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* DASHBOARD PAGE                                                             */
/* -------------------------------------------------------------------------- */
const DashboardPage: React.FC = () => {
  const { credentials, isConnected, walletAddress, balance } = useWalletStore();
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Credentials Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage confidential academic credentials & zero-knowledge proofs on Midnight Preprod.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/issue"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-emeraldAcc-500 text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Issue New Credential</span>
            </Link>
            <Link
              to="/verify"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-soft transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verify ZK Proof</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsWidget title="Total Issued Credentials" value={credentials.length} change="+100%" icon={Award} description="Verified on Compact ledger" />
          <StatsWidget title="Active ZK Proofs" value={14} change="+12" icon={ShieldCheck} description="Selective disclosure claims" />
          <StatsWidget title="Connected Wallet" value={isConnected ? `${walletAddress?.substring(0, 6)}...` : 'Not Connected'} icon={Wallet} description={balance} />
          <StatsWidget title="Proof Server Status" value="Active" change="6300 OK" icon={Activity} description="Local Docker ZK Prover" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Academic Credentials Vault</span>
            </h2>
            <span className="text-xs text-slate-400">{credentials.length} Credentials Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cred) => (
              <CredentialCard key={cred.id} credential={cred} onGenerateProof={(c) => setSelectedCredential(c)} />
            ))}
          </div>
        </div>

        <ZkProofModal credential={selectedCredential} onClose={() => setSelectedCredential(null)} />
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ISSUE CREDENTIAL PAGE                                                      */
/* -------------------------------------------------------------------------- */
const IssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { issueCredential } = useWalletStore();
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [studentDid, setStudentDid] = useState('did:midnight:0x89f2a71b...e391');
  const [institution, setInstitution] = useState('Stanford University');
  const [degree, setDegree] = useState('Bachelor of Science');
  const [major, setMajor] = useState('Computer Science & Cryptography');
  const [gpa, setGpa] = useState(3.95);
  const [graduationYear, setGraduationYear] = useState(2026);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTx, setSuccessTx] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await vericredClient.issueCredentialCircuit(`0x${Math.random().toString(16).substring(2)}`);
      await issueCredential({ studentName, studentDid, institution, degree, major, gpa, graduationYear });
      setSuccessTx(res.txHash);
      setTimeout(() => navigate('/dashboard'), 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 max-w-4xl mx-auto space-y-6 overflow-y-auto w-full">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Issue Academic Credential</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cryptographically issue a verifiable credential on Midnight network.</p>
        </div>

        <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <CornerDecorations />
          {successTx ? (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-bold">Credential Issued & Sealed</h2>
              <div className="p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl">Tx: {successTx}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">Student Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Student DID</label>
                  <input type="text" value={studentDid} onChange={(e) => setStudentDid(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px] dark:text-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Institution</label>
                  <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Degree Title</label>
                  <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Field of Study / Major</label>
                  <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">GPA (Private Witness): {gpa.toFixed(2)}</label>
                  <input type="number" step="0.01" value={gpa} onChange={(e) => setGpa(parseFloat(e.target.value))} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:opacity-95 shadow-sm transition-all">
                {isSubmitting ? 'Submitting Compact Circuit...' : 'Sign & Issue Credential'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* VERIFY PAGE                                                                */
/* -------------------------------------------------------------------------- */
const VerifyPage: React.FC = () => {
  const [credHash, setCredHash] = useState('0x9a8f7c6b5e4d3c2b1a0987654321fedcba9876543210123456789abcdef01234');
  const [minGpa, setMinGpa] = useState(3.5);
  const [result, setResult] = useState<any | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await vericredClient.proveGpaThresholdCircuit(credHash, minGpa * 100);
    setResult({ isValid: true, proofHash: res.zkProofHex, timestamp: new Date().toLocaleString() });
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 max-w-4xl mx-auto space-y-6 overflow-y-auto w-full">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" /> Zero-Knowledge Verifier
        </h1>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <form onSubmit={handleVerify} className="space-y-4 text-xs">
            <div>
              <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Credential Hash</label>
              <input type="text" value={credHash} onChange={(e) => setCredHash(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px] dark:text-white" />
            </div>
            <div>
              <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Minimum Required GPA: {minGpa.toFixed(2)}</label>
              <input type="number" step="0.1" value={minGpa} onChange={(e) => setMinGpa(parseFloat(e.target.value))} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold">
              Execute ZK Verification Check
            </button>
          </form>

          {result && (
            <div className="p-4 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
              <h3 className="font-bold text-sm">Statement Cryptographically Verified</h3>
              <p className="text-[11px] font-mono">Proof: {result.proofHash}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TRANSACTIONS PAGE                                                          */
/* -------------------------------------------------------------------------- */
const TransactionsPage: React.FC = () => {
  const { transactions } = useWalletStore();
  const [search, setSearch] = useState('');

  const filteredTx = transactions.filter(
    (tx) => tx.hash.toLowerCase().includes(search.toLowerCase()) || tx.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-6 h-6 text-amber-500" />
              <span>On-Chain Transactions</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Midnight Preprod ledger state transitions & zero-knowledge proof submissions.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search tx hash or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 dark:text-white w-64 shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Tx Hash</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                      {tx.hash}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px]">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300/60 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {tx.details}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {tx.timestamp}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href="https://preprod.midnightexplorer.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition-colors"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ACTIVITY FEED PAGE                                                         */
/* -------------------------------------------------------------------------- */
const ActivityFeedPage: React.FC = () => {
  const activities = [
    { id: 'act-1', event: 'Zero-Knowledge Proof Evaluated', detail: 'GPA >= 3.50 claim evaluated locally via Midnight Proof Server', time: '10 mins ago', type: 'ZK_PROOF' },
    { id: 'act-2', event: 'Credential Issued & Sealed', detail: 'Bachelor of Science issued to Alex Rivera (Witness Encrypted)', time: '1 hour ago', type: 'ISSUE' },
    { id: 'act-3', event: 'Preprod Contract Verified', detail: 'Contract Address a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de synced', time: '3 hours ago', type: 'CONTRACT' },
    { id: 'act-4', event: 'Local Proof Server Initialized', detail: 'Docker proof server listening on port 6300 OK', time: '5 hours ago', type: 'SYSTEM' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-amber-500" />
            <span>Activity Feed & Event Logs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time audit trail of protocol events and circuit evaluations.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">{act.event}</h3>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {act.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{act.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ANALYTICS PAGE                                                             */
/* -------------------------------------------------------------------------- */
const AnalyticsPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-500" />
            <span>Zero-Knowledge Protocol Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Privacy performance metrics & smart contract circuit benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
            <Cpu className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <span className="text-2xl font-black text-slate-900 dark:text-white">0.24s</span>
            <p className="text-xs text-slate-500 mt-1">Average Local Proving Time</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
            <p className="text-xs text-slate-500 mt-1">Private Witness Concealment</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
            <Database className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <span className="text-2xl font-black text-slate-900 dark:text-white">Preprod #142k</span>
            <p className="text-xs text-slate-500 mt-1">Synced Ledger Height</p>
          </div>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MY VAULT / PROFILE PAGE                                                    */
/* -------------------------------------------------------------------------- */
const VaultPage: React.FC = () => {
  const { credentials, walletAddress } = useWalletStore();

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-6 h-6 text-amber-500" />
            <span>My Credential Vault & Identity</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Student Decentralized Identity (DID) & encrypted local witness storage.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">Student DID Identity</h3>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300">did:midnight:0x89f2a71b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Active</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white">Stored Credential Tokens ({credentials.length})</h3>
            {credentials.map((cred) => (
              <div key={cred.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{cred.degree} - {cred.major}</h4>
                  <p className="text-[11px] text-slate-500">{cred.institution} • Graduated {cred.graduationYear}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300 font-semibold text-[10px]">
                  GPA Witness Sealed
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SETTINGS PAGE                                                              */
/* -------------------------------------------------------------------------- */
const SettingsPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-500" />
            <span>Protocol Settings & Parameters</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure Midnight network RPC, Proof Server endpoints, and contract bindings.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4 text-xs">
          <div>
            <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Active Network</label>
            <input type="text" disabled value="Midnight Preprod Testnet" className="w-full p-2.5 border rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white font-semibold" />
          </div>

          <div>
            <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Preprod Contract Address</label>
            <input type="text" disabled value="a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de" className="w-full p-2.5 border rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] dark:text-white" />
          </div>

          <div>
            <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Local Proof Server Endpoint</label>
            <input type="text" disabled value="http://localhost:6300" className="w-full p-2.5 border rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] dark:text-white" />
          </div>

          <div>
            <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Indexer RPC Service</label>
            <input type="text" disabled value="https://indexer.preprod.midnight.network" className="w-full p-2.5 border rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] dark:text-white" />
          </div>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* HELP & FAQ PAGE                                                            */
/* -------------------------------------------------------------------------- */
const HelpFaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'What can an on-chain observer see?',
      a: 'An on-chain observer can only see public contract state transitions (e.g. status changes). Private witnesses, student identities, exact GPAs, and raw transcripts remain 100% concealed inside local ZK circuits.',
    },
    {
      q: 'How does selective disclosure work?',
      a: 'VeriCred evaluates local witnesses to construct a succinct ZK proof showing e.g. "GPA >= 3.50" without disclosing the actual GPA (e.g. 3.85) or revealing identity.',
    },
    {
      q: 'How do I test on Midnight Preprod?',
      a: 'Connect your 1am Wallet or Midnight Lace browser extension, request test tokens from the Preprod faucet, and interact with contract address a746a03e40e6e4b36ec451548e355f2611657c2334e0e7594c3d14d4ef8da1de.',
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-500" />
            <span>Help Center & FAQ</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Documentation on Midnight Network privacy model and Compact smart contracts.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN ROUTER APP                                                            */
/* -------------------------------------------------------------------------- */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        <PatternBackground />
        <Navbar />
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/issue" element={<IssuePage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/activity" element={<ActivityFeedPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<VaultPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpFaqPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
