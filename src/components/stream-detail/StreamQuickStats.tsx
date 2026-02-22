import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stream, getWithdrawable, getRemaining, getTimeLeft, getDailyRate } from "@/lib/mock-data";

interface Props {
  stream: Stream;
}

export function StreamQuickStats({ stream }: Props) {
  const stats = [
    { label: "Vested", value: `${stream.vestedAmount.toFixed(4)} sBTC` },
    { label: "Withdrawn", value: `${stream.withdrawnAmount.toFixed(4)} sBTC` },
    { label: "Withdrawable", value: `${getWithdrawable(stream).toFixed(4)} sBTC` },
    { label: "Remaining", value: `${getRemaining(stream).toFixed(4)} sBTC` },
    { label: "Time Left", value: getTimeLeft(stream) },
    { label: "Daily Rate", value: `${getDailyRate(stream).toFixed(6)} sBTC` },
  ];

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-sm font-mono font-medium">{s.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
