import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Shield, Target } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Heart,
      title: "Student First",
      description: "We understand the challenges students face when traveling for exams and college visits"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a trusted network of students helping students find safe accommodation"
    },
    {
      icon: Shield,
      title: "Safety",
      description: "Verified hosts and student IDs ensure a secure environment for everyone"
    },
    {
      icon: Target,
      title: "Affordability",
      description: "Making quality accommodation accessible to middle-class students across India"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About Roomzy
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Making student accommodation affordable, accessible, and stress-free across India
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Roomzy was born from a simple observation: thousands of students travel to different states every year for competitive exams, college admissions, and interviews, but finding affordable and safe accommodation is always a challenge.
                </p>
                <p>
                  We realized that while hotels are expensive and PGs require long-term commitments, there's a gap in the market for short-term, budget-friendly student accommodation. Students don't need luxury—they need clean, safe, and affordable places to stay for a day or two.
                </p>
                <p>
                  That's why we created Roomzy—a platform specifically designed for student travelers. We connect students with verified hosts offering rooms at prices that middle-class families can afford, with the flexibility to share costs and book for just the days they need.
                </p>
                <p className="font-semibold text-orange-600">
                  Because every student deserves a comfortable place to stay while chasing their dreams.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do at Roomzy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            To become India's most trusted platform for student accommodation, ensuring that no student has to worry about finding an affordable, safe place to stay during their academic journey.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Making a Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  10,000+
                </div>
                <p className="text-gray-600 text-lg">Students Helped</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <p className="text-gray-600 text-lg">Cities Covered</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  ₹200
                </div>
                <p className="text-gray-600 text-lg">Starting Price</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}