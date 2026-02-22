import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stream, getWithdrawable, getRemaining, getTimeLeft, getDailyRate } from "@/lib/mock-data";
import { AnimatedNumber } from "@/components/AnimatedNumber";

interface Props {
  stream: Stream;
}

export function StreamQuickStats({ stream }: Props) {
  const numericStats = [
    { label: "Vested", value: stream.vestedAmount, decimals: 4, suffix: " sBTC" },
    { label: "Withdrawn", value: stream.withdrawnAmount, decimals: 4, suffix: " sBTC" },
    { label: "Withdrawable", value: getWithdrawable(stream), decimals: 4, suffix: " sBTC" },
    { label: "Remaining", value: getRemaining(stream), decimals: 4, suffix: " sBTC" },
  ];

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {numericStats.map((s) => (
            <div key={s.label}>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-sm font-mono font-medium">
                <AnimatedNumber value={s.value} decimals={s.decimals} suffix={s.suffix} duration={1000} />
              </p>
            </div>
          ))}
          <div>
            <p className="text-xs text-muted-foreground">Time Left</p>
            <p className="text-sm font-mono font-medium">{getTimeLeft(stream)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Daily Rate</p>
            <p className="text-sm font-mono font-medium">
              <AnimatedNumber value={getDailyRate(stream)} decimals={6} suffix=" sBTC" duration={1000} />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
