import { UseFormReturn } from "react-hook-form";
import { CreateStreamFormValues } from "@/lib/create-stream-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { formatAddress } from "@/lib/mock-data";

const recentRecipients = [
  "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
  "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS",
];

interface Props {
  form: UseFormReturn<CreateStreamFormValues>;
}

export function StepRecipient({ form }: Props) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue("recipientAddress", text, { shouldValidate: true });
    } catch { /* clipboard denied */ }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Recipient Address</h3>
        <p className="text-sm text-muted-foreground">Enter the Stacks address that will receive the stream.</p>
      </div>

      <FormField
        control={form.control}
        name="recipientAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stacks Address</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="SP..." className="pr-10 font-mono" {...field} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={handlePaste}
                >
                  <Clipboard className="h-3.5 w-3.5" />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {recentRecipients.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">Recent Recipients</p>
          <div className="flex flex-wrap gap-2">
            {recentRecipients.map((addr) => (
              <Button
                key={addr}
                type="button"
                variant="outline"
                size="sm"
                className="font-mono text-xs"
                onClick={() => form.setValue("recipientAddress", addr, { shouldValidate: true })}
              >
                {formatAddress(addr)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
