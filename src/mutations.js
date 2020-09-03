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
      id
      rating
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser(
    $id: Int!
    $username: String
    $firstName: String
    $lastName: String
    $password: String
  ) {
    updateUser(
      id: $id
      lastName: $lastName
      firstName: $firstName
      password: $password
      username: $username
    ) {
      id
      username
      firstName
      lastName
      password
    }
  }
`;

export const DeleteUser = gql`
  mutation deleteUser($id: [Int!]!) {
    deleteUser(id: $id)
  }
`;

export const AddUser = gql`
  mutation addUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $userRoleId: Int!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
      userRoleId: $userRoleId
    ) {
      id
      username
      firstName
      lastName
      password
      userRole {
        id
      }
    }
  }
`;

export const UpdateJobInfo = gql`
  mutation updateJobInfo(
    $id: Int!
    $name: String
    $description: String
    $isAvailable: Boolean
  ) {
    updateJob(
      id: $id
      name: $name
      description: $description
      isAvailable: $isAvailable
    ) {
      id
      name
      description
      isAvailable
    }
  }
`;

export const DeleteJob = gql`
  mutation deleteJob($id: Int!) {
    deleteJob(id: $id)
  }
`;

export const UpdateJobRequirement = gql`
  mutation updateJobRequirement($id: Int!, $name: String) {
    updateJobRequirement(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DeleteJobRequirement = gql`
  mutation deleteJobRequirement($id: Int!) {
    deleteJobRequirement(id: $id)
  }
`;

export const CreateJobRequirement = gql`
  mutation createJobRequirement($name: String!, $jobId: Int!) {
    createJobRequirement(jobId: $jobId, name: $name) {
      id
      name
    }
  }
`;

export const UpdateJobBenefit = gql`
  mutation updateJobBenefit($id: Int!, $name: String!, $jobId: Int!) {
    updateJobBenefit(id: $id, name: $name, jobId: $jobId) {
      id
      name
    }
  }
`;

export const DeleteJobBenefit = gql`
  mutation deleteJobBenefit($id: Int!) {
    deleteJobBenefit(id: $id)
  }
`;

export const CreateJobBenefit = gql`
  mutation createJobBenefit($name: String!, $jobId: Int!) {
    createJobBenefit(name: $name, jobId: $jobId) {
      name
      id
    }
  }
`;

export const UpdateJobSkill = gql`
  mutation updateJobSkill($id: Int!, $rating: Int) {
    updateJobSkill(id: $id, rating: $rating) {
      rating
      id
    }
  }
`;

export const DeleteJobSkill = gql`
  mutation deleteJobSkill($id: Int!) {
    deleteJobSkill(id: $id)
  }
`;

export const CreateJobSkill = gql`
  mutation createJobSkill($skillId: Int!, $rating: Int!, $jobId: Int!) {
    createJobSkill(skillId: $skillId, rating: $rating, jobId: $jobId) {
      rating
      id
    }
  }
`;

export const CreateSkill = gql`
  mutation createSkill($name: String!) {
    createSkill(name: $name) {
      id
    }
  }
`;

export const CreateJob = gql`
  mutation createJob(
    $name: String!
    $description: String
    $isAvailable: Boolean
    $companyId: Int!
  ) {
    createJob(
      name: $name
      description: $description
      isAvailable: $isAvailable
      companyId: $companyId
    ) {
      id
    }
  }
`;

export const CreateJobApplication = gql`
  mutation createUserJobApplication($userId: Int!, $jobId: Int!) {
    createUserJobApplication(userId: $userId, jobId: $jobId) {
      id
    }
  }
`;

export const UpdateJobApplication = gql`
  mutation updateJobApplication($id: Int!, $isAccepted: Boolean) {
    updateUserJobApplication(id: $id, isAccepted: $isAccepted) {
      id
      isAccepted
    }
  }
`;

export const CreateCompany = gql`
  mutation createCompany($name: String!, $userId: Int!, $contactInfoId: Int!) {
    createCompany(name: $name, userId: $userId, contactInfoId: $contactInfoId) {
      id
    }
  }
`;

export const UpdateCompany = gql`
  mutation updateCompany(
    $id: Int!
    $name: String
    $userId: Int
    $contactInfoId: Int
  ) {
    updateCompany(
      id: $id
      name: $name
      userId: $userId
      contactInfoId: $contactInfoId
    ) {
      id
    }
  }
`;
