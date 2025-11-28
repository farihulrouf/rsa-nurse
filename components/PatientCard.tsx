import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock } from "lucide-react";

interface PatientCardProps {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  nextVisit: string;
  status: "scheduled" | "completed" | "pending";
  diagnosis: string;
}

export function PatientCard({ name, age, lastVisit, nextVisit, status, diagnosis }: PatientCardProps) {
  const statusConfig = {
    scheduled: { label: "Scheduled", className: "bg-accent text-accent-foreground" },
    completed: { label: "Completed", className: "bg-success text-success-foreground" },
    pending: { label: "Pending", className: "bg-warning text-warning-foreground" }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{age}歳 • {diagnosis}</p>
          </div>
          <Badge className={statusConfig[status].className}>
            {statusConfig[status].label}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last visit: {lastVisit}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Next visit: {nextVisit}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            View Records
          </Button>
          <Button size="sm" className="flex-1 bg-teal-500">
            Create Record
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
