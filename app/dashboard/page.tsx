import { StatCard } from "@/components/StatCard";
import { PatientCard } from "@/components/PatientCard";
import { RecentRecordCard } from "@/components/RecentRecordCard";
import { Users, FileText, Calendar, TrendingUp } from "lucide-react";

const stats = [
  { title: "Total Patients", value: "48", icon: Users, trend: { value: "+4 from last month", positive: true } },
  { title: "Today's Visits", value: "8", icon: Calendar, trend: { value: "3 remaining", positive: true } },
  { title: "This Month's Records", value: "156", icon: FileText, trend: { value: "+12 from last month", positive: true } },
  { title: "Completion Rate", value: "94%", icon: TrendingUp, trend: { value: "+2.5%", positive: true } }
];

const todayPatients = [
  { id: "P001", name: "John Smith", age: 68, lastVisit: "2024-01-15", nextVisit: "Today 2:00 PM", status: "scheduled" as const, diagnosis: "Diabetes" },
  { id: "P002", name: "Mary Johnson", age: 72, lastVisit: "2024-01-14", nextVisit: "Today 3:30 PM", status: "scheduled" as const, diagnosis: "Hypertension" },
  { id: "P003", name: "Robert Williams", age: 65, lastVisit: "Today 10:00 AM", nextVisit: "2024-01-20", status: "completed" as const, diagnosis: "Heart Failure" }
];

const recentRecords = [
  { patientName: "Robert Williams", date: "2024-01-16 10:30 AM", type: "visit" as const, summary: "Vital signs measured...", nurse: "Sarah Johnson" },
  { patientName: "Patricia Wilson", date: "2024-01-15 08:45 PM", type: "emergency" as const, summary: "Emergency visit...", nurse: "Sarah Johnson" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Good morning, Sarah</h2>
        <p className="text-muted-foreground">
          You have 8 scheduled visits today. Don't forget to complete your records.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      {/* Today's Patients */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Today's Scheduled Visits</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {todayPatients.map((p) => <PatientCard key={p.id} {...p} />)}
        </div>
      </div>

      {/* Recent Records */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Recent Records</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recentRecords.map((r, idx) => <RecentRecordCard key={idx} {...r} />)}
        </div>
      </div>
    </div>
  );
}
