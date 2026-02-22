import { UseFormReturn } from "react-hook-form";
import { CreateStreamFormValues } from "@/lib/create-stream-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { formatAddress } from "@/lib/mock-data";
import { Loader2, ShieldCheck, Info } from "lucide-react";
import { addDays, format } from "date-fns";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";

const MOCK_BTC_USD = 97500;
const BLOCKS_PER_DAY = 144;
const MOCK_FEE = 0.000012;
const MOCK_STX_USD = 1.85;

function formatSmallUsd(value: number): string {
  if (value < 0.01) return `$${value.toFixed(6).replace(/0+$/, "")}`;
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

interface Props {
  form: UseFormReturn<CreateStreamFormValues>;
  isSubmitting: boolean;
  onConfirmSubmit: () => void;
}

export function StepReview({ form, isSubmitting, onConfirmSubmit }: Props) {
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
  ];

  const feeUsd = formatSmallUsd(MOCK_FEE * MOCK_STX_USD);

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

          <div className="border-t border-border/50 pt-3 mt-3 flex items-center justify-between text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-muted-foreground flex items-center gap-1 cursor-help">
                    Network Fee <Info className="h-3.5 w-3.5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[260px]">
                  This is the estimated Stacks network transaction fee for creating the stream contract. Actual fee may vary based on network congestion.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="font-mono">~{MOCK_FEE} STX <span className="text-muted-foreground">(~{feeUsd})</span></span>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Your sBTC will be held in a trustless escrow smart contract. The recipient can withdraw vested funds at any time, and you can cancel to reclaim unvested funds.
        </p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Stream
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Stream Creation</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to create a stream of <span className="font-semibold text-foreground">{values.amount} sBTC</span> to{" "}
              <span className="font-mono text-foreground">{formatAddress(values.recipientAddress)}</span>.
              This action will submit a transaction to the Stacks network.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm & Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
