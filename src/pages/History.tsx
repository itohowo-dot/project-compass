import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StreamCard } from "@/components/StreamCard";
import { StreamCardSkeleton } from "@/components/StreamCardSkeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { mockStreams, mockTransactions, getStreamById, formatAddress } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { Search, Droplets, ExternalLink, LayoutGrid, List } from "lucide-react";
import { format } from "date-fns";

type SortKey = "newest" | "oldest" | "highest";
type TxTypeFilter = "all" | "created" | "withdrawn" | "cancelled";
type ViewMode = "streams" | "transactions";

const TX_PER_PAGE = 5;

const typeConfig: Record<string, { label: string; className: string }> = {
  created: { label: "Created", className: "bg-primary/20 text-primary border-primary/30" },
  withdrawn: { label: "Withdrawn", className: "bg-accent/20 text-accent border-accent/30" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

export default function History() {
  const isLoading = useSimulatedLoading(800);
  const [view, setView] = useState<ViewMode>("streams");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [txType, setTxType] = useState<TxTypeFilter>("all");
  const [txPage, setTxPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setTxPage(1);
  }, [txType, search, sort]);
  // Streams filtering (unchanged)
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

  // Transaction filtering
  const filteredTxs = useMemo(() => {
    let txs = mockTransactions.map((tx) => {
      const stream = getStreamById(tx.streamId);
      return { ...tx, stream };
    });

    if (txType !== "all") txs = txs.filter((tx) => tx.type === txType);

    if (search.trim()) {
      const q = search.toLowerCase();
      txs = txs.filter(
        (tx) =>
          tx.txHash.toLowerCase().includes(q) ||
          (tx.stream?.sender.toLowerCase().includes(q) ?? false) ||
          (tx.stream?.recipient.toLowerCase().includes(q) ?? false)
      );
    }

    return [...txs].sort((a, b) => {
      if (sort === "oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      if (sort === "highest") return b.amount - a.amount;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [txType, search, sort]);

  const counts = {
    all: mockStreams.length,
    active: mockStreams.filter((s) => s.status === "active").length,
    completed: mockStreams.filter((s) => s.status === "completed").length,
    cancelled: mockStreams.filter((s) => s.status === "cancelled").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-muted-foreground text-sm mt-1">View and filter all your payment streams.</p>
          </div>
          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-md border border-border p-1">
            <Button
              variant={view === "streams" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2.5"
              onClick={() => setView("streams")}
            >
              <LayoutGrid className="h-4 w-4 mr-1.5" />
              Streams
            </Button>
            <Button
              variant={view === "transactions" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2.5"
              onClick={() => setView("transactions")}
            >
              <List className="h-4 w-4 mr-1.5" />
              Transactions
            </Button>
          </div>
        </div>

        {/* Search & Sort & optional type filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={view === "streams" ? "Search by address..." : "Search by address or tx hash..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {view === "transactions" && (
            <Select value={txType} onValueChange={(v) => setTxType(v as TxTypeFilter)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          )}
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

        {/* === STREAMS VIEW === */}
        {view === "streams" && (
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex w-full overflow-x-auto sm:inline-flex sm:w-auto">
              <TabsTrigger value="all" className="flex-shrink-0">All <Badge variant="secondary" className="ml-1.5 text-xs">{counts.all}</Badge></TabsTrigger>
              <TabsTrigger value="active" className="flex-shrink-0">Active <Badge variant="secondary" className="ml-1.5 text-xs">{counts.active}</Badge></TabsTrigger>
              <TabsTrigger value="completed" className="flex-shrink-0">Completed <Badge variant="secondary" className="ml-1.5 text-xs">{counts.completed}</Badge></TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-shrink-0">Cancelled <Badge variant="secondary" className="ml-1.5 text-xs">{counts.cancelled}</Badge></TabsTrigger>
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
                    <Droplets className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-base font-semibold mb-1">No streams found</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* === TRANSACTIONS VIEW === */}
        {view === "transactions" && (
          <>
            {isLoading ? (
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="space-y-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-border/50 last:border-0">
                      <Skeleton className="h-5 w-20 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16 hidden sm:block" />
                      <Skeleton className="h-4 w-28 hidden sm:block" />
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredTxs.length > 0 ? (
              (() => {
                const totalPages = Math.ceil(filteredTxs.length / TX_PER_PAGE);
                const paginatedTxs = filteredTxs.slice((txPage - 1) * TX_PER_PAGE, txPage * TX_PER_PAGE);
                const startItem = (txPage - 1) * TX_PER_PAGE + 1;
                const endItem = Math.min(txPage * TX_PER_PAGE, filteredTxs.length);

                const getPageNumbers = () => {
                  const pages: (number | "ellipsis")[] = [];
                  if (totalPages <= 5) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    pages.push(1);
                    if (txPage > 3) pages.push("ellipsis");
                    for (let i = Math.max(2, txPage - 1); i <= Math.min(totalPages - 1, txPage + 1); i++) pages.push(i);
                    if (txPage < totalPages - 2) pages.push("ellipsis");
                    pages.push(totalPages);
                  }
                  return pages;
                };

                return (
              <div className="space-y-4">
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Stream</TableHead>
                      <TableHead className="hidden sm:table-cell">Counterparty</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Tx Hash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTxs.map((tx) => {
                      const cfg = typeConfig[tx.type];
                      const counterparty = tx.stream
                        ? tx.stream.direction === "outgoing"
                          ? tx.stream.recipient
                          : tx.stream.sender
                        : "—";
                      return (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                          </TableCell>
                          <TableCell className="font-mono">{tx.amount.toFixed(4)} sBTC</TableCell>
                          <TableCell>
                            <Link
                              to={`/stream/${tx.streamId}`}
                              className="text-accent hover:underline text-sm"
                            >
                              #{tx.streamId}
                            </Link>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                            {counterparty !== "—" ? formatAddress(counterparty) : "—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {format(new Date(tx.timestamp), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <a
                              href={`https://explorer.stacks.co/txid/${tx.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                            >
                              {tx.txHash.slice(0, 8)}…
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    Showing {startItem}–{endItem} of {filteredTxs.length} transactions
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setTxPage((p) => Math.max(1, p - 1))}
                          className={txPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {getPageNumbers().map((page, i) =>
                        page === "ellipsis" ? (
                          <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={txPage === page}
                              onClick={() => setTxPage(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setTxPage((p) => Math.min(totalPages, p + 1))}
                          className={txPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              </div>
                );
              })()
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center gradient-card rounded-lg border border-border/50">
                <Droplets className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-base font-semibold mb-1">No transactions found</h3>
                <p className="text-muted-foreground text-sm max-w-xs">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
