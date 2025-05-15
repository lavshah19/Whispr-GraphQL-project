import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { MessageSquare, Music, Clock, User, UserCheck, Loader2, Heart } from "lucide-react";
import { CREATE_MESSAGE } from "../graphql/queries";
import { useNavigate } from 'react-router-dom';
import getYouTubeID from 'get-youtube-id';



const Submit = () => {
  const [formState, setFormState] = useState({
    content: "",
    musicUrl: "",
    startTime: "",
    endTime: "",
    senderName: "",
    recipientName: "",
  });
  const navigate=useNavigate();

  const [createMessage, { loading, error, data }] = useMutation(CREATE_MESSAGE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const convertToEmbedUrl = (url, start, end) => {
    if (!url) return null;
    const videoId = getYouTubeID(url);
  
    if (!videoId) return null;
  
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = [];
  
    if (start > 0) params.push(`start=${start}`);
    if (end > 0 && end > start) params.push(`end=${end}`);
  
    if (params.length > 0) {
      embedUrl += `?${params.join("&")}`;
    }
  
    return embedUrl;
  };
  const timeStringToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return (minutes * 60) + seconds;
    }
    return Number(timeStr); // fallback if already in seconds or invalid
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const start = timeStringToSeconds(formState.startTime);
      const end = timeStringToSeconds(formState.endTime);
      const embedUrl = convertToEmbedUrl(formState.musicUrl, start, end);
  
      await createMessage({
        variables: {
          content: formState.content,
          musicUrl: embedUrl,
          startTime: start,
          endTime: end,
          senderName: formState.senderName || null,
          recipientName: formState.recipientName,
        },
      });
  
      setFormState({
        content: "",
        musicUrl: "",
        startTime: "",
        endTime: "",
        senderName: "",
        recipientName: "",
      });

      // Navigate immediately after successful submission
      navigate("/allmessage", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen bg-white py-12 px-4 font-light">
      <div className="max-w-2xl mx-auto">
        {/* Form Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl font-dancing text-gray-800">
            Share Your Heart
          </h1>
          <p className="text-gray-500 text-sm">
            Create a special message with a meaningful melody
          </p>
        </div>

        {/* Main Form Card */}
        <div className="relative bg-white rounded-2xl shadow-sm border border-teal-50">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50/20 via-white to-white rounded-2xl"></div>
          
          {/* Form Content */}
          <div className="relative p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Message Content */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Heart className="w-5 h-5 mr-2 text-teal-500" />
                  Your Message*
                </label>
                <div className="bg-gradient-to-br from-white to-teal-50/30 rounded-xl p-1">
                  <textarea
                    name="content"
                    value={formState.content}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300 min-h-[160px] transition duration-300 bg-white/80 backdrop-blur-sm text-gray-700 font-light placeholder-gray-400"
                    placeholder="Write your heartfelt message here..."
                  />
                </div>
              </div>

              {/* Music Section */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Music className="w-5 h-5 mr-2 text-teal-500" />
                    Choose a Song
                  </label>
                  <input
                    type="text"
                    name="musicUrl"
                    value={formState.musicUrl}
                    onChange={handleChange}
                    placeholder="Paste YouTube link here..."
                    className="w-full px-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition duration-300 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-teal-500" />
                      Start Time
                    </label>
                    <input
                      type="text"
                      name="startTime"
                      value={formState.startTime}
                      onChange={handleChange}
                      placeholder="mm:ss"
                      className="w-full px-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition duration-300 font-light"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-teal-500" />
                      End Time
                    </label>
                    <input
                      type="text"
                      name="endTime"
                      value={formState.endTime}
                      onChange={handleChange}
                      placeholder="mm:ss"
                      className="w-full px-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition duration-300 font-light"
                    />
                  </div>
                </div>
              </div>

              {/* Names Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-5 h-5 mr-2 text-teal-500" />
                    From
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formState.senderName}
                    onChange={handleChange}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition duration-300 font-light"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <UserCheck className="w-5 h-5 mr-2 text-teal-500" />
                    To*
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formState.recipientName}
                    onChange={handleChange}
                    required
                    placeholder="Recipient's name"
                    className="w-full px-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition duration-300 font-light"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-lg hover:from-teal-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending with love...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Send Your Message
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Feedback Messages */}
            {error && (
              <div className="mt-6 p-4 bg-red-50/50 border border-red-100 rounded-lg">
                <p className="text-red-600 text-sm font-light">Error: {error.message}</p>
              </div>
            )}
            
            {data && (
              <div className="mt-6 p-4 bg-teal-50/50 border border-teal-100 rounded-lg">
                <p className="text-teal-600 text-sm font-light flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Your message has been sent with love!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm font-light">
            Share your feelings through music and words
          </p>
        </div>
      </div>
    </div>
  );
};

export default Submit;
