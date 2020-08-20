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

export const Educations = gql`
  query userEducations($id: Int!) {
    user(id: $id) {
      userEducations {
        description
        id
        institution
        startDate
        endDate
      }
    }
  }
`;

export const UserWorkExperiences = gql`
  query WorkExperience($id: Int!) {
    user(id: $id) {
      userWorkExperiences {
        institution
        description
        startDate
        endDate
        id
      }
    }
  }
`;

export const UserSkills = gql`
  query userSkills($id: Int!) {
    user(id: $id) {
      userSkills {
        id
        rating
        skill {
          name
          id
        }
      }
    }
  }
`;

export const Skills = gql`
  query skills {
    skills {
      name
      id
    }
  }
`;
