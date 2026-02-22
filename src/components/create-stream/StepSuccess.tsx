import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatAddress, MOCK_BTC_USD } from "@/lib/mock-data";
import type { UseFormReturn } from "react-hook-form";
import type { CreateStreamFormValues } from "@/lib/create-stream-schema";
import { addDays, format } from "date-fns";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.3, ease: "easeOut" as const, delay },
});

interface Props {
  form: UseFormReturn<CreateStreamFormValues>;
}

export function StepSuccess({ form }: Props) {
  const navigate = useNavigate();
  const { recipientAddress, amount, durationDays } = form.getValues();
  const usdValue = amount * MOCK_BTC_USD;
  const endDate = addDays(new Date(), durationDays);

  const rows = [
    { label: "Recipient", value: formatAddress(recipientAddress) },
    { label: "Amount", value: `${amount} sBTC (~$${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })})` },
    { label: "Duration", value: `${durationDays} day${durationDays !== 1 ? "s" : ""}` },
    { label: "Est. End Date", value: format(endDate, "MMM d, yyyy") },
  ];

  return (
    <div className="flex flex-col items-center text-center py-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
      </motion.div>

      <motion.h2 className="text-2xl font-bold mb-1" {...fadeUp(0.3)}>Stream Created!</motion.h2>
      <motion.p className="text-muted-foreground text-sm mb-6" {...fadeUp(0.4)}>Your payment stream is now active and streaming.</motion.p>

      <motion.div className="w-full rounded-lg border border-border/50 bg-muted/30 p-4 mb-6 text-left space-y-3" {...fadeUp(0.5)}>
        {rows.map((row, i) => (
          <motion.div key={row.label} className="flex justify-between text-sm" {...fadeUp(0.6 + i * 0.1)}>
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium">{row.value}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="flex flex-col gap-3 w-full" {...fadeUp(1.0)}>
        <Button onClick={() => navigate("/stream/1")} className="w-full">
          View Stream
        </Button>
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="w-full">
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
