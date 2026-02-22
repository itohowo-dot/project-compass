import { UseFormReturn } from "react-hook-form";
import { CreateStreamFormValues } from "@/lib/create-stream-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { formatAddress } from "@/lib/mock-data";
import { Loader2, ShieldCheck } from "lucide-react";
import { addDays, format } from "date-fns";

const MOCK_BTC_USD = 97500;
const BLOCKS_PER_DAY = 144;
const MOCK_FEE = 0.000012;

interface Props {
  form: UseFormReturn<CreateStreamFormValues>;
  isSubmitting: boolean;
}

export function StepReview({ form, isSubmitting }: Props) {
  const { address } = useWallet();
  const values = form.getValues();
  const dailyRate = values.amount / values.durationDays;
  const startDate = new Date();
  const endDate = addDays(startDate, values.durationDays);
  const usd = (values.amount * MOCK_BTC_USD).toLocaleString("en-US", { style: "currency", currency: "USD" });

  const rows = [
    { label: "From", value: address ? formatAddress(address) : "—", mono: true },
    { label: "To", value: formatAddress(values.recipientAddress), mono: true },
    { label: "Amount", value: `${values.amount} sBTC (${usd})` },
    { label: "Duration", value: `${values.durationDays} days (${(values.durationDays * BLOCKS_PER_DAY).toLocaleString()} blocks)` },
    { label: "Rate", value: `${dailyRate.toFixed(6)} sBTC/day` },
    { label: "Start", value: format(startDate, "MMM d, yyyy") },
    { label: "End (est.)", value: format(endDate, "MMM d, yyyy") },
    { label: "Network Fee", value: `~${MOCK_FEE} STX` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Review Stream</h3>
        <p className="text-sm text-muted-foreground">Confirm all details before creating.</p>
      </div>

      <Card className="gradient-card border-border/50">
        <CardContent className="p-5 space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{r.label}</span>
              <span className={r.mono ? "font-mono" : ""}>{r.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Your sBTC will be held in a trustless escrow smart contract. The recipient can withdraw vested funds at any time, and you can cancel to reclaim unvested funds.
        </p>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        Create Stream
      </Button>
    </div>
  );
}
