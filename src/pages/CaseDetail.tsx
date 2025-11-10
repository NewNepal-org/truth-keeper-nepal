import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuditTrail } from "@/components/AuditTrail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, User, FileText, AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams();

  // Mock data - in real app would fetch based on ID
  const caseData = {
    id: "1",
    title: "Alleged Misappropriation of Public Funds in Highway Construction",
    entity: "Department of Roads, Ministry of Physical Infrastructure",
    location: "Kathmandu Valley",
    date: "March 15, 2024",
    status: "under-investigation" as const,
    severity: "high" as const,
    description: "Investigation into alleged irregularities in the bidding process and fund allocation for the Ring Road expansion project.",
    fullDescription: `The Department of Roads under the Ministry of Physical Infrastructure is under investigation for alleged 
    misappropriation of public funds totaling NPR 2.5 billion allocated for the Kathmandu Ring Road expansion project. 
    The investigation was initiated following multiple complaints from civil society organizations and whistleblowers within 
    the department.`,
    allegations: [
      "Irregularities in the contractor selection and bidding process",
      "Overpricing of construction materials by approximately 40%",
      "Payments made to contractors for work not completed",
      "Kickbacks allegedly paid to senior officials for contract awards",
    ],
    timeline: [
      { date: "January 2023", event: "Project tender announced with budget of NPR 2.5 billion" },
      { date: "March 2023", event: "Contract awarded to XYZ Construction without transparent bidding" },
      { date: "August 2023", event: "First complaints filed regarding overpricing and quality issues" },
      { date: "December 2023", event: "Internal audit reveals discrepancies in fund allocation" },
      { date: "March 2024", event: "Formal investigation launched by Commission for Investigation of Abuse of Authority (CIAA)" },
    ],
    involvedParties: [
      { name: "Senior Engineer A", role: "Department of Roads", status: "Under investigation" },
      { name: "Director B", role: "Ministry of Physical Infrastructure", status: "Under investigation" },
      { name: "XYZ Construction Pvt. Ltd.", role: "Contractor", status: "Under investigation" },
    ],
    evidence: [
      "Internal audit report highlighting fund discrepancies",
      "Whistleblower testimonies from department employees",
      "Financial transaction records showing irregular payments",
      "Comparative market analysis showing overpriced materials",
    ],
    sources: [
      { title: "CIAA Official Statement", url: "#", date: "March 15, 2024" },
      { title: "Kathmandu Post Investigation Report", url: "#", date: "March 10, 2024" },
      { title: "Civil Society Statement", url: "#", date: "February 28, 2024" },
    ],
    auditTrail: [
      {
        id: "1",
        action: "created" as const,
        description: "Case submitted by anonymous contributor",
        user: "Anonymous",
        timestamp: "2024-02-20T10:30:00Z"
      },
      {
        id: "2",
        action: "updated" as const,
        description: "Additional evidence and sources added",
        user: "Moderator: John Doe",
        timestamp: "2024-02-25T14:15:00Z",
        changes: ["Added audit report", "Updated timeline"]
      },
      {
        id: "3",
        action: "verified" as const,
        description: "Case information verified against official CIAA records",
        user: "Moderator: Jane Smith",
        timestamp: "2024-03-01T09:00:00Z"
      },
      {
        id: "4",
        action: "published" as const,
        description: "Case published to public platform",
        user: "Admin: Sarah Johnson",
        timestamp: "2024-03-15T16:45:00Z"
      }
    ]
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/cases">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cases
            </Link>
          </Button>

          {/* Case Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={statusConfig[caseData.status].color}>
                {statusConfig[caseData.status].label}
              </Badge>
              <Badge variant="outline" className={severityConfig[caseData.severity].color}>
                {severityConfig[caseData.severity].label} Severity
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-6">{caseData.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-muted-foreground">
                <User className="mr-2 h-5 w-5" />
                <span className="text-sm">{caseData.entity}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-5 w-5" />
                <span className="text-sm">{caseData.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-5 w-5" />
                <span className="text-sm">Filed: {caseData.date}</span>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Case Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">{caseData.description}</p>
              <p className="text-muted-foreground leading-relaxed">{caseData.fullDescription}</p>
            </CardContent>
          </Card>

          {/* Allegations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Key Allegations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {caseData.allegations.map((allegation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{allegation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Case Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseData.timeline.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      {index !== caseData.timeline.length - 1 && (
                        <div className="w-px h-full bg-border my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="text-sm font-semibold text-foreground mb-1">{item.date}</p>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Involved Parties */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Parties Involved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.involvedParties.map((party, index) => (
                  <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-semibold text-foreground">{party.name}</p>
                      <p className="text-sm text-muted-foreground">{party.role}</p>
                    </div>
                    <Badge variant="outline">{party.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Documentary Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {caseData.evidence.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sources & References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {source.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{source.date}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit Trail */}
          <AuditTrail entries={caseData.auditTrail} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetail;
