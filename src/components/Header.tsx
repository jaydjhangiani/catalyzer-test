import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/logo.png"
                alt="Innovation flow"
                className="w-40 h-auto mx-auto"
              />
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            {/* <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </a> */}
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Product Offering
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* <Button
              variant="ghost"
              size="sm"
            >
              Sign In
            </Button> */}
            <NavLink to="/chatbot">
              <Button
                variant="default"
                size="sm"
              >
                Get Started
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
