import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Search, FileText, Info } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">PAP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Public Accountability</span>
            <span className="text-xs text-muted-foreground">Platform Nepal</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/cases" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Cases
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
            <Link to="/cases">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search cases</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link to="/report">Report Case</Link>
          </Button>
          <Button asChild>
            <Link to="/cases">View Cases</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
