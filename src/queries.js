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
        }
      }
    }
  }
`;
