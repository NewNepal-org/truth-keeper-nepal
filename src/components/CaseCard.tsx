import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";

interface CaseCardProps {
  id: string;
  title: string;
  entity: string;
  location: string;
  date: string;
  status: "ongoing" | "resolved" | "under-investigation";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
}

const statusConfig = {
  ongoing: { label: "Ongoing", color: "bg-alert text-alert-foreground" },
  resolved: { label: "Resolved", color: "bg-success text-success-foreground" },
  "under-investigation": { label: "Under Investigation", color: "bg-muted text-muted-foreground" },
};

const severityConfig = {
  low: { label: "Low", color: "bg-slate-200 text-slate-700" },
  medium: { label: "Medium", color: "bg-yellow-500/20 text-yellow-700" },
  high: { label: "High", color: "bg-orange-500/20 text-orange-700" },
  critical: { label: "Critical", color: "bg-destructive/20 text-destructive" },
};

export const CaseCard = ({ id, title, entity, location, date, status, severity, description }: CaseCardProps) => {
  return (
    <Link to={`/case/${id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={statusConfig[status].color}>{statusConfig[status].label}</Badge>
            <Badge variant="outline" className={severityConfig[severity].color}>
              {severityConfig[severity].label}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-2 h-4 w-4 flex-shrink-0" />
              <Link 
                to={`/entity/${id}`}
                className="line-clamp-1 hover:text-primary hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {entity}
              </Link>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm font-medium text-primary hover:underline">View Details →</span>
        </CardFooter>
      </Card>
    </Link>
  );
};
