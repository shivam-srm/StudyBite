const Footer = () => {
  return (
    <footer className="py-4 sm:py-6 border-t border-border/50 bg-gradient-to-t from-muted/30 to-transparent">
      <div className="container mx-auto px-3 sm:px-4 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5 flex-wrap animate-fade-in">
          <span>Designed and Developed by</span>
          <a
            href="https://techwithshivam.vercel.app/"
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
