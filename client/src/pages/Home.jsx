import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PenTool, MessageSquare, Music } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-teal-100 shadow-[0_0_20px_rgba(0,0,0,0.02)] hover:shadow-[0_0_25px_rgba(0,0,0,0.04)] hover:border-teal-200 transition-all duration-500 group backdrop-blur-sm">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-gradient-to-br from-teal-50/80 to-white rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-sm">
        <Icon className="w-7 h-7 text-teal-600" />
      </div>
      <h3 className="text-xl text-gray-800 font-medium group-hover:text-teal-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

const Home = () => {
  const features = [
    {
      icon: PenTool,
      title: "Write Your Heart",
      description: "Craft a personal message filled with your emotions and attach a meaningful song that expresses your feelings."
    },
    {
      icon: Music,
      title: "Share the Melody",
      description: "Let music speak when words aren't enough. Share songs that tell your story and touch hearts."
    },
    {
      icon: MessageSquare,
      title: "Connect Through Stories",
      description: "Discover heartfelt messages from others, each accompanied by a carefully chosen melody."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-dancing text-gray-800 leading-tight">
              Where Words Dance <br />
              <span className="text-teal-600">with Melodies</span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Share your feelings through the perfect combination of heartfelt messages and meaningful songs
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/submit"
              className="group relative px-8 py-3 bg-teal-500 text-white rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Share Your Story</span>
              </span>
            </Link>
            <Link
              to="/allmessage"
              className="group px-8 py-3 border-2 border-teal-200 text-teal-600 rounded-full hover:bg-teal-50 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Explore Stories</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center mt-16">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
        </div>

        {/* Features Section */}
        <div className="relative mt-20 py-16">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/20 to-white"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-50/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-teal-50/40 rounded-full blur-3xl"></div>
          </div>

          {/* Section Title */}
          <div className="relative text-center mb-16">
            <h2 className="text-3xl font-dancing text-gray-800 mb-3">Share Your Story</h2>
            <p className="text-gray-600 font-light">Three simple steps to connect through music</p>
          </div>

          {/* Features Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-20">
          <p className="text-gray-500 text-sm font-light">
            Every song tells a story. What's yours?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;