
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in the power of people helping people. Our platform is built on trust, kindness, and the desire to help others."
    },
    {
      icon: Target,
      title: "Efficiency",
      description: "We make it quick and easy to post lost or found items, with smart matching algorithms to connect the right people."
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Everyone deserves help finding their lost belongings. Our platform is accessible and welcoming to all."
    },
    {
      icon: Award,
      title: "Reliability",
      description: "We maintain high standards for user verification and content moderation to ensure a safe, trustworthy experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Questify
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Connecting people with their lost belongings through the power of community
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Questify, we understand the frustration and anxiety that comes with losing something important. 
              Whether it's your keys, wallet, phone, or a cherished keepsake, we know how much these items mean to you. 
              Our mission is to harness the power of community to help reunite people with their lost belongings, 
              creating a more connected and caring world one found item at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <value.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Questify was born from a simple observation: people are fundamentally good and want to help each other. 
              When someone finds a lost item, their first instinct is usually to try to return it to its owner. 
              The challenge has always been connecting these good Samaritans with the people who have lost something.
            </p>
            <p className="mb-6">
              Traditional methods like posting on community boards or social media often fall short because they 
              lack the reach and organization needed to effectively match lost items with their owners. 
              We saw an opportunity to create a dedicated platform that would make this process simple, efficient, and effective.
            </p>
            <p className="mb-6">
              Since our launch, we've helped thousands of people reunite with their lost belongings. From wedding rings 
              and family heirlooms to everyday essentials like wallets and keys, every successful reunion reminds us 
              why we do what we do. We're not just a platform; we're a community of people who believe in helping others.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">100</div>
              <div className="text-lg text-gray-600">Items Successfully Reunited</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">500</div>
              <div className="text-lg text-gray-600">Active Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">97%</div>
              <div className="text-lg text-gray-600">User Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
