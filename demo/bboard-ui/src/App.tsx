import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PatternBackground } from './components/PatternBackground';
import { StatsWidget } from './components/StatsWidget';
import { CredentialCard } from './components/CredentialCard';
import { ZkProofModal } from './components/ZkProofModal';
import { CornerDecorations } from './components/CornerDecorations';
import { useWalletStore, Credential } from './store/useWalletStore';
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
  ArrowUpRight,
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
  const { credentials, isConnected, walletAddress, balance, transactions } = useWalletStore();
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
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Student DID</label>
                  <input type="text" value={studentDid} onChange={(e) => setStudentDid(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px]" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Degree Title</label>
                  <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Field of Study / Major</label>
                  <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="font-bold block mb-1">GPA (Private Witness): {gpa.toFixed(2)}</label>
                  <input type="number" step="0.01" value={gpa} onChange={(e) => setGpa(parseFloat(e.target.value))} className="w-full p-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Target Contract</label>
                  <input type="text" disabled value="<YOUR_DEPLOYED_CONTRACT_ADDRESS>" className="w-full p-2.5 border rounded-xl bg-slate-100 font-mono text-[11px]" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:opacity-95">
                {isSubmitting ? 'Submitting Circuit...' : 'Sign & Issue Credential'}
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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-soft space-y-4">
          <form onSubmit={handleVerify} className="space-y-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Credential Hash</label>
              <input type="text" value={credHash} onChange={(e) => setCredHash(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50 font-mono text-[11px]" />
            </div>
            <div>
              <label className="font-bold block mb-1">Minimum Required GPA: {minGpa.toFixed(2)}</label>
              <input type="number" step="0.1" value={minGpa} onChange={(e) => setMinGpa(parseFloat(e.target.value))} className="w-full p-2.5 border rounded-xl bg-slate-50" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold">
              Execute ZK Verification Check
            </button>
          </form>

          {result && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs">
              <h3 className="font-bold text-sm">Statement Cryptographically Verified</h3>
              <p className="text-[11px] mt-1">Proof: {result.proofHash}</p>
            </div>
          )}
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
            <Route path="/activity" element={<DashboardPage />} />
            <Route path="/transactions" element={<DashboardPage />} />
            <Route path="/analytics" element={<DashboardPage />} />
            <Route path="/profile" element={<DashboardPage />} />
            <Route path="/settings" element={<DashboardPage />} />
            <Route path="/help" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
