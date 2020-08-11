import { gql } from "@apollo/client";

export const UpdateContactInfo = gql`
  mutation UpdateContactInfo(
    $id: Int!
    $email: String
    $phone: String
    $city: String
    $website: String
    $avatarUrl: String
    $about: String
    $countryId: Int
  ) {
    updateContactInfo(
      id: $id
      email: $email
      phone: $phone
      city: $city
      website: $website
      avatarUrl: $avatarUrl
      about: $about
      countryId: $countryId
    ) {
      id
    }
  }
`;

export const UpdateUserContactInfo = gql`
  mutation UpdateUserContactInfo($contactInfoId: Int!, $id: Int!) {
    updateUser(id: $id, contactInfoId: $contactInfoId) {
      id
    }
  }
`;

export const CreateContactInfo = gql`
  mutation createContactInfo(
    $email: String!
    $phone: String!
    $city: String!
    $website: String!
    $avatarUrl: String!
    $about: String!
    $countryId: Int!
  ) {
    createContactInfo(
      email: $email
      phone: $phone
      city: $city
      website: $website
      avatarUrl: $avatarUrl
      about: $about
      countryId: $countryId
    ) {
      id
    }
  }
`;
