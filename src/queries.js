import { gql } from "@apollo/client";

export const UserContactInfo = gql`
  query userContactInfo($id: Int!) {
    user(id: $id) {
      contactInfo {
        email
        phone
        city
        website
        avatarUrl
        about
        country {
          name
          id
        }
      }
    }
  }
`;

export const Countries = gql`
  query countries {
    counties {
      id
      name
    }
  }
`;
