import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseCard } from "@/components/CaseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Filter, AlertCircle } from "lucide-react";
import { getAllegations } from "@/services/jds-api";
import type { Allegation } from "@/types/jds";
import { toast } from "sonner";

// Retry helper for rate-limited requests
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimited = error?.statusCode === 429 || error?.message?.includes('429');
      const isLastAttempt = i === maxRetries - 1;
      
      if (isRateLimited && !isLastAttempt) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limited. Retrying in ${delay}ms... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}

const Cases = () => {
  const [cases, setCases] = useState<Allegation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await retryWithBackoff(
        () => getAllegations({
          state: 'current',
          page: 1
        }),
        3,
        2000
      );
      setCases(response.results);
    } catch (err: any) {
      console.error("Failed to fetch cases:", err);
      const isRateLimited = err?.statusCode === 429 || err?.message?.includes('429');
      const errorMessage = isRateLimited 
        ? "Too many requests. Please wait a moment and try again."
        : "Failed to load cases. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    const matchesType = typeFilter === "all" || caseItem.allegation_type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-3">Corruption Cases</h1>
            <p className="text-muted-foreground text-lg">Browse and search documented corruption cases in Nepal</p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, entity, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="under-investigation">Under Investigation</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="corruption">Corruption</SelectItem>
                    <SelectItem value="misconduct">Misconduct</SelectItem>
                    <SelectItem value="breach_of_trust">Breach of Trust</SelectItem>
                    <SelectItem value="broken_promise">Broken Promise</SelectItem>
                    <SelectItem value="media_trial">Media Trial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setSearchQuery("");
                  fetchCases();
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `Showing ${filteredCases.length} of ${cases.length} cases`}
            </p>
          </div>

          {/* Cases Grid */}
          {error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={fetchCases} className="ml-4">
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          ) : null}
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard 
                  key={caseItem.id} 
                  id={caseItem.id.toString()}
                  title={caseItem.title}
                  entity={Array.isArray(caseItem.alleged_entities) 
                    ? caseItem.alleged_entities.join(', ') 
                    : String(caseItem.alleged_entities || 'Unknown Entity')}
                  location={caseItem.location_id || 'Unknown Location'}
                  date={new Date(caseItem.created_at).toLocaleDateString()}
                  status={caseItem.status === 'under_investigation' ? 'under-investigation' : caseItem.status === 'closed' ? 'resolved' : 'ongoing'}
                  severity={caseItem.allegation_type === 'corruption' || caseItem.allegation_type === 'breach_of_trust' ? 'critical' : 'high'}
                  description={caseItem.key_allegations}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {error ? "Unable to load cases at this time" : "No cases found matching your criteria"}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setSearchQuery("");
                  fetchCases();
                }}
              >
                {error ? "Try Again" : "Clear All Filters"}
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cases;
