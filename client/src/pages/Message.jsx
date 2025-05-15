import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_MESSAGE } from '../graphql/queries';
import ReactPlayer from 'react-player/youtube';
import { Calendar, User, Music, Maximize2, Minimize2, Heart } from 'lucide-react';

const Message = () => {
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, loading, error } = useQuery(GET_SINGLE_MESSAGE, {
    variables: { id },
  });

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse">
        <Heart className="w-12 h-12 text-teal-600/50" />
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-4 text-rose-500 text-center">
        <p className="font-light">Oops! Something went wrong</p>
        <p className="text-sm mt-2 text-rose-400">{error.message}</p>
      </div>
    </div>
  );

  const message = data?.getSingleMessage;

  if (!message) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-4 text-gray-400 text-center">
        <p className="font-light">Message not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-light">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Greeting */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl text-gray-700 font-extralight">
            Hello, <span className="text-teal-600">{message.recipientName}</span>
          </h1>
          <p className="text-gray-500 text-sm">
            You've received a special message with a song
          </p>
        </div>

        {/* Music Player */}
        {message.musicUrl && (
          <div className={`${isExpanded ? 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4' : ''}`}>
            <div className={`${isExpanded ? 'w-full max-w-4xl' : 'w-full'}`}>
              <div className="bg-teal-900/90 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Music className="w-5 h-5 mr-2 text-teal-200" />
                    <h3 className="text-lg font-light text-white">
                      A Song For You
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-full text-teal-200 hover:bg-teal-800/50 transition-colors"
                  >
                    {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <ReactPlayer
                    url={message.musicUrl}
                    width="100%"
                    height={isExpanded ? "calc(100vh - 200px)" : "240px"}
                    controls={true}
                    playing={false}
                    config={{
                      youtube: {
                        playerVars: {
                          showinfo: 1,
                          origin: window.location.origin,
                          modestbranding: 1,
                          rel: 0,
                          iv_load_policy: 3
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed font-light">
              {message.content}
            </p>
            
            <div className="pt-6 border-t border-teal-100">
              <div className="text-right space-y-2">
                <p className="text-teal-600 font-medium">
                  With love,<br />
                  {message.senderName || "Anonymous"}
                </p>
                <p className="text-gray-400 text-xs italic">
                  Sent on {formatDate(message.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="text-center">
          <Heart className="w-4 h-4 text-teal-300 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Message;
