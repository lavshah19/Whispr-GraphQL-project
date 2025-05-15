const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    musicUrl: String
    startTime: Int
    endTime: Int
    senderName: String
    recipientName: String!
    createdAt: String
    thumbnailUrl: String
  }

  type Query {
    getAllMessages: [Message]
    getMessages(recipientName: String!): [Message]
    getSingleMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(
      content: String!
      musicUrl: String
      startTime: Int
      endTime: Int
      senderName: String
      recipientName: String!
     
    ): Message
  }
`;

module.exports = typeDefs;
