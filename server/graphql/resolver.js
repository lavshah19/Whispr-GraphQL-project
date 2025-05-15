const Message = require("../model/messageSchema");
const getYouTubeVideoId = require('get-youtube-id');

const resolvers = {
  Query: {
    getMessages: async (_, { recipientName }) => {
      return await Message.find({ recipientName }).sort({ createdAt: -1 });
    },
    getAllMessages: async () => {
      return await Message.find().sort({ createdAt: -1 });
    },
    getSingleMessage: async (_, { id }) => {
      return await Message.findById(id);
    },
  },

  Mutation: {
    createMessage: async (_, args) => {
      

      // const getYouTubeVideoId = (url) => {
      //   if (!url) return null;
      //   const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&/"'>]+)/;
      //   const match = url.match(regExp);
      //   return match ? match[1] : null;
      // };
      
      const getYoutubeThumbnail = (url) => {
        const videoId = getYouTubeVideoId(url);
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
      };
      let thumbnailUrl=getYoutubeThumbnail(args.musicUrl);
  
      // if (args.musicUrl) {
      //   const videoId = getYouTubeVideoId(args.musicUrl);
      //   if (videoId) {
      //     thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      //   }
      // }
  
      const message = new Message({
        ...args,
        thumbnailUrl, // add thumbnailUrl field
      });
  
      return await message.save();
    },
  },
};

module.exports = resolvers;
