import React from "react";
import Img1 from "../../assets/jishnu.jpeg";
import Img2 from "../../assets/sathuik.jpeg";
import Img3 from "../../assets/madvesh.png";
import { Link } from "react-router-dom";
import logo from "../../assets/l.png";
import sk from "../../assets/senthilkumar.jpg";
import about2 from "../../assets/about2.jpg";

const AboutSection = () => {
  const features = [
    {
      icon: "💊",
      title: "Personalized Health Journey",
      description:
        "Get tailored vitamin and supplement recommendations based on your unique health profile and goals.",
    },
    {
      icon: "🔬",
      title: "Science-Backed Guidance",
      description:
        "Our recommendations are based on the latest scientific research and clinical studies in nutrition.",
    },
    {
      icon: "👥",
      title: "Expert Support",
      description:
        "Access to a network of qualified nutritionists and health experts for professional guidance.",
    },
  ];

  const stats = [
    {
      number: "1000+",
      label: "Vitamins Analyzed",
    },
    {
      number: "50+",
      label: "Health Categories",
    },
    {
      number: "100%",
      label: "Science-Backed",
    },
    {
      number: "24/7",
      label: "Digital Assistance",
    },
  ];

  const teamMembers = [
    {
      name: "Jishnu M",
      role: "MTECH CSE",
      image: Img1,
    },
    {
      name: "Sai Sathuik",
      role: "MTECH CSE",
      image: Img2,
    },
    {
      name: "Madvesh Patel",
      role: "MTECH CSE",
      image: Img3,
    },
    { name: "T Senthil Kumar", role: "Project Coordinator", image: sk },
  ];

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${about2})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold mb-4">About VitaGuide</h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Discover your path to a healthier life with personalized vitamin
            recommendations.
          </p>
          {/* Link to the next section by using an anchor to scroll down */}
          {/* <a
            href="#mission"
            className="bg-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition"
          >
            Get Started
          </a> */}
        </div>
      </div>

      <div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        id="mission"
      >
        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At VitaGuide, we believe that everyone deserves access to
                personalized nutritional guidance. Our mission is to democratize
                health optimization by providing science-backed, accessible
                supplement recommendations tailored to individual needs.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of others who have transformed their health with
              VitaGuide's personalized recommendations.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 VitaGuide. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutSection;
