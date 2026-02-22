import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { getTransactionsForStream, type Transaction } from "@/lib/mock-data";
import { format } from "date-fns";

const typeConfig: Record<string, { label: string; className: string }> = {
  created: { label: "Created", className: "bg-primary/20 text-primary border-primary/30" },
  withdrawn: { label: "Withdrawn", className: "bg-accent/20 text-accent border-accent/30" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

interface Props {
  streamId: string;
}

export function TransactionHistory({ streamId }: Props) {
  const txs = getTransactionsForStream(streamId);

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {txs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No transactions yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Tx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.map((tx) => {
                const cfg = typeConfig[tx.type];
                return (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{tx.amount.toFixed(4)} sBTC</TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(tx.timestamp), "MMM d, yyyy")}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
}
