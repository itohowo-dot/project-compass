import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateStreamFormValues } from "@/lib/create-stream-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const MOCK_BTC_USD = 97500;

interface Props {
  form: UseFormReturn<CreateStreamFormValues>;
}

export function StepAmount({ form }: Props) {
  const { balance } = useWallet();
  const amount = form.watch("amount");
  const exceedsBalance = typeof amount === "number" && amount > balance;

  useEffect(() => {
    if (exceedsBalance) {
      form.setError("amount", { message: `Amount exceeds your balance of ${balance.toFixed(4)} sBTC` });
    } else if (typeof amount === "number" && amount > 0) {
      form.clearErrors("amount");
    }
  }, [amount, balance, exceedsBalance, form]);
  const usdValue = amount ? (amount * MOCK_BTC_USD).toLocaleString("en-US", { style: "currency", currency: "USD" }) : "$0.00";

  const setPercent = (pct: number) => {
    const val = parseFloat((balance * pct).toFixed(8));
    form.setValue("amount", val, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Stream Amount</h3>
        <p className="text-sm text-muted-foreground">How much sBTC do you want to stream?</p>
      </div>

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              Amount (sBTC)
              {typeof amount === "number" && amount > 0 && !exceedsBalance && (
                <CheckCircle2 className="h-3.5 w-3.5 text-primary animate-in fade-in" />
              )}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                step="any"
                placeholder="0.0000"
                className="font-mono text-lg"
                {...field}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">≈ {usdValue}</span>
        <span className="text-muted-foreground">Balance: <span className="font-mono text-foreground">{balance.toFixed(4)} sBTC</span></span>
      </div>

      <div className="flex gap-2">
        {[0.25, 0.5, 0.75, 1].map((pct) => (
          <Button key={pct} type="button" variant="outline" size="sm" className="flex-1" onClick={() => setPercent(pct)}>
            {pct === 1 ? "MAX" : `${pct * 100}%`}
          </Button>
        ))}
      </div>

      {exceedsBalance && (
        <Alert variant="destructive" className="mt-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Amount exceeds your available balance of {balance.toFixed(4)} sBTC.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
