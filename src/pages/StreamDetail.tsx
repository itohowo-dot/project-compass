import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StreamDetail() {
  const { id } = useParams();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Stream #{id}</h1>
        <p className="text-muted-foreground">Stream details coming soon.</p>
      </div>
    </DashboardLayout>
  );
}
