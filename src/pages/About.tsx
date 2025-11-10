import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Eye, Target, CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-navy-dark to-slate-800 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                About the Public Accountability Platform
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                A civic tech initiative committed to transparency, accountability, and justice in Nepal.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The Public Accountability Platform (PAP) is dedicated to promoting transparency and accountability 
                in Nepal by documenting, verifying, and publishing corruption cases involving public entities. 
                We empower Nepali citizens with verified information to drive systemic change and hold public 
                officials accountable for their actions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through rigorous investigation, documentation, and public disclosure, we aim to create a more 
                transparent governance system where corruption is exposed, justice is served, and public trust 
                is restored.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Integrity</h3>
                        <p className="text-sm text-muted-foreground">
                          We maintain the highest standards of honesty and ethical conduct in all our investigations 
                          and documentation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Transparency</h3>
                        <p className="text-sm text-muted-foreground">
                          All our processes, sources, and methodologies are open and accessible to the public 
                          for scrutiny and verification.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Accuracy</h3>
                        <p className="text-sm text-muted-foreground">
                          Every case is thoroughly verified through multiple sources before publication to ensure 
                          factual accuracy and reliability.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Public Service</h3>
                        <p className="text-sm text-muted-foreground">
                          We serve the public interest by providing free access to information that affects 
                          every Nepali citizen.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Partners</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Let's Build Nepal (LBN)</h3>
                    <p className="text-muted-foreground">
                      A civic tech organization focused on building technology solutions for social good in Nepal. 
                      LBN brings technical expertise and development resources to the platform.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">NewNepal.org</h3>
                    <p className="text-muted-foreground">
                      A civil society initiative working towards a more transparent and accountable Nepal. 
                      NewNepal.org provides investigative support and policy advocacy expertise.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-10">What We Do</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Document Corruption Cases:</span> We systematically 
                    collect and organize information about corruption cases involving public entities.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Verify Information:</span> All cases undergo 
                    rigorous verification through multiple independent sources before publication.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Track Progress:</span> We monitor the status 
                    of each case and update the public on investigations and outcomes.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Empower Citizens:</span> We provide accessible, 
                    searchable information to help citizens make informed decisions and demand accountability.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Advocate for Change:</span> We use data and 
                    documented cases to advocate for policy reforms and stronger anti-corruption measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
