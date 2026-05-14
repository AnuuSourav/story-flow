import { useState } from "react";
import {
  Shield, Layers, DollarSign, ChevronRight, Info, Copy, Check,
  Zap, Globe, Lock, Coins, FileText, ArrowRight, Star, Twitter,
  BookOpen, Award, TrendingUp, AlertCircle, ExternalLink
} from "lucide-react";

const TOOLTIPS = {
  ipa: "Did you know? Every IP Asset (IPA) on Story Protocol is a unique on-chain identity for your creative work — from a song, to a character, to a brand logo!",
  tba: "Did you know? On Story Protocol, your NFT is actually a smart wallet (TBA) that can hold its own money, sub-licenses, and even other IP Assets!",
  pil: "Did you know? A Programmable IP License (PIL) is a smart contract that automatically enforces your creative rights — no lawyers needed!",
  nft: "Did you know? Minting your IP as an NFT is the first step to making it programmable. Your art becomes a living, earning asset on-chain!",
  royalty: "Did you know? Story Protocol's royalty module splits payments automatically among all contributors in a creative chain — even across 100 remixes!",
  derivative: "Did you know? When someone creates a derivative of your IPA, Story Protocol's graph tracks the entire creative lineage — like a family tree for ideas!",
  commercial: "Did you know? Setting commercial terms on your PIL means anyone who makes money from your work automatically pays you — enforced by code, not courts!",
  attribution: "Did you know? On-chain attribution means your name is permanently linked to your work, immutably stored on the blockchain forever!",
};

function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block ml-1">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-purple-400 hover:text-purple-300 transition-colors"
        aria-label="More info"
      >
        <Info size={14} />
      </button>
      {show && (
        <div className="absolute z-50 bottom-6 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl text-xs leading-relaxed"
          style={{
            background: "rgba(139,92,246,0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(139,92,246,0.4)",
            color: "#e2d9f3",
            boxShadow: "0 8px 32px rgba(139,92,246,0.2)",
          }}>
          <span className="font-semibold text-purple-300">💡 Did you know?</span>
          <br />{text.replace("Did you know? ", "")}
        </div>
      )}
    </span>
  );
}

function GlassCard({ children, className = "", glow = false }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: glow
          ? "0 0 40px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </div>
  );
}

function Badge({ children, color = "purple" }) {
  const colors = {
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

function StepBar({ steps, current }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
            i < current ? "bg-purple-500 text-white" :
            i === current ? "bg-purple-500/30 text-purple-300 ring-2 ring-purple-500" :
            "bg-white/5 text-white/30"
          }`}>
            {i < current ? <Check size={12} /> : i + 1}
          </div>
          <span className={`text-xs hidden sm:block ${i === current ? "text-white" : "text-white/30"}`}>{s}</span>
          {i < steps.length - 1 && <ChevronRight size={14} className="text-white/20" />}
        </div>
      ))}
    </div>
  );
}

// ─── TAB 1: REGISTRATION ───────────────────────────────────────────────────
function RegistrationTab() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", type: "artwork", description: "", attributes: "" });
  const [minted, setMinted] = useState(false);
  const [registered, setRegistered] = useState(false);

  const steps = ["Define IP", "Mint NFT", "Register IPA", "View TBA"];

  function handleMint(e) {
    e.preventDefault();
    setMinted(true);
    setStep(2);
  }

  function handleRegister() {
    setRegistered(true);
    setStep(3);
  }

  const fakeTokenId = "0x" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0").toUpperCase();
  const fakeTBA = "0xTBA_" + form.name.replace(/\s+/g, "").toUpperCase().slice(0, 6) || "0xTBA_STORY";

  return (
    <div className="space-y-6">
      <StepBar steps={steps} current={step} />

      {step === 0 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FileText size={18} className="text-purple-400" /> Define Your IP Asset (IPA)
            <Tooltip text={TOOLTIPS.ipa} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Tell us about the intellectual property you want to protect on Story Protocol.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">IP Name <Tooltip text={TOOLTIPS.ipa} /></label>
              <input
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                placeholder="e.g. Neon Dragon #001"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">IP Type</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                <option value="artwork">Artwork / Illustration</option>
                <option value="music">Music / Audio</option>
                <option value="character">Character / Brand</option>
                <option value="writing">Writing / Story</option>
                <option value="video">Video / Animation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                placeholder="Describe your IP Asset..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button
              disabled={!form.name}
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
            >
              Continue → Mint as NFT
            </button>
          </div>
        </GlassCard>
      )}

      {step === 1 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Zap size={18} className="text-purple-400" /> Mint Your NFT
            <Tooltip text={TOOLTIPS.nft} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Your IP will be minted as an ERC-721 NFT on Story Protocol's network.</p>
          <GlassCard className="mb-5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #1d4ed8)" }}>
                <Star size={28} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{form.name || "Unnamed Asset"}</p>
                <p className="text-xs text-white/50 mt-0.5 capitalize">{form.type}</p>
                <p className="text-xs text-white/40 mt-1">{form.description || "No description"}</p>
                <div className="flex gap-2 mt-2">
                  <Badge color="purple">ERC-721</Badge>
                  <Badge color="blue">Story Protocol</Badge>
                </div>
              </div>
            </div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Network", value: "Story Mainnet" },
              { label: "Standard", value: "ERC-721" },
              { label: "Gas Est.", value: "~0.002 IP" },
              { label: "Token ID", value: fakeTokenId },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs text-white/40">{label}</p>
                <p className="text-sm font-medium text-white mt-0.5">{value}</p>
              </div>
            ))}
          </div>
          <button onClick={handleMint} className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            ⚡ Mint NFT on Story Protocol
          </button>
        </GlassCard>
      )}

      {step === 2 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Shield size={18} className="text-purple-400" /> Register as IPA
            <Tooltip text={TOOLTIPS.ipa} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Register your minted NFT as an official IP Asset on Story Protocol's registry.</p>
          <div className="flex items-center gap-3 p-4 rounded-xl mb-5"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Check size={18} className="text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-300">NFT Minted Successfully</p>
              <p className="text-xs text-white/40">Token ID: {fakeTokenId}</p>
            </div>
          </div>
          <div className="space-y-3 mb-5">
            {[
              { icon: Globe, label: "IP Registry Contract", value: "0xIPRegistry...Story", tip: TOOLTIPS.ipa },
              { icon: Lock, label: "Ownership", value: "Your Wallet (0xYOUR...)", tip: TOOLTIPS.tba },
              { icon: Layers, label: "Metadata URI", value: "ipfs://QmStory" + form.name.replace(/\s/g, ""), tip: TOOLTIPS.ipa },
            ].map(({ icon: Icon, label, value, tip }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-purple-400" />
                  <span className="text-xs text-white/60">{label}<Tooltip text={tip} /></span>
                </div>
                <span className="text-xs font-mono text-white/80">{value}</span>
              </div>
            ))}
          </div>
          <button onClick={handleRegister} className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            🛡️ Register as IP Asset (IPA)
          </button>
        </GlassCard>
      )}

      {step === 3 && (
        <GlassCard glow>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #1d4ed8)" }}>
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">🎉 IPA Registered!</h3>
            <p className="text-sm text-white/50">Your IP Asset is live on Story Protocol</p>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <p className="text-xs text-purple-300 mb-1 flex items-center gap-1">
                IP Asset ID <Tooltip text={TOOLTIPS.ipa} />
              </p>
              <p className="text-sm font-mono text-white">0xIPA_{form.name.replace(/\s+/g, "_").toUpperCase() || "STORY"}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <p className="text-xs text-purple-300 mb-1 flex items-center gap-1">
                Token Bound Account (TBA) <Tooltip text={TOOLTIPS.tba} />
              </p>
              <p className="text-sm font-mono text-white">{fakeTBA}...PROTO</p>
              <p className="text-xs text-white/40 mt-1">This smart wallet holds your IP's revenue & sub-licenses</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <p className="text-xs text-emerald-300 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-sm text-white">Active · Protected · Discoverable</p>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

// ─── TAB 2: LICENSING ──────────────────────────────────────────────────────
function LicensingTab() {
  const [step, setStep] = useState(0);
  const [license, setLicense] = useState({
    commercial: false,
    derivatives: true,
    attribution: true,
    transferable: false,
    royaltyRate: 10,
    territory: "worldwide",
    currency: "USDC",
  });
  const [pilCreated, setPilCreated] = useState(false);

  const steps = ["License Terms", "PIL Config", "Deploy PIL"];

  const pilSummary = `PIL · Commercial: ${license.commercial ? "✅" : "❌"} · Derivatives: ${license.derivatives ? "✅" : "❌"} · Royalty: ${license.royaltyRate}% · Territory: ${license.territory} · Currency: ${license.currency}`;

  return (
    <div className="space-y-6">
      <StepBar steps={steps} current={step} />

      {step === 0 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FileText size={18} className="text-purple-400" /> Set License Terms
            <Tooltip text={TOOLTIPS.pil} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Configure the terms of your Programmable IP License (PIL). These become enforceable on-chain.</p>
          <div className="space-y-4">
            {[
              { key: "commercial", label: "Allow Commercial Use", desc: "Others can monetize your IP", tip: TOOLTIPS.commercial },
              { key: "derivatives", label: "Allow Derivatives", desc: "Others can remix & build on your IP", tip: TOOLTIPS.derivative },
              { key: "attribution", label: "Require Attribution", desc: "Your name must appear in all uses", tip: TOOLTIPS.attribution },
              { key: "transferable", label: "Transferable License", desc: "Licensees can sublicense to others", tip: TOOLTIPS.pil },
            ].map(({ key, label, desc, tip }) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-1">{label}<Tooltip text={tip} /></p>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
                <button
                  onClick={() => setLicense({ ...license, [key]: !license[key] })}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${license[key] ? "bg-purple-500" : "bg-white/10"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${license[key] ? "left-7" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            Continue → Configure PIL
          </button>
        </GlassCard>
      )}

      {step === 1 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Coins size={18} className="text-purple-400" /> Configure PIL Parameters
            <Tooltip text={TOOLTIPS.royalty} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Set the economic parameters of your Programmable IP License.</p>
          <div className="space-y-5">
            {license.commercial && (
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/60 flex items-center gap-1">
                    Royalty Rate <Tooltip text={TOOLTIPS.royalty} />
                  </span>
                  <span className="text-sm font-bold text-purple-300">{license.royaltyRate}%</span>
                </label>
                <input type="range" min="1" max="50" step="1"
                  value={license.royaltyRate}
                  onChange={e => setLicense({ ...license, royaltyRate: Number(e.target.value) })}
                  className="w-full accent-purple-500" />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>1% (lenient)</span><span>50% (strict)</span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Territory</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                value={license.territory}
                onChange={e => setLicense({ ...license, territory: e.target.value })}>
                <option value="worldwide">Worldwide</option>
                <option value="us">United States Only</option>
                <option value="eu">European Union Only</option>
                <option value="asia">Asia Pacific</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Royalty Currency</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                value={license.currency}
                onChange={e => setLicense({ ...license, currency: e.target.value })}>
                <option value="USDC">USDC</option>
                <option value="IP">$IP Token</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
            <GlassCard className="!p-4">
              <p className="text-xs text-white/50 mb-2 font-medium">PIL Preview</p>
              <div className="flex flex-wrap gap-2">
                <Badge color={license.commercial ? "green" : "purple"}>{license.commercial ? "Commercial ✓" : "Non-Commercial"}</Badge>
                <Badge color={license.derivatives ? "green" : "purple"}>{license.derivatives ? "Derivatives ✓" : "No Derivatives"}</Badge>
                {license.attribution && <Badge color="blue">Attribution Required</Badge>}
                {license.commercial && <Badge color="amber">Royalty: {license.royaltyRate}%</Badge>}
                <Badge color="purple">{license.territory}</Badge>
              </div>
            </GlassCard>
          </div>
          <button onClick={() => setStep(2)} className="w-full mt-5 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            Continue → Deploy PIL
          </button>
        </GlassCard>
      )}

      {step === 2 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Zap size={18} className="text-purple-400" /> Deploy Programmable IP License
            <Tooltip text={TOOLTIPS.pil} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Your PIL will be deployed as a smart contract — immutable, trustless, globally enforceable.</p>
          <div className="space-y-3 mb-5">
            {[
              { label: "License Type", value: license.commercial ? "Commercial PIL" : "Non-Commercial PIL" },
              { label: "Derivatives", value: license.derivatives ? "Allowed with Attribution" : "Not Allowed" },
              { label: "Royalty Rate", value: license.commercial ? `${license.royaltyRate}% in ${license.currency}` : "N/A" },
              { label: "Territory", value: license.territory.charAt(0).toUpperCase() + license.territory.slice(1) },
              { label: "Transferable", value: license.transferable ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="text-xs text-white/50">{label}</span>
                <span className="text-xs font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
          {pilCreated ? (
            <div className="p-4 rounded-xl text-center" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <Check size={24} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-emerald-300">PIL Deployed Successfully!</p>
              <p className="text-xs text-white/40 font-mono mt-1">Contract: 0xPIL_{license.currency}_{license.royaltyRate}PCT...STORY</p>
            </div>
          ) : (
            <button onClick={() => setPilCreated(true)} className="w-full py-3 rounded-xl font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
              🚀 Deploy PIL on Story Protocol
            </button>
          )}
        </GlassCard>
      )}
    </div>
  );
}

// ─── TAB 3: MONETIZATION ──────────────────────────────────────────────────
function MonetizationTab() {
  const [step, setStep] = useState(0);
  const [royaltyPct, setRoyaltyPct] = useState(15);
  const [projectedRevenue, setProjectedRevenue] = useState(1000);
  const [strategy, setStrategy] = useState("hybrid");
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const steps = ["Strategy", "Royalties", "Revenue Share", "Share"];

  const royaltyEarning = Math.round((royaltyPct / 100) * projectedRevenue);
  const platformFee = Math.round(projectedRevenue * 0.025);
  const creatorNet = projectedRevenue - platformFee;

  const shareText = `🚀 Just set up my IP monetization on @StoryProtocol via Story Flow!\n\n📜 My Custom Programmable IP License (PIL):\n• Royalty Rate: ${royaltyPct}%\n• Strategy: ${strategy.charAt(0).toUpperCase() + strategy.slice(1)}\n• Projected Earnings: $${royaltyEarning} USDC/mo\n• Token Bound Account (TBA) holding all revenue on-chain!\n\nBuilt with Story Flow — the easiest way to register & monetize IP on-chain. 🔗\n\n#StoryProtocol #IPAsset #Web3 #OnChainIP`;

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="space-y-6">
      <StepBar steps={steps} current={step} />

      {step === 0 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-400" /> Choose Your Monetization Strategy
            <Tooltip text={TOOLTIPS.royalty} />
          </h3>
          <p className="text-sm text-white/50 mb-6">How do you want to earn from your IP Asset on Story Protocol?</p>
          <div className="grid gap-3">
            {[
              { id: "royalty", icon: Coins, label: "Royalty Only", desc: "Earn % from every commercial use of your IP", tag: "Passive Income" },
              { id: "licensing", icon: FileText, label: "License Fees", desc: "Charge upfront fees for each license minted", tag: "Upfront Revenue" },
              { id: "hybrid", icon: Zap, label: "Hybrid Model", desc: "License fee + ongoing royalty share", tag: "Recommended" },
              { id: "freemium", icon: Globe, label: "Freemium", desc: "Free personal use, paid commercial use", tag: "Growth Hack" },
            ].map(({ id, icon: Icon, label, desc, tag }) => (
              <button key={id} onClick={() => setStrategy(id)}
                className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                style={{
                  background: strategy === id ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${strategy === id ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}`,
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: strategy === id ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)" }}>
                  <Icon size={18} className={strategy === id ? "text-purple-300" : "text-white/40"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{label}</p>
                    <Badge color={strategy === id ? "purple" : "purple"}>{tag}</Badge>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                </div>
                {strategy === id && <Check size={16} className="text-purple-400 flex-shrink-0" />}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            Continue → Set Royalties
          </button>
        </GlassCard>
      )}

      {step === 1 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Coins size={18} className="text-purple-400" /> Configure Royalty Parameters
            <Tooltip text={TOOLTIPS.royalty} />
          </h3>
          <p className="text-sm text-white/50 mb-6">Set how much you earn from every use of your IP Asset.</p>
          <div className="space-y-5">
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/60">Royalty Rate <Tooltip text={TOOLTIPS.royalty} /></span>
                <span className="text-xl font-bold text-purple-300">{royaltyPct}%</span>
              </label>
              <input type="range" min="1" max="50" step="1" value={royaltyPct}
                onChange={e => setRoyaltyPct(Number(e.target.value))}
                className="w-full accent-purple-500" />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>1% Creator-Friendly</span><span>50% Maximum</span>
              </div>
            </div>
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/60">Projected Monthly Revenue (USDC)</span>
                <span className="text-sm font-bold text-white">${projectedRevenue.toLocaleString()}</span>
              </label>
              <input type="range" min="100" max="100000" step="100" value={projectedRevenue}
                onChange={e => setProjectedRevenue(Number(e.target.value))}
                className="w-full accent-purple-500" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Your Royalty", value: `$${royaltyEarning.toLocaleString()}`, color: "text-purple-300" },
                { label: "Platform Fee (2.5%)", value: `$${platformFee.toLocaleString()}`, color: "text-amber-300" },
                { label: "Creator Net", value: `$${creatorNet.toLocaleString()}`, color: "text-emerald-300" },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-xs text-white/40 mb-1">{label}</p>
                  <p className={`text-base font-bold ${color}`}>{value}</p>
                  <p className="text-xs text-white/30">USDC</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <AlertCircle size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/60">On Story Protocol, royalties flow automatically through Token Bound Accounts (TBA). No manual claiming needed — your IP wallet earns for you 24/7. <Tooltip text={TOOLTIPS.tba} /></p>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            Continue → Revenue Share
          </button>
        </GlassCard>
      )}

      {step === 2 && (
        <GlassCard glow>
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Layers size={18} className="text-purple-400" /> Revenue Share Graph
            <Tooltip text={TOOLTIPS.derivative} />
          </h3>
          <p className="text-sm text-white/50 mb-5">Story Protocol automatically distributes revenue across the entire IP lineage.</p>
          <div className="space-y-3 mb-5">
            {[
              { label: "Root IPA (You)", pct: royaltyPct, color: "#8b5cf6", desc: "Original creator" },
              { label: "Derivative Creator", pct: Math.round(royaltyPct * 0.4), color: "#3b82f6", desc: "Remix artist" },
              { label: "Sub-Derivative", pct: Math.round(royaltyPct * 0.15), color: "#10b981", desc: "Remix of a remix" },
              { label: "Story Protocol", pct: 2.5, color: "#f59e0b", desc: "Platform fee" },
            ].map(({ label, pct, color, desc }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{label} <span className="text-white/40">({desc})</span></span>
                  <span className="font-semibold" style={{ color }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(pct * 2, 100)}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl mb-5" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <p className="text-xs text-emerald-300 font-medium mb-1">💡 Automatic Royalty Splitting</p>
            <p className="text-xs text-white/50">Story Protocol's Royalty Module automatically splits payments among all IPA holders in the creative chain — no smart contract coding required.</p>
          </div>
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            Continue → Share Your Setup ✨
          </button>
        </GlassCard>
      )}

      {step === 3 && (
        <GlassCard glow>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #1d4ed8)" }}>
              <Star size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">🎉 Your IP is Monetized!</h3>
            <p className="text-sm text-white/50">Share your Story Protocol setup with the world</p>
          </div>
          <GlassCard className="mb-5">
            <p className="text-xs text-white/40 mb-3 flex items-center gap-1"><Twitter size={12} className="text-blue-400" /> Preview Tweet</p>
            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{shareText}</p>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}>
              {copied ? <><Check size={16} className="text-emerald-400" /> Copied!</> : <><Copy size={16} /> Copy Text</>}
            </button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #1d9bf0, #1a8cd8)" }}>
              <Twitter size={16} /> Post on X
            </a>
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <p className="text-xs text-purple-300 font-medium mb-2">Your Setup Summary</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Strategy", value: strategy.charAt(0).toUpperCase() + strategy.slice(1) },
                { label: "Royalty Rate", value: `${royaltyPct}%` },
                { label: "Monthly Earnings", value: `$${royaltyEarning.toLocaleString()} USDC` },
                { label: "PIL Status", value: "Active" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-white/40">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Registration", icon: Shield, desc: "Register IP Assets (IPA)" },
    { label: "Licensing", icon: FileText, desc: "Create PIL Licenses" },
    { label: "Monetization", icon: DollarSign, desc: "Earn Royalties" },
  ];

  return (
    <div className="min-h-screen text-white" style={{
      background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1e 50%, #0a0f1e 100%)",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
              <Layers size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Story Flow</h1>
              <p className="text-xs text-white/40">Powered by Story Protocol</p>
            </div>
            <a href="https://storyprotocol.xyz" target="_blank" rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
              Docs <ExternalLink size={10} />
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {tabs.map(({ label, icon: Icon }, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
                style={{
                  background: activeTab === i ? "linear-gradient(135deg, #8b5cf6, #6d28d9)" : "transparent",
                  color: activeTab === i ? "white" : "rgba(255,255,255,0.4)",
                  boxShadow: activeTab === i ? "0 4px 15px rgba(139,92,246,0.3)" : "none",
                }}>
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.slice(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Description */}
        <div className="mb-5 flex items-center gap-2">
          {(() => { const { icon: Icon, desc } = tabs[activeTab]; return (<><Icon size={14} className="text-purple-400" /><p className="text-xs text-white/50">{desc}</p></>); })()}
        </div>

        {/* Tab Content */}
        {activeTab === 0 && <RegistrationTab />}
        {activeTab === 1 && <LicensingTab />}
        {activeTab === 2 && <MonetizationTab />}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/20">Story Flow · Built for Story Protocol · Open Source</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="https://docs.storyprotocol.xyz" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400/60 hover:text-purple-400 transition-colors">Protocol Docs</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400/60 hover:text-purple-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}
