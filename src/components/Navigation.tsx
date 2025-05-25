
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Navigation = ({ isLoggedIn, setIsLoggedIn }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAuthClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Questify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/lost-items" className="text-gray-700 hover:text-blue-600 transition-colors">
              Lost Items
            </Link>
            <Link to="/found-items" className="text-gray-700 hover:text-blue-600 transition-colors">
              Found Items
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => navigate('/post-item')}
                >
                  <Plus className="w-4 h-4" />
                  Post Item
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleAuthClick}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  Login
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/lost-items" className="text-gray-700 hover:text-blue-600 transition-colors">
                Lost Items
              </Link>
              <Link to="/found-items" className="text-gray-700 hover:text-blue-600 transition-colors">
                Found Items
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <div className="pt-4 border-t">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mb-2 flex items-center gap-2"
                      onClick={() => navigate('/post-item')}
                    >
                      <Plus className="w-4 h-4" />
                      Post Item
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mb-2"
                      onClick={handleAuthClick}
                    >
                      Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full" onClick={handleSignOut}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full mb-2" onClick={() => navigate('/auth')}>
                      Login
                    </Button>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
