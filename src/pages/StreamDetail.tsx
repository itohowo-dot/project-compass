import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StreamProgress } from "@/components/stream-detail/StreamProgress";
import { StreamDetailsCard } from "@/components/stream-detail/StreamDetailsCard";
import { StreamQuickStats } from "@/components/stream-detail/StreamQuickStats";
import { StreamActions } from "@/components/stream-detail/StreamActions";
import { TransactionHistory } from "@/components/stream-detail/TransactionHistory";
import { StreamDetailSkeleton } from "@/components/stream-detail/StreamDetailSkeleton";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getStreamById } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { ArrowLeft, Droplets } from "lucide-react";

export default function StreamDetail() {
  const { id } = useParams();
  const stream = id ? getStreamById(id) : undefined;
  const isLoading = useSimulatedLoading(600);

  if (!stream) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Droplets className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Stream Not Found</h2>
          <p className="text-muted-foreground text-sm mb-6">The stream you're looking for doesn't exist.</p>
          <Button asChild><Link to="/dashboard"><ArrowLeft className="h-4 w-4 mr-1" />Back to Dashboard</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {isLoading ? (
        <StreamDetailSkeleton />
      ) : (
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Stream #{stream.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold">Stream #{stream.id}</h1>
          <StreamProgress stream={stream} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <StreamDetailsCard stream={stream} />
              <StreamQuickStats stream={stream} />
            </div>
            <div className="space-y-6">
              <StreamActions stream={stream} />
              <TransactionHistory streamId={stream.id} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
