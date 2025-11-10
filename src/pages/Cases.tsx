import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseCard } from "@/components/CaseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const allCases = [
    {
      id: "1",
      title: "Alleged Misappropriation of Public Funds in Highway Construction",
      entity: "Department of Roads, Ministry of Physical Infrastructure",
      location: "Kathmandu Valley",
      date: "March 15, 2024",
      status: "under-investigation" as const,
      severity: "high" as const,
      description: "Investigation into alleged irregularities in the bidding process and fund allocation for the Ring Road expansion project.",
    },
    {
      id: "2",
      title: "Corruption in Medical Equipment Procurement",
      entity: "Ministry of Health and Population",
      location: "Province 1",
      date: "February 28, 2024",
      status: "ongoing" as const,
      severity: "critical" as const,
      description: "Reports of overpriced medical equipment purchases during the pandemic response, with potential kickbacks to officials.",
    },
    {
      id: "3",
      title: "Land Grab Case - Public Park Converted to Private Property",
      entity: "Metropolitan City Development Committee",
      location: "Lalitpur",
      date: "January 10, 2024",
      status: "resolved" as const,
      severity: "medium" as const,
      description: "Public park land illegally transferred to private developers. Case resolved with land returned to public ownership.",
    },
    {
      id: "4",
      title: "Embezzlement in Education Budget Allocation",
      entity: "Ministry of Education, Science and Technology",
      location: "Province 2",
      date: "March 5, 2024",
      status: "ongoing" as const,
      severity: "high" as const,
      description: "Funds allocated for school infrastructure diverted to personal accounts of education officials.",
    },
    {
      id: "5",
      title: "Irregularities in Agricultural Subsidy Distribution",
      entity: "Ministry of Agriculture and Livestock Development",
      location: "Karnali Province",
      date: "February 15, 2024",
      status: "under-investigation" as const,
      severity: "medium" as const,
      description: "Complaints of favoritism and ghost beneficiaries in the distribution of agricultural subsidies.",
    },
    {
      id: "6",
      title: "Kickbacks in Public Building Construction Project",
      entity: "Department of Urban Development",
      location: "Pokhara",
      date: "January 20, 2024",
      status: "ongoing" as const,
      severity: "critical" as const,
      description: "Evidence of contractors paying kickbacks to secure government building construction contracts with inflated budgets.",
    },
  ];

  const filteredCases = allCases.filter((caseItem) => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseItem.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseItem.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || caseItem.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
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
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity Levels</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setSeverityFilter("all");
                  setSearchQuery("");
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
              Showing {filteredCases.length} of {allCases.length} cases
            </p>
          </div>

          {/* Cases Grid */}
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard key={caseItem.id} {...caseItem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No cases found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setSeverityFilter("all");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
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
