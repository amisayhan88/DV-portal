import React, { useState } from 'react';
import { Credential, useWalletStore } from '../store/useWalletStore';
import { ShieldCheck, X, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';

interface ZkProofModalProps {
  credential: Credential | null;
  onClose: () => void;
}

export const ZkProofModal: React.FC<ZkProofModalProps> = ({ credential, onClose }) => {
  const { generateZkProof } = useWalletStore();
  const [proofType, setProofType] = useState<'GPA_THRESHOLD' | 'DEGREE_VERIFICATION'>('GPA_THRESHOLD');
  const [gpaThreshold, setGpaThreshold] = useState<number>(3.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProof, setGeneratedProof] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  if (!credential) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const proof = await generateZkProof(credential.id, proofType, gpaThreshold);
      setGeneratedProof(proof);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedProof) {
      navigator.clipboard.writeText(JSON.stringify(generatedProof, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-700 dark:text-amber-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Zero-Knowledge Prover</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Generate selective disclosure witness proof</p>
          </div>
        </div>

        {!generatedProof ? (
          <div className="mt-6 space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-semibold block mb-1">Privacy Guarantee</span>
              This circuit generates a cryptographic proof that proves your statement to verifiers without revealing your name, student ID, or exact GPA.
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Select Claim Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProofType('GPA_THRESHOLD')}
                  className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                    proofType === 'GPA_THRESHOLD'
                      ? 'bg-amber-100/80 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 border-amber-400 dark:border-amber-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  GPA Threshold Proof
                </button>
                <button
                  type="button"
                  onClick={() => setProofType('DEGREE_VERIFICATION')}
                  className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                    proofType === 'DEGREE_VERIFICATION'
                      ? 'bg-amber-100/80 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 border-amber-400 dark:border-amber-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Degree Match Proof
                </button>
              </div>
            </div>

            {proofType === 'GPA_THRESHOLD' && (
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Minimum Required GPA Threshold: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{gpaThreshold.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="2.0"
                  max="4.0"
                  step="0.05"
                  value={gpaThreshold}
                  onChange={(e) => setGpaThreshold(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-emeraldAcc-500 text-slate-950 font-bold hover:opacity-95 shadow-glow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Computing ZK Proof Circuit...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate Midnight ZK Proof</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">ZK Proof Verified & Signed</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">{generatedProof.verifiedClaim}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-1 overflow-x-auto">
              <div className="text-amber-400 font-bold">// Midnight ZK Proof Packet</div>
              <div>Proof ID: {generatedProof.id}</div>
              <div>Status: {generatedProof.status}</div>
              <div>Timestamp: {generatedProof.timestamp}</div>
              <div>Nullifier: 0x8a92...e31f</div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Proof Packet'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
