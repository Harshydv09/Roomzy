import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Search,
  CheckCircle,
  Calendar,
  Home,
  Shield,
  Users,
  IndianRupee,
  Clock,
  MapPin,
  Star
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Search for Rooms",
      description: "Enter your city or exam center location to find nearby accommodations",
      details: [
        "Filter by price, room type, and amenities",
        "See distance from exam centers",
        "Check availability instantly"
      ]
    },
    {
      number: 2,
      icon: Home,
      title: "Choose Your Perfect Room",
      description: "Browse verified listings with detailed information and photos",
      details: [
        "View real photos and honest reviews",
        "Check host ratings and profiles",
        "Compare sharing options to save money"
      ]
    },
    {
      number: 3,
      icon: Calendar,
      title: "Book Instantly",
      description: "Select your dates and confirm your booking in seconds",
      details: [
        "Flexible booking: hourly or daily",
        "Instant confirmation via email",
        "No hidden charges or booking fees"
      ]
    },
    {
      number: 4,
      icon: CheckCircle,
      title: "Check-in & Enjoy",
      description: "Arrive at your room and focus on what matters—your exams!",
      details: [
        "Contact host directly for directions",
        "Check-in at your convenience",
        "Safe, clean, and comfortable stay"
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Student Verification",
      description: "All users verify their student IDs for a trusted community"
    },
    {
      icon: Users,
      title: "Cost Sharing",
      description: "Split room costs with other students to save money"
    },
    {
      icon: Clock,
      title: "Flexible Duration",
      description: "Book for a few hours, a day, or multiple days"
    },
    {
      icon: MapPin,
      title: "Proximity Search",
      description: "Find rooms near your exam center or college"
    },
    {
      icon: IndianRupee,
      title: "Budget Calculator",
      description: "See exact costs and split amounts before booking"
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Read genuine reviews from fellow students"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How Roomzy Works
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Finding affordable student accommodation made simple in 4 easy steps
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <Card key={index} className="border-none shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`md:w-1/3 p-8 flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-orange-100 to-orange-50' :
                      index === 1 ? 'bg-gradient-to-br from-purple-100 to-purple-50' :
                      index === 2 ? 'bg-gradient-to-br from-blue-100 to-blue-50' :
                      'bg-gradient-to-br from-green-100 to-green-50'
                    }`}>
                      <div className="text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                          index === 0 ? 'bg-orange-500' :
                          index === 1 ? 'bg-purple-500' :
                          index === 2 ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}>
                          <step.icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-6xl font-bold text-gray-200">
                          0{step.number}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Student-Friendly Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything designed with students in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Is Roomzy only for exam students?",
                a: "No! While we focus on students traveling for exams, anyone visiting for college admissions, interviews, or short educational trips can use Roomzy."
              },
              {
                q: "How do I verify my student status?",
                a: "After signing up, you can upload your college ID or student ID proof in your dashboard. Verification helps build trust in our community."
              },
              {
                q: "Can I cancel my booking?",
                a: "Cancellation policies vary by host. Check the room details before booking. We recommend contacting the host directly for any changes."
              },
              {
                q: "Is room sharing safe?",
                a: "Yes! All users are student-verified, and we encourage reading reviews before booking. You can also contact your potential roommates beforehand."
              },
              {
                q: "What payment methods do you accept?",
                a: "Currently, payments are handled directly between students and hosts. We're working on integrated payments for added security."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Room?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who trust Roomzy for their accommodation needs
          </p>
          <Link to={createPageUrl("Rooms")}>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl text-lg px-8">
              Start Searching
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}