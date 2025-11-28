import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User } from "lucide-react";

interface RecentRecordCardProps {
  patientName: string;
  date: string;
  type: "visit" | "phone" | "emergency";
  summary: string;
  nurse: string;
}

export function RecentRecordCard({ patientName, date, type, summary, nurse }: RecentRecordCardProps) {
  const typeConfig = {
    visit: { label: "Visit", className: "bg-primary text-primary-foreground" },
    phone: { label: "Phone", className: "bg-accent text-accent-foreground" },
    emergency: { label: "Emergency", className: "bg-destructive text-destructive-foreground" }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{patientName}</h4>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>
          <Badge className={typeConfig[type].className}>
            {typeConfig[type].label}
          </Badge>
        </div>
        
        <p className="text-sm text-foreground mb-3 line-clamp-2">{summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{nurse}</span>
          </div>
          <Button variant="ghost" size="sm">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
