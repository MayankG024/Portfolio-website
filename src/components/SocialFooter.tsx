import { Github, Mail, Twitter, Linkedin } from 'lucide-react';

export function SocialFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-foreground z-50">
      <div className="max-w-6xl mx-auto px-6 py-2">
        <div className="flex items-center justify-center space-x-8">
          <a 
            href="mailto:mayankynr24@gmail.com" 
            className="pixel-button p-2 hover:bg-muted transition-colors group"
            title="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a 
            href="https://github.com/mayankG024" 
            className="pixel-button p-2 hover:bg-muted transition-colors group"
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href="https://twitter.com/mayankG024" 
            className="pixel-button p-2 hover:bg-muted transition-colors group"
            title="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mayank-gupta-36b452218/" 
            className="pixel-button p-2 hover:bg-muted transition-colors group"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        <div className="text-center mt-1">
          <p className="text-[7px] text-muted-foreground">© MAYANK GUPTA 2025 </p>
        </div>
      </div>
    </footer>
  );
}