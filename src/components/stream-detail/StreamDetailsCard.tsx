import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stream, formatAddress } from "@/lib/mock-data";
import { format } from "date-fns";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  completed: { label: "Completed", className: "bg-success/20 text-success border-success/30" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

interface Props {
  stream: Stream;
}

export function StreamDetailsCard({ stream }: Props) {
  const status = statusConfig[stream.status];
  const rows = [
    { label: "Sender", value: formatAddress(stream.sender), mono: true },
    { label: "Recipient", value: formatAddress(stream.recipient), mono: true },
    { label: "Total Amount", value: `${stream.totalAmount} sBTC` },
    { label: "Duration", value: `${stream.durationDays} days` },
    { label: "Start Block", value: stream.startBlock.toLocaleString() },
    { label: "End Block", value: stream.endBlock.toLocaleString() },
    { label: "Created", value: format(new Date(stream.createdAt), "MMM d, yyyy HH:mm") },
  ];

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Stream Details</CardTitle>
          <Badge variant="outline" className={status.className}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{r.label}</span>
            <span className={r.mono ? "font-mono" : ""}>{r.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
