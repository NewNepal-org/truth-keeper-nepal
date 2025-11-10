import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { CaseCard } from "@/components/CaseCard";
import { FileText, Users, Eye, TrendingUp, Shield, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredCases = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-navy-dark to-slate-800 py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground mb-6">
                <Shield className="mr-2 h-4 w-4" />
                Transparency • Accountability • Justice
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
                Public Accountability Platform Nepal
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Documenting and tracking corruption cases to hold public entities accountable. 
                Empowering Nepali citizens with transparency and verified information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link to="/cases">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Cases
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Cases Documented"
                value="127"
                icon={FileText}
                description="Verified corruption cases"
              />
              <StatCard
                title="Entities Tracked"
                value="89"
                icon={Users}
                description="Public organizations monitored"
              />
              <StatCard
                title="Cases Under Investigation"
                value="43"
                icon={Eye}
                description="Active investigations"
              />
              <StatCard
                title="Cases Resolved"
                value="31"
                icon={TrendingUp}
                description="Successfully concluded"
                trend="↑ 12% this quarter"
              />
            </div>
          </div>
        </section>

        {/* Featured Cases Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Featured Cases</h2>
              <p className="text-muted-foreground">Recent high-impact corruption cases under public scrutiny</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredCases.map((caseItem) => (
                <CaseCard key={caseItem.id} {...caseItem} />
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link to="/cases">View All Cases →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The Public Accountability Platform (PAP) is a civic tech initiative by Let's Build Nepal (LBN) 
                and NewNepal.org dedicated to promoting transparency and accountability in Nepal. We document, 
                verify, and publish corruption cases involving public entities to empower citizens with information 
                and drive systemic change.
              </p>
              <Button size="lg" asChild>
                <Link to="/about">About the Platform</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
