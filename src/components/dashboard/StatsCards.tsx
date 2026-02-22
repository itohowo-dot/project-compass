import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Activity } from "lucide-react";
import { mockStreams } from "@/lib/mock-data";
import { AnimatedNumber } from "@/components/AnimatedNumber";

export function StatsCards() {
  const outgoing = mockStreams.filter((s) => s.direction === "outgoing" && s.status === "active");
  const incoming = mockStreams.filter((s) => s.direction === "incoming");
  const activeCount = mockStreams.filter((s) => s.status === "active").length;

  const totalStreaming = outgoing.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalReceived = incoming.reduce((sum, s) => sum + s.withdrawnAmount, 0);

  const stats = [
    {
      label: "Total Streaming",
      value: totalStreaming,
      decimals: 4,
      suffix: " sBTC",
      subtitle: `${outgoing.length} outgoing streams`,
      icon: ArrowUpRight,
      iconClass: "text-primary",
    },
    {
      label: "Total Received",
      value: totalReceived,
      decimals: 4,
      suffix: " sBTC",
      subtitle: "Lifetime withdrawn",
      icon: ArrowDownLeft,
      iconClass: "text-accent",
    },
    {
      label: "Active Streams",
      value: activeCount,
      decimals: 0,
      suffix: "",
      subtitle: `${outgoing.length} out · ${mockStreams.filter((s) => s.direction === "incoming" && s.status === "active").length} in`,
      icon: Activity,
      iconClass: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="gradient-card border-border/50 hover:glow-amber transition-shadow duration-300">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
            </div>
            <p className="text-2xl font-bold tracking-tight font-mono">
              <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
