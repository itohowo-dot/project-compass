import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StreamCard } from "@/components/StreamCard";
import { StreamCardSkeleton } from "@/components/StreamCardSkeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockStreams } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Search, Droplets } from "lucide-react";

type SortKey = "newest" | "oldest" | "highest";

export default function History() {
  const isLoading = useSimulatedLoading(800);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let streams = mockStreams;
    if (tab === "completed") streams = streams.filter((s) => s.status === "completed");
    else if (tab === "cancelled") streams = streams.filter((s) => s.status === "cancelled");
    else if (tab === "active") streams = streams.filter((s) => s.status === "active");

    if (search.trim()) {
      const q = search.toLowerCase();
      streams = streams.filter(
        (s) => s.sender.toLowerCase().includes(q) || s.recipient.toLowerCase().includes(q)
      );
    }

    return [...streams].sort((a, b) => {
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "highest") return b.totalAmount - a.totalAmount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [tab, search, sort]);

  const counts = {
    all: mockStreams.length,
    active: mockStreams.filter((s) => s.status === "active").length,
    completed: mockStreams.filter((s) => s.status === "completed").length,
    cancelled: mockStreams.filter((s) => s.status === "cancelled").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground text-sm mt-1">View and filter all your payment streams.</p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-4 sm:inline-flex sm:w-auto">
            <TabsTrigger value="all">All <Badge variant="secondary" className="ml-1.5 text-xs">{counts.all}</Badge></TabsTrigger>
            <TabsTrigger value="active">Active <Badge variant="secondary" className="ml-1.5 text-xs">{counts.active}</Badge></TabsTrigger>
            <TabsTrigger value="completed">Completed <Badge variant="secondary" className="ml-1.5 text-xs">{counts.completed}</Badge></TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled <Badge variant="secondary" className="ml-1.5 text-xs">{counts.cancelled}</Badge></TabsTrigger>
          </TabsList>

          {["all", "active", "completed", "cancelled"].map((t) => (
            <TabsContent key={t} value={t}>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {[1, 2, 3].map((i) => <StreamCardSkeleton key={i} />)}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {filtered.map((s) => <StreamCard key={s.id} stream={s} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center gradient-card rounded-lg border border-border/50 mt-4">
                  <Droplets className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm">No streams match this filter.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
