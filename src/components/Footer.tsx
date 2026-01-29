import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border/50 bg-gradient-to-t from-muted/30 to-transparent">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5 animate-fade-in">
          Designed and Developed with{" "}
          <Heart className="w-4 h-4 text-red-500 animate-pulse-soft" fill="currentColor" />
          by{" "}
          <a
            href="https://techwithshivu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold link-underline transition-colors hover:text-primary/80"
          >
            Shivam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
