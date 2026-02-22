import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Eye } from "lucide-react";
import { Stream, getProgress, getTimeLeft, getWithdrawable, getRemaining, formatAddress } from "@/lib/mock-data";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  completed: { label: "Completed", className: "bg-success/20 text-success border-success/30" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

interface Props {
  stream: Stream;
}

export function StreamCard({ stream }: Props) {
  const progress = getProgress(stream);
  const timeLeft = getTimeLeft(stream);
  const withdrawable = getWithdrawable(stream);
  const remaining = getRemaining(stream);
  const status = statusConfig[stream.status];
  const isOutgoing = stream.direction === "outgoing";
  const counterparty = isOutgoing ? stream.recipient : stream.sender;

  return (
    <Card className="gradient-card border-border/50 hover:shadow-[0_8px_30px_hsl(36_100%_50%/0.08)] hover:-translate-y-0.5 transition-all duration-300 group">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isOutgoing ? "bg-primary/10" : "bg-accent/10"}`}>
              {isOutgoing ? (
                <ArrowUpRight className="h-4 w-4 text-primary" />
              ) : (
                <ArrowDownLeft className="h-4 w-4 text-accent" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{isOutgoing ? "To" : "From"}</p>
              <p className="text-xs text-muted-foreground font-mono">{formatAddress(counterparty)}</p>
            </div>
          </div>
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 w-full rounded-full bg-secondary overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              stream.status === "active" ? "gradient-primary" : stream.status === "completed" ? "bg-success" : "bg-destructive/60"
            }`}
            style={{ width: `${progress}%` }}
          />
          {stream.status === "active" && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                   style={{ backgroundSize: "200% 100%" }} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{progress.toFixed(1)}% vested</span>
          <span>{timeLeft}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Vested</p>
            <p className="text-sm font-mono font-medium">{stream.vestedAmount.toFixed(4)} sBTC</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-sm font-mono font-medium">{remaining.toFixed(4)} sBTC</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/stream/${stream.id}`}>
              <Eye className="h-3.5 w-3.5 mr-1" />
              Details
            </Link>
          </Button>
          {stream.status === "active" && (
            <Button
              variant={isOutgoing ? "destructive" : "default"}
              size="sm"
              className="flex-1"
            >
              {isOutgoing ? "Cancel" : `Withdraw ${withdrawable.toFixed(4)}`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
