
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MapPin,
  IndianRupee,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Home() {
  const [searchCity, setSearchCity] = React.useState("");

  const handleSearch = () => {
    if (searchCity.trim()) {
      window.location.href = createPageUrl(`Rooms?city=${encodeURIComponent(searchCity)}`);
    } else {
      window.location.href = createPageUrl("Rooms");
    }
  };

  const features = [
    {
      icon: IndianRupee,
      title: "Budget Friendly",
      description: "Monthly rentals starting from ₹5000. Perfect for middle-class students",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: "Room Sharing",
      description: "Split costs with other students and save even more",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Clock,
      title: "Flexible Stays",
      description: "Monthly rentals or hourly bookings for exam days",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: MapPin,
      title: "Near Exam Centers",
      description: "Find rooms close to your exam venue or college",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Shield,
      title: "Verified Students",
      description: "Safe community with student ID verification",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: CheckCircle,
      title: "Instant Booking",
      description: "Quick confirmations, no hassle, no hidden charges",
      color: "bg-teal-100 text-teal-600"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Search Rooms",
      description: "Enter your city and exam center to find nearby stays"
    },
    {
      number: "02",
      title: "Choose & Book",
      description: "Select a room that fits your budget and preferences"
    },
    {
      number: "03",
      title: "Stay Comfortably",
      description: "Check in and focus on your exams stress-free"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-purple-50 to-blue-100 opacity-60"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">For Students, By Students</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Affordable Stays
              </span>
              <br />
              <span className="text-gray-800">For Student Travelers</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Find comfortable, budget-friendly rooms near exam centers and colleges. 
              Stay for a day, share costs, and focus on what matters most.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-2xl mx-auto border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Enter city or exam center..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 h-14 text-lg border-gray-200 focus:border-orange-400"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-14 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200 text-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Rooms
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No booking fees
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Instant confirmation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Student verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Students Choose Roomzy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a comfortable, affordable stay during exams and college visits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Roomzy Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your perfect student accommodation in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-6xl font-bold text-orange-100 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-12 h-12 text-orange-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl("HowItWorks")}>
              <Button size="lg" variant="outline" className="gap-2 border-orange-300 hover:bg-orange-50">
                Learn More About Roomzy
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Students Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from students who found their perfect stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "JEE Aspirant",
                content: "Found a great room near my exam center for just ₹300/day. The host was friendly and the place was clean. Highly recommend!",
                rating: 5
              },
              {
                name: "Rahul Kumar",
                role: "NEET Student",
                content: "Shared a room with another student and saved money. Perfect for exam preparation without breaking the bank.",
                rating: 5
              },
              {
                name: "Ananya Patel",
                role: "College Admission",
                content: "Needed a place for 2 days during college interviews. Roomzy made it super easy and affordable. Great experience!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Room?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students who trust Roomzy for their accommodation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Rooms")}>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl">
                Browse Rooms
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("HowItWorks")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
