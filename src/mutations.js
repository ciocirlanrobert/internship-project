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

export const UpdateUserEducation = gql`
  mutation updateUserEducation(
    $id: Int!
    $institution: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updateUserEducation(
      id: $id
      institution: $institution
      description: $description
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      institution
      description
      startDate
      endDate
    }
  }
`;

export const AddUserEducation = gql`
  mutation createEducation(
    $institution: String
    $description: String
    $userId: Int!
    $startDate: String
    $endDate: String
  ) {
    createUserEducation(
      institution: $institution
      description: $description
      userId: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      institution
      description
      id
      startDate
      endDate
    }
  }
`;

export const DeleteUserEducation = gql`
  mutation deleteEducation($id: [Int!]!) {
    deleteUserEducation(id: $id)
  }
`;

export const DeleteUserWorkExperience = gql`
  mutation deleteUserWE($id: [Int!]!) {
    deleteUserWorkExperience(id: $id)
  }
`;

export const CreateUserWorkExperience = gql`
  mutation createUserWE(
    $userId: Int!
    $institution: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createUserWorkExperience(
      userId: $userId
      institution: $institution
      description: $description
      startDate: $startDate
      endDate: $endDate
    ) {
      institution
      description
      startDate
      endDate
      id
    }
  }
`;

export const UpdateUserWorkExperience = gql`
  mutation updateUserWE(
    $id: Int!
    $institution: String
    $description: String
    $userId: Int
    $startDate: String
    $endDate: String
  ) {
    updateUserWorkExperience(
      id: $id
      institution: $institution
      description: $description
      userId: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      institution
      description
      startDate
      endDate
    }
  }
`;

export const DeleteUserSkill = gql`
  mutation deleteUserSkill($id: [Int!]!) {
    deleteUserSkill(id: $id)
  }
`;

export const CreateUserSkill = gql`
  mutation createUserSkill($id: Int!, $skillId: Int!, $rating: Int!) {
    createUserSkill(userId: $id, skillId: $skillId, rating: $rating) {
      skill {
        id
      }
      rating
    }
  }
`;
