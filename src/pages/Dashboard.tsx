import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StatsCardsSkeleton } from "@/components/dashboard/StatsCardsSkeleton";
import { StreamCard } from "@/components/StreamCard";
import { StreamCardSkeleton } from "@/components/StreamCardSkeleton";
import { Button } from "@/components/ui/button";
import { Plus, Droplets } from "lucide-react";
import { mockStreams } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const isLoading = useSimulatedLoading(800);
  const outgoing = mockStreams.filter((s) => s.direction === "outgoing");
  const incoming = mockStreams.filter((s) => s.direction === "incoming");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">{getGreeting()}, Builder 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's an overview of your payment streams.</p>
        </div>

        {isLoading ? <StatsCardsSkeleton /> : <StatsCards />}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Outgoing Streams</h2>
            <Button size="sm" asChild>
              <Link to="/create"><Plus className="h-4 w-4 mr-1" />Create Stream</Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => <StreamCardSkeleton key={i} />)}
            </div>
          ) : outgoing.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outgoing.map((s) => <StreamCard key={s.id} stream={s} />)}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Incoming Streams</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2].map((i) => <StreamCardSkeleton key={i} />)}
            </div>
          ) : incoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {incoming.map((s) => <StreamCard key={s.id} stream={s} />)}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gradient-card rounded-lg border border-border/50">
      <Droplets className="h-10 w-10 text-muted-foreground mb-3" />
      <p className="text-muted-foreground text-sm">No streams yet.</p>
      <Button size="sm" className="mt-4" asChild>
        <Link to="/create"><Plus className="h-4 w-4 mr-1" />Create your first stream</Link>
      </Button>
    </div>
  );
}
