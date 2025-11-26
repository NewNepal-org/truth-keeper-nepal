import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuditTrail } from "@/components/AuditTrail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, MapPin, User, FileText, AlertTriangle, ArrowLeft, ExternalLink, AlertCircle } from "lucide-react";
import { getCaseById } from "@/services/jds-api";
import type { CaseDetail as CaseDetailType } from "@/types/jds";
import { toast } from "sonner";

const CaseDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [caseData, setCaseData] = useState<CaseDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getCaseById(parseInt(id));
        setCaseData(data);
      } catch (err) {
        console.error("Failed to fetch case:", err);
        setError(t("caseDetail.failedToLoad"));
        toast.error(t("caseDetail.failedToLoad"));
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <div className="space-y-8">
              <div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/cases">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("caseDetail.backToCases")}
              </Link>
            </Button>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || t("caseDetail.notFound")}
              </AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/cases">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("caseDetail.backToCases")}
            </Link>
          </Button>

          {/* Case Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-alert text-alert-foreground">
                {t("caseDetail.status.ongoing")}
              </Badge>
              <Badge variant="outline" className={caseData.case_type === 'CORRUPTION' ? 'bg-destructive/20 text-destructive' : 'bg-orange-500/20 text-orange-700'}>
                {caseData.case_type === 'CORRUPTION' ? t("cases.type.corruption") : t("cases.type.brokenPromise")} {t("caseDetail.severity")}
              </Badge>
              {caseData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {/* NOTE: Dynamic case content from Entity API remains in English until API-side i18n is implemented */}
            <h1 className="text-4xl font-bold text-foreground mb-6">{caseData.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-muted-foreground">
                <User className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="text-sm">
                  {caseData.alleged_entities.join(', ')}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-5 w-5" />
                <span className="text-sm">{caseData.locations[0] || 'N/A'}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-5 w-5" />
                <span className="text-sm">{t("caseDetail.filed")}: {new Date(caseData.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                {t("caseDetail.overview")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{caseData.description}</p>
            </CardContent>
          </Card>

          {/* Key Allegations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                {t("caseDetail.allegations")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {caseData.key_allegations.map((allegation, index) => (
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
          {caseData.timeline.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("caseDetail.timeline")}</CardTitle>
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
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium text-foreground mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Entities */}
          {caseData.related_entities.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("caseDetail.partiesInvolved")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {caseData.related_entities.map((entity, index) => (
                    <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-semibold text-foreground">{entity}</p>
                        <p className="text-sm text-muted-foreground">{t("caseDetail.relatedEntity")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Evidence */}
          {caseData.evidence.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("caseDetail.evidenceSources")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.evidence.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{t("caseDetail.evidence")} #{item.source_id}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Audit Trail */}
          {caseData.audit_history && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("caseDetail.auditTrail")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.audit_history.versions?.map((version, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">
                          {t("caseDetail.version")} {version.version_number}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(version.datetime).toLocaleDateString()}
                        </span>
                      </div>
                      {version.change_summary && (
                        <p className="text-sm text-muted-foreground">{version.change_summary}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetail;
