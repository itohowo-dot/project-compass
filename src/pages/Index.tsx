import { Link } from "react-router-dom";
import { Droplets, ArrowRight, Zap, Shield, Clock, TrendingUp, XCircle, Eye, Briefcase, Lock, Palette, Landmark, ChevronDown, Layers, Globe, Code, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";

const FEATURES = [
  { icon: Zap, title: "Real-Time Payments", desc: "Bitcoin streams continuously, block by block" },
  { icon: Shield, title: "Trustless Escrow", desc: "Smart contract holds funds securely on-chain" },
  { icon: Clock, title: "Instant Access", desc: "Withdraw vested funds at any time" },
  { icon: TrendingUp, title: "Linear Vesting", desc: "Predictable, proportional token distribution" },
  { icon: XCircle, title: "Cancel Anytime", desc: "Senders can cancel and reclaim unvested funds" },
  { icon: Eye, title: "Full Transparency", desc: "Every transaction verifiable on the blockchain" },
];

const STEPS = [
  { num: "01", title: "Create", desc: "Set recipient, amount & duration" },
  { num: "02", title: "Lock", desc: "sBTC is escrowed in the contract" },
  { num: "03", title: "Stream", desc: "Funds vest linearly over time" },
  { num: "04", title: "Withdraw", desc: "Recipient claims vested sBTC" },
];

const USE_CASES = [
  { icon: Briefcase, title: "Payroll Streaming", short: "Pay your team every second, not every two weeks.", detail: "Stream salaries to employees continuously. Workers earn every block, reducing payroll overhead and giving instant access to earned wages without waiting for pay cycles." },
  { icon: Lock, title: "Token Vesting", short: "Fair, transparent token distribution for investors and teams.", detail: "Replace complex vesting contracts with simple streams. Tokens vest linearly with full on-chain transparency, and unvested tokens can be reclaimed if needed." },
  { icon: Palette, title: "Creator Economy", short: "Subscription payments that flow in real-time.", detail: "Fans stream payments to creators continuously. No more monthly billing cycles — creators earn as they create, and subscribers only pay for the time they're subscribed." },
  { icon: Landmark, title: "DAO Treasury", short: "Programmable treasury disbursements for DAOs.", detail: "Stream grants and contributor payments from DAO treasuries. Governance can cancel streams if milestones aren't met, maintaining accountability with on-chain proof." },
];

const PROTOCOL_STATS = [
  { value: 142.85, decimals: 2, suffix: " sBTC", label: "Total Streamed" },
  { value: 47, decimals: 0, suffix: "", label: "Active Streams" },
  { value: 1250, decimals: 0, suffix: "+", label: "Transactions" },
];

const TRUST_BADGES = [
  { icon: Layers, label: "Built on Stacks" },
  { icon: Globe, label: "100% On-Chain" },
  { icon: Code, label: "Open Source" },
  { icon: ShieldCheck, label: "Non-Custodial" },
];

const viewportOnce = { once: true, margin: "-50px" as any };

export default function Index() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero */}
      <header className="container flex flex-col items-center justify-center py-16 md:py-28 lg:py-36 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full border border-primary/10 animate-[ripple_3s_ease-out_infinite]" />
          <div className="absolute inset-0 w-[300px] h-[300px] rounded-full border border-primary/5 animate-[ripple_3s_ease-out_1s_infinite]" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary glow-amber animate-[float_3s_ease-in-out_infinite]">
              <Droplets className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-gradient-primary">DRIP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
          >
            Bitcoin that{" "}
            <span className="text-gradient-flow">flows.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Stream sBTC payments in real-time on Stacks. Create trustless payment streams for payroll, vesting, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mb-10 max-w-md sm:max-w-none mx-auto"
          >
            {PROTOCOL_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-gradient-primary">
                  <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} duration={1800} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="w-full sm:w-auto gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity gap-2 text-base px-8">
              <Link to="/dashboard">
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-border/50 text-base px-8">
              <a href="#features">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Social Proof Strip */}
      <section className="container pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground"
            >
              <badge.icon className="h-4 w-4 text-primary" />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why DRIP?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A new primitive for programmable Bitcoin payments</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/20 hover:shadow-card-hover overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-300" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-200 group-hover:scale-110">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to stream Bitcoin</p>
        </motion.div>

        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-border/40 -translate-y-1/2 z-0" />

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Mobile vertical connector */}
            <div className="sm:hidden absolute left-6 top-8 bottom-8 w-px border-l-2 border-dashed border-border/40 z-0" />

            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative rounded-xl border border-border/50 bg-card/80 p-6 z-10"
              >
                <span className="text-4xl font-extrabold text-gradient-primary opacity-60">{s.num}</span>
                <h3 className="text-lg font-semibold mt-3 mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Real-world applications for streaming payments</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {USE_CASES.map((uc, i) => (
            <UseCaseCard key={uc.title} useCase={uc} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-primary/20 gradient-card p-8 sm:p-12 text-center glow-amber"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start streaming?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Create your first sBTC payment stream in minutes.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity gap-2 text-base px-8">
            <Link to="/dashboard">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container py-8 border-t border-border/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">DRIP Protocol</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
          <p className="hidden sm:block">Built on Stacks. Powered by Bitcoin.</p>
        </div>
      </footer>
    </div>
  );
}

function UseCaseCard({ useCase, index }: { useCase: typeof USE_CASES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/20">
          <CollapsibleTrigger className="flex items-start gap-4 w-full text-left cursor-pointer">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <useCase.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-1">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground">{useCase.short}</p>
            </div>
            <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pl-14">
            <p className="text-sm text-muted-foreground leading-relaxed">{useCase.detail}</p>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
}
