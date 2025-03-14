import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/l.png";
import bg from "../../assets/bg.jpg";
import vitamin from "../../assets/file.png";
import pd from "../../assets/pd.jpg";
import vd from "../../assets/vd.jpg";
import qz from "../../assets/qz.jpg";
import fb from "../../assets/fb.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";
import linkedin from "../../assets/linkedin.svg";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Navbar */}
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
              to="/foodsources"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Food Sources
            </Link>
            <Link
              to="/symptomslist"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Vitamin Deficiencies
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="hero-section flex items-center justify-center text-center h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
        }}
      >
        <div className="max-w-3xl px-8">
          <h1 className="text-5xl font-bold mb-4">
            Empowering Parents with Nutritional Insights
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            VitaGuide helps you personalize your child’s nutrition and health
            needs with expert-driven insights.
          </p>
          <Link
            to="#feature"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 mt-16" id="feature">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Explore VitaGuide Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Personal Details Card */}
          <div className="flex flex-col items-center bg-gradient-to-r from-green-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <img
              src={pd}
              alt="Food Sources"
              className="w-32 h-32 mb-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-blue-900 mb-3">
              Food Sources
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Discover essential vitamin-rich foods to support your child’s
              health and well-being.
            </p>
            <Link
              to="/foodsources"
              className="mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Vitamin Deficiencies Card */}
          <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <img
              src={vd}
              alt="Vitamin Deficiencies"
              className="w-32 h-32 mb-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-blue-900 mb-3">
              Vitamin Deficiencies
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Discover possible vitamin deficiencies and get dietary advice to
              address them.
            </p>
            <Link
              to="/toddlerform"
              className="mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Explore
            </Link>
          </div>

          {/* Quizzes Card */}
          <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <img
              src={qz}
              alt="Quizzes"
              className="w-32 h-32 mb-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-blue-900 mb-3">
              Engaging Quizzes
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Test your knowledge on health and nutrition through fun,
              interactive quizzes.
            </p>
            <Link
              to="/quiz"
              className="mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Take a Quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-20 mb-5  text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          We Value Your Feedback!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Share your thoughts and help us improve VitaGuide’s tools for a
          healthier journey. We’re listening!
        </p>
        <Link
          to="/feedback"
          className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Give Feedback
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4 md:flex md:justify-between md:items-center text-center md:text-left">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img src={logo} alt="VitaGuide Logo" className="h-12 mr-3" />
              <span className="text-2xl font-semibold">VitaGuide</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 justify-center md:justify-start mb-6 md:mb-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src={fb}
                alt="Facebook"
                className="h-8 transition-transform transform hover:scale-110"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img
                src={twitter}
                alt="Twitter"
                className="h-8 transition-transform transform hover:scale-110"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src={instagram}
                alt="Instagram"
                className="h-8 transition-transform transform hover:scale-110"
              />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="h-8 transition-transform transform hover:scale-110"
              />
            </a>
          </div>

          {/* Links and Copyright */}
          <div className="text-sm md:w-1/3 text-gray-400 mt-6 md:mt-0">
            <p className="mb-2">&copy; 2024 VitaGuide. All Rights Reserved.</p>
            <p>
              <Link to="/privacy" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>{" "}
              |
              <Link
                to="/terms"
                className="hover:text-white hover:underline ml-1"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
