import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, User, MapPin, Calendar, FileText, AlertCircle } from "lucide-react";

export default function EntityProfile() {
  const { id } = useParams();

  // Mock entity data
  const entity = {
    id: id,
    name: "Sample Entity Name",
    type: "individual", // or "organization"
    position: "Former Minister of Finance",
    organization: "Government of Nepal",
    location: "Kathmandu, Nepal",
    activeSince: "2015-01-01",
    photoUrl: "/placeholder.svg",
    bio: "Brief biography or description of the entity. This section provides context about their role, responsibilities, and public service history.",
    allegations: [
      {
        id: "1",
        title: "Misappropriation of Development Funds",
        date: "2023-05-15",
        status: "under-investigation",
        severity: "high"
      },
      {
        id: "2",
        title: "Conflict of Interest in Contract Awards",
        date: "2023-03-10",
        status: "verified",
        severity: "medium"
      }
    ],
    responses: [
      {
        id: "1",
        allegationId: "1",
        date: "2023-06-01",
        content: "I categorically deny these allegations. All development funds were used according to proper procedures and oversight.",
        verified: true
      }
    ]
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/cases">← Back to Cases</Link>
          </Button>

          {/* Entity Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-lg bg-muted flex items-center justify-center">
                    {entity.type === "individual" ? (
                      <User className="h-16 w-16 text-muted-foreground" />
                    ) : (
                      <Building2 className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{entity.name}</h1>
                      <p className="text-lg text-muted-foreground">{entity.position}</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {entity.type === "individual" ? "Individual" : "Organization"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{entity.organization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{entity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Active since {new Date(entity.activeSince).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{entity.allegations.length} allegations</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Biography</h3>
                <p className="text-muted-foreground">{entity.bio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Allegations Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Allegations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {entity.allegations.map((allegation) => (
                <Card key={allegation.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <Link to={`/case/${allegation.id}`} className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                        {allegation.title}
                      </Link>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={statusConfig[allegation.status as keyof typeof statusConfig].className}>
                          {statusConfig[allegation.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge className={severityConfig[allegation.severity as keyof typeof severityConfig].className}>
                          {severityConfig[allegation.severity as keyof typeof severityConfig].label}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reported on {new Date(allegation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    
                    {/* Show response if exists */}
                    {entity.responses.find(r => r.allegationId === allegation.id) && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-foreground">Entity Response</span>
                          <Badge variant="outline" className="text-xs">Verified</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entity.responses.find(r => r.allegationId === allegation.id)?.content}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Entity Response CTA */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Are you {entity.name}?
                </h3>
                <p className="text-muted-foreground mb-4">
                  You have the right to respond to these allegations. Your response will be displayed alongside the allegations.
                </p>
                <Button asChild>
                  <Link to={`/entity-response/${entity.id}`}>Submit Response</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
