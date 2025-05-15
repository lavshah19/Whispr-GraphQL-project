import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES = gql`
  query GetAllMessages {
    getAllMessages {
      id
      content
      musicUrl
      startTime
      endTime
      senderName
      recipientName
      createdAt
       thumbnailUrl
    }
  }
`;

export const GET_MESSAGES_BY_RECIPIENT = gql`
  query GetMessages($recipientName: String!) {
    getMessages(recipientName: $recipientName) {
      id
      content
      musicUrl
      startTime
      endTime
      senderName
      recipientName
      createdAt
    }
  }
`;

// Add to your existing queries file
export const GET_SINGLE_MESSAGE = gql`
  query GetSingleMessage($id: ID!) {
    getSingleMessage(id: $id) {
      id
      content
      musicUrl
      startTime
      endTime
      senderName
      recipientName
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $content: String!
    $musicUrl: String
    $startTime: Int
    $endTime: Int
    $senderName: String
    $recipientName: String!
  ) {
    createMessage(
      content: $content
      musicUrl: $musicUrl
      startTime: $startTime
      endTime: $endTime
      senderName: $senderName
      recipientName: $recipientName
    ) {
      id
      content
      thumbnailUrl
    }
  }
`;


/* 

In short:

Backend resolver name = GraphQL query field name = must match.

Frontend operation name = arbitrary label, can be anything.

Frontend hook function (getMessages) = your choice, can be any valid variable name.


*/
