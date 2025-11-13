import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  status: "verified" | "under-investigation" | "resolved";
  severity: "high" | "medium" | "low";
}

interface AllegationTimelineProps {
  allegations: TimelineItem[];
}

const statusConfig = {
  "verified": { label: "Verified", className: "bg-destructive/10 text-destructive" },
  "under-investigation": { label: "Under Investigation", className: "bg-warning/10 text-warning" },
  "resolved": { label: "Resolved", className: "bg-success/10 text-success" }
};

const severityConfig = {
  "high": { label: "High Severity", className: "bg-destructive/10 text-destructive" },
  "medium": { label: "Medium Severity", className: "bg-warning/10 text-warning" },
  "low": { label: "Low Severity", className: "bg-muted/10 text-muted-foreground" }
};

export const AllegationTimeline = ({ allegations }: AllegationTimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Allegations Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {allegations.map((item, index) => (
              <div key={item.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 h-8 w-8 flex items-center justify-center rounded-full bg-background border-2 border-primary">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                
                <Link 
                  to={`/case/${item.id}`}
                  className="block p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={statusConfig[item.status].className}>
                        {statusConfig[item.status].label}
                      </Badge>
                      <Badge className={severityConfig[item.severity].className}>
                        {severityConfig[item.severity].label}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
