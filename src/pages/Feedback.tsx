import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

export default function Feedback() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We will review it and get back to you if needed.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle className="text-3xl">Platform Feedback</CardTitle>
              </div>
              <CardDescription className="text-base">
                Help us improve the Public Accountability Platform. Your feedback is valuable to us.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type */}
                <div className="space-y-2">
                  <Label htmlFor="feedbackType">Feedback Type</Label>
                  <Select required>
                    <SelectTrigger id="feedbackType">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="usability">Usability Issue</SelectItem>
                      <SelectItem value="content">Content Feedback</SelectItem>
                      <SelectItem value="general">General Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Brief summary of your feedback"
                    required 
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide detailed feedback. For bugs, include steps to reproduce the issue."
                    rows={8}
                    required 
                  />
                </div>

                {/* Page/Feature */}
                <div className="space-y-2">
                  <Label htmlFor="pageFeature">Related Page or Feature (optional)</Label>
                  <Input 
                    id="pageFeature" 
                    placeholder="e.g., Cases page, Search functionality"
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground text-sm">Contact Information (optional)</h3>
                  <p className="text-xs text-muted-foreground">Provide your contact details if you'd like us to follow up</p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
