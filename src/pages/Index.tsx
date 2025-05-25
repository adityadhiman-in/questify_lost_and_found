
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Shield, ArrowRight, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description: "Find your lost items quickly with our advanced search and filtering system"
    },
    {
      icon: MapPin,
      title: "Location Based",
      description: "Connect with people in your area who might have found your belongings"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a helpful community dedicated to reuniting people with their lost items"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy is protected with secure messaging and verified users"
    }
  ];

  const recentSuccess = [
    {
      item: "iPhone 14 Pro",
      location: "Central Park, NYC",
      timeAgo: "2 hours ago",
      type: "found"
    },
    {
      item: "Blue Backpack",
      location: "University Campus",
      timeAgo: "5 hours ago", 
      type: "found"
    },
    {
      item: "Car Keys",
      location: "Downtown Mall",
      timeAgo: "1 day ago",
      type: "found"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Questify
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate platform to reunite people with their lost belongings. Post what you've lost, share what you've found, and help build a more connected community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <Link to="/lost-items" className="flex items-center gap-2">
                Browse Lost Items <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg">
              <Link to="/found-items" className="flex items-center gap-2">
                Browse Found Items <Heart className="w-5 h-5" />
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100</div>
              <div className="text-gray-600">Items Reunited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">500</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">97%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Questify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Success Stories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Recent Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentSuccess.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Reunited
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{story.item}</h3>
                  <p className="text-gray-600 flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </p>
                  <p className="text-sm text-gray-500">{story.timeAgo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Lost Items?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have successfully reunited with their belongings through Questify.
          </p>
          <a href="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Get Started Today
          </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
