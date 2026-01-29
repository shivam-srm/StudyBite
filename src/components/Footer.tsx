const Footer = () => {
  return (
    <footer className="py-4 border-t border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Designed and Developed by{" "}
          <a
            href="https://techwithshivu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Shivam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
