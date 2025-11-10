import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, Upload } from "lucide-react";

export default function ReportAllegation() {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted",
      description: "Your allegation has been submitted for moderation review. Thank you for contributing to public accountability.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Report an Allegation</CardTitle>
              <CardDescription className="text-base">
                Help maintain accountability by reporting allegations of misconduct. All submissions are reviewed by our moderation team before publication.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Entity Type */}
                <div className="space-y-2">
                  <Label htmlFor="entityType">Entity Type</Label>
                  <Select required>
                    <SelectTrigger id="entityType">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="organization">Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Entity Name */}
                <div className="space-y-2">
                  <Label htmlFor="entityName">Entity Name</Label>
                  <Input 
                    id="entityName" 
                    placeholder="Name of the individual or organization"
                    required 
                  />
                </div>

                {/* Position/Role */}
                <div className="space-y-2">
                  <Label htmlFor="position">Position/Role</Label>
                  <Input 
                    id="position" 
                    placeholder="e.g., Minister, Director, CEO"
                    required 
                  />
                </div>

                {/* Allegation Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Allegation Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Brief, descriptive title of the allegation"
                    required 
                  />
                </div>

                {/* Allegation Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Allegation Type</Label>
                  <Select required>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select allegation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corruption">Corruption</SelectItem>
                      <SelectItem value="misappropriation">Misappropriation of Funds</SelectItem>
                      <SelectItem value="conflict-of-interest">Conflict of Interest</SelectItem>
                      <SelectItem value="abuse-of-power">Abuse of Power</SelectItem>
                      <SelectItem value="breach-of-trust">Breach of Public Trust</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of the allegation, including dates, locations, and circumstances"
                    rows={6}
                    required 
                  />
                </div>

                {/* Date of Incident */}
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Date of Incident (or approximate)</Label>
                  <Input 
                    id="incidentDate" 
                    type="date"
                    required 
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, District, or Province"
                    required 
                  />
                </div>

                {/* Sources */}
                <div className="space-y-2">
                  <Label htmlFor="sources">Sources & References</Label>
                  <Textarea 
                    id="sources" 
                    placeholder="Provide links to news articles, official documents, or other credible sources (one per line)"
                    rows={4}
                  />
                </div>

                {/* Evidence Upload */}
                <div className="space-y-2">
                  <Label htmlFor="evidence">Supporting Evidence (optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Documents, images, PDFs (Max 10MB)</p>
                    <Input 
                      id="evidence" 
                      type="file" 
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>

                {/* Contributor Information */}
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                    />
                    <Label htmlFor="anonymous" className="cursor-pointer">
                      Submit anonymously
                    </Label>
                  </div>

                  {!isAnonymous && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="contributorName">Your Name</Label>
                        <Input 
                          id="contributorName" 
                          placeholder="Your full name"
                          required={!isAnonymous}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contributorEmail">Your Email</Label>
                        <Input 
                          id="contributorEmail" 
                          type="email"
                          placeholder="your.email@example.com"
                          required={!isAnonymous}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">Important Notice</p>
                    <p>All submissions are reviewed by our moderation team for accuracy and credibility. False allegations may have legal consequences. Please ensure your report is factual and evidence-based.</p>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I confirm that the information provided is accurate to the best of my knowledge and I agree to the platform's terms of use
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Submit Report
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
