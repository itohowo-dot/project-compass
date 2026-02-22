import { useState } from "react";
import { Wallet, ChevronDown, LogOut, Copy, Check } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function WalletButton() {
  const { connected, address, balance, walletType, connect, disconnect } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (connected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs">{truncateAddress(address)}</span>
            <span className="text-xs text-muted-foreground">{balance.toFixed(4)} sBTC</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleCopy} className="gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Address"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnect} className="gap-2 text-destructive focus:text-destructive">
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)} className="gap-2 gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>Choose a wallet to connect to DRIP Protocol</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            {(["leather", "xverse"] as const).map((type) => (
              <button
                key={type}
                onClick={() => { connect(type); setModalOpen(false); }}
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/40 hover:bg-primary/5 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium capitalize">{type}</p>
                  <p className="text-xs text-muted-foreground">
                    {type === "leather" ? "Bitcoin & Stacks wallet" : "Bitcoin, Ordinals & Stacks"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
