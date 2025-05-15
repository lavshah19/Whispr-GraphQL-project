import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_MESSAGES, GET_MESSAGES_BY_RECIPIENT } from "../graphql/queries";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Music, User, Calendar, Heart } from "lucide-react";

const AllMessage = () => {
  const { data: allData, loading: loadingAll, refetch: refetchAll } = useQuery(GET_ALL_MESSAGES, {
    fetchPolicy: 'network-only' // This ensures we always get fresh data
  });
  const [recipientName, setRecipientName] = useState("");
  const [getMessages, { data: searchData, loading: searchLoading, refetch: refetchSearch }] = useLazyQuery(GET_MESSAGES_BY_RECIPIENT, {
    fetchPolicy: 'network-only'
  });
  const [searchTriggered, setSearchTriggered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Refetch data when component mounts or when navigating to this page
  useEffect(() => {
    refetchAll();
    if (searchTriggered) {
      refetchSearch();
    }
  }, [location.pathname]);

  const handleSearch = () => {
    if (recipientName.trim()) {
      getMessages({ variables: { recipientName } });
      setSearchTriggered(true);
    } else {
      setSearchTriggered(false);
    }
  };

  const messages = searchTriggered ? searchData?.getMessages : allData?.getAllMessages;

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-light">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl text-gray-700 font-extralight">Secret Notes</h1>
          <p className="text-gray-500 text-sm">Discover messages sent with love</p>
        </div>

        {/* Search Section */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Find messages by recipient name..."
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full pl-12 pr-24 py-4 rounded-full border border-teal-100 focus:border-teal-300 focus:ring-2 focus:ring-teal-50 transition-all outline-none text-gray-600 font-light"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-300 w-5 h-5" />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors text-sm font-light"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {(loadingAll || searchLoading) && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse">
              <Heart className="w-12 h-12 text-teal-200" />
            </div>
          </div>
        )}

        {/* No Results State */}
        {messages?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-light">No messages found</p>
          </div>
        )}

        {/* Messages Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              onClick={() => navigate(`/message/${msg.id}`)}
              className="group relative bg-gradient-to-br from-white via-teal-50/40 to-teal-50/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-teal-100 hover:border-teal-200 backdrop-blur-sm"
            >
              {/* Recipient Name */}
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-4 h-4 text-teal-400" />
                <span className="text-teal-700 font-light">To {msg.recipientName}</span>
              </div>

              {/* Message Preview */}
              <div className="mb-6">
                <p className="text-gray-600 text-lg leading-relaxed font-light line-clamp-3 group-hover:text-gray-700 transition-colors">
                  {msg.content}
                </p>
              </div>

              {/* Footer Section */}
              <div className="flex items-end justify-between">
                {msg.musicUrl ? (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-teal-100 shadow-sm">
                      <img
                        src={msg.thumbnailUrl || "https://media.istockphoto.com/id/1431567498/vector/vector-illustration-of-musical-notes-on-white-background.jpg?s=612x612&w=0&k=20&c=E4Qx8E7OJm-itMPylpaZhNIU8mkJQt5XctWlKLLa1I8="}
                        alt="Music thumbnail"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent flex items-center justify-center">
                        <Music className="w-4 h-4 text-white drop-shadow-md" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-teal-700 text-sm font-light">
                        {msg.senderName || "Anonymous"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatDate(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                )}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-teal-200/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300 shadow-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMessage;
