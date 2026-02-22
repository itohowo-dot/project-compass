import { DashboardLayout } from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your streams will appear here.</p>
      </div>
    </DashboardLayout>
  );
}
