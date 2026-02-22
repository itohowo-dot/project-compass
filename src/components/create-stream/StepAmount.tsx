import { UseFormReturn } from "react-hook-form";
import { CreateStreamFormValues } from "@/lib/create-stream-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";

const MOCK_BTC_USD = 97500;

interface Props {
  form: UseFormReturn<CreateStreamFormValues>;
}

export function StepAmount({ form }: Props) {
  const { balance } = useWallet();
  const amount = form.watch("amount");
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
            <FormLabel>Amount (sBTC)</FormLabel>
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
    </div>
  );
}
